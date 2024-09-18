package com.fastarm.back.auth.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum AuthExceptionConstants implements ExceptionConstants {

    NOT_CHECK_PHONE_AUTH("AU001", "전화번호 인증 미실시", HttpStatus.BAD_REQUEST),
    PHONE_AUTH_CODE_MISMATCH("AU002", "전화번호 인증 실패", HttpStatus.BAD_REQUEST);


    final String code;
    final String message;
    final HttpStatus httpStatus;
}
