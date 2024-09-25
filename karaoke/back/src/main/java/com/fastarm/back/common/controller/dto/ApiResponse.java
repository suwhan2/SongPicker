package com.fastarm.back.common.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse<T> {
    String code;
    String message;
    T data;
}
