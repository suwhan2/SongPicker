package com.fastarm.back.karaoke.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum KaraokeExceptionConstants implements ExceptionConstants {
    NOT_FOUND_MACHINE("KA000", "기기 조회 실패", HttpStatus.BAD_REQUEST);

    final String code;
    final String message;
    final HttpStatus httpStatus;

}
