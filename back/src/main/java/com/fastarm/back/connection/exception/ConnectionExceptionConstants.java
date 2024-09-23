package com.fastarm.back.connection.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ConnectionExceptionConstants implements ExceptionConstants {
    CANNOT_CONNECT("CO000", "서비스 연동 실패", HttpStatus.BAD_REQUEST),
    CANNOT_RESERVE("C001", "예약 실패", HttpStatus.BAD_REQUEST);

    final String code;
    final String message;
    final HttpStatus httpStatus;
}
