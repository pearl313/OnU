package com.ssafy.onu.service;



import com.ssafy.onu.config.AppProperties;
import com.ssafy.onu.dto.UserPrincipalDto;
import com.ssafy.onu.entity.User;
import com.ssafy.onu.exception.TokenValidFailedException;
import com.ssafy.onu.repository.UserRepository;
import io.jsonwebtoken.*;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.Optional;
import java.util.stream.Collectors;

//토큰 관리 관련 클래스
@Service
@RequiredArgsConstructor
public class TokenProviderService {
    private static final Logger logger = LoggerFactory.getLogger(TokenProviderService.class);
    private final AppProperties appProperties;
    private final RedisTemplate redisTemplate;
    private final UserRepository userRepository;
    /**
     * 소셜 로그인 토큰 생성
     * @author 나유현
     * @param authentication
     * @return
     *
     */
    //토큰 생성
    public String createAccessToken(Authentication authentication) {

        UserPrincipalDto userPrincipal = (UserPrincipalDto) authentication.getPrincipal();

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(Long.toString(userPrincipal.getUser().getUserId()))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    public String createAccessToken(int userId) {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setSubject(Long.toString(userId))
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    /**
     * @author 나유현
     * Refresh 토큰 생성
     * @return
     */
    public String createRefreshToken() {

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getRefreshTokenExpiry());

        return Jwts.builder()
                .setHeaderParam("typ", "JWT")
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();
    }

    public Claims getTokenClaims(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims;
    }

    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public UsernamePasswordAuthenticationToken getAuthentication(String authToken) {
        if(validateToken(authToken)) {
            Collection<? extends GrantedAuthority> authorities =
                    Arrays.stream(new String[]{})
                            .map(SimpleGrantedAuthority::new)
                            .collect(Collectors.toList());
            Optional<User> user = userRepository.findByUserId(Integer.parseInt(getUserIdFromToken(authToken)));
            UserDetails principal = new UserPrincipalDto(user.get());
            return new UsernamePasswordAuthenticationToken(principal, "", authorities);
        } else {
            throw new TokenValidFailedException();
        }
    }

    public Long getExpiration(String accessToken) {
        // accessToken 남은 유효시간
        Date expiration = Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(accessToken).getBody().getExpiration();
        // 현재 시간
        Long now = new Date().getTime();
        return (expiration.getTime() - now);
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            String isLogout = (String) redisTemplate.opsForValue().get(authToken);
            if (!ObjectUtils.isEmpty(isLogout)) {
                throw new JwtException("블랙리스트에 있는 액세스 토큰");
            }
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
            throw new JwtException("잘못된 JWT 시그니처");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
            throw new JwtException("유효하지 않은 JWT 토큰");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
            throw new JwtException("토큰 기한 만료");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
            throw new JwtException("지원하지 않는 형식의 토큰");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
            throw new JwtException("JWT token compact of handler are invalid.");
        }
    }
}
