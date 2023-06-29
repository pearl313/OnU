package com.ssafy.onu.handler;


import io.jsonwebtoken.JwtException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final String MESSAGE = "message";

    @ExceptionHandler(JwtException.class)
    protected ResponseEntity<Map<String,Object>> handleIllegalArgumentException(JwtException ex) {
        Map<String, Object> resultMap = new HashMap<>();

        resultMap.put(MESSAGE, ex.getMessage());

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(resultMap);
    }
}