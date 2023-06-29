package com.ssafy.onu.handler.oauth2;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.onu.config.AppProperties;
import com.ssafy.onu.dto.UserPrincipalDto;
import com.ssafy.onu.exception.BadRequestException;
import com.ssafy.onu.repository.HttpCookieOAuth2AuthorizationRequestRepository;
import com.ssafy.onu.service.TokenProviderService;
import com.ssafy.onu.util.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URLEncoder;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import static com.ssafy.onu.repository.HttpCookieOAuth2AuthorizationRequestRepository.REDIRECT_URI_PARAM_COOKIE_NAME;


@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final TokenProviderService tokenProvider;
    private final AppProperties appProperties;
    private final HttpCookieOAuth2AuthorizationRequestRepository httpCookieOAuth2AuthorizationRequestRepository;
    private final RedisTemplate redisTemplate;
    private final static String REFRESH_TOKEN = "refreshToken";
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        String targetUrl = determineTargetUrl(request, response, authentication);
        if (response.isCommitted()) {
            logger.debug("Response has already been committed. Unable to redirect to " + targetUrl);
            return;
        }

        clearAuthenticationAttributes(request, response);
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }

    protected String determineTargetUrl(HttpServletRequest request, HttpServletResponse response, Authentication authentication ) {
        Optional<String> redirectUri = CookieUtils.getCookie(request, REDIRECT_URI_PARAM_COOKIE_NAME)
                .map(Cookie::getValue);

        if(redirectUri.isPresent() && !isAuthorizedRedirectUri(redirectUri.get())) {
            throw new BadRequestException("Sorry! We've got an Unauthorized Redirect URI and can't proceed with the authentication");
        }

        String targetUrl = redirectUri.orElse(getDefaultTargetUrl());
        String token = tokenProvider.createAccessToken(authentication);

        UserPrincipalDto userPrincipalDto = (UserPrincipalDto) authentication.getPrincipal();

        String newRefreshToken = tokenProvider.createRefreshToken();

        redisTemplate.opsForValue()
                .set("RT:" + userPrincipalDto.getUser().getUserId(), newRefreshToken, appProperties.getAuth().getRefreshTokenExpiry(), TimeUnit.MILLISECONDS);
        CookieUtils.deleteCookie(request, response, REFRESH_TOKEN);
        CookieUtils.addCookie(response, REFRESH_TOKEN, newRefreshToken,(int) appProperties.getAuth().getRefreshTokenExpiry() / 1000);

        try {
            String userNickname = URLEncoder.encode(userPrincipalDto.getUser().getUserNickname(), "UTF-8");
            return UriComponentsBuilder.fromUriString(targetUrl)
                    .queryParam("accessToken", token)
                    .queryParam("userId", userPrincipalDto.getUser().getUserId())
                    .queryParam("userNickname", userNickname)
                    .queryParam("userAge", userPrincipalDto.getUser().getUserAge())
                    .queryParam("userGender", userPrincipalDto.getUser().getUserGender())
                    .build().toUriString();
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException(e);
        }
    }

    protected void clearAuthenticationAttributes(HttpServletRequest request, HttpServletResponse response) {
        super.clearAuthenticationAttributes(request);
        httpCookieOAuth2AuthorizationRequestRepository.removeAuthorizationRequestCookies(request, response);
    }

    private boolean isAuthorizedRedirectUri(String uri) {
        URI clientRedirectUri = URI.create(uri);

        return appProperties.getOauth2().getAuthorizedRedirectUris()
                .stream()
                .anyMatch(authorizedRedirectUri -> {
                    URI authorizedURI = URI.create(authorizedRedirectUri);
                    if(authorizedURI.getHost().equalsIgnoreCase(clientRedirectUri.getHost())
                            && authorizedURI.getPort() == clientRedirectUri.getPort()) {
                        return true;
                    }
                    return false;
                });
    }
}
