package com.fastarm.back.common.exception;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException {
    private final ExceptionConstants constant;

    public CustomException(ExceptionConstants constant) {
        this.constant = constant;
    }
}
