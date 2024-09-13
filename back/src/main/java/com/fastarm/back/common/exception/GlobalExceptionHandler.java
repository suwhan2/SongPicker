package com.fastarm.back.common.exception;

import com.fastarm.back.common.controller.dto.ApiResponse;
import jakarta.validation.ValidationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<?> handleException(Exception e) {
        return ResponseEntity.badRequest().body(e.getMessage());
    }

    @ExceptionHandler(CustomException.class)
    public ResponseEntity<?> customExceptionHandler(CustomException e) {
        ExceptionConstants ec = e.getConstant();
        return new ResponseEntity<>(new ApiResponse<>(ec.getCode(), ec.getMessage(), null), ec.getHttpStatus());
    }

    @ExceptionHandler(ValidationException.class)
    public ResponseEntity<?> validationExceptionHandler(ValidationException e) {
        return ResponseEntity.badRequest().body(new ApiResponse<>("CN000", "유효성 검사 실패", null));
    }
}
