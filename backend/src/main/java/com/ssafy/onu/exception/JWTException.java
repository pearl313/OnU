package com.ssafy.onu.exception;

import io.jsonwebtoken.JwtException;
import org.springframework.security.core.AuthenticationException;

public class JWTException extends JwtException {
    public JWTException(String message) {
        super(message);
    }
}
