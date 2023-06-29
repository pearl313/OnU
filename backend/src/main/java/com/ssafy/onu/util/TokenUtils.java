package com.ssafy.onu.util;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.Map;

//JWT 토큰을 요청에서 가져온다.
public class TokenUtils {
    private static final String MESSAGE = "message";
    private static final String FAIL = "fail";

    public static String getJwtFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (org.springframework.util.StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7, bearerToken.length());
        }
        return null;
    }
    public static boolean compareUserIdAndToken(int userId, Principal principal, Map<String, Object> resultMap) {
        if(userId != Integer.parseInt(principal.getName())){
            resultMap.put(MESSAGE, FAIL);
            return true;
        }
        return false;
    }
}
