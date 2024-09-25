package com.fastarm.back.basedata.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum BaseDataExceptionConstants implements ExceptionConstants {

    CANNOT_SAVE_DATA("BD000", "초기 데이터 설정 실패", HttpStatus.BAD_REQUEST);

    final String code;
    final String message;
    final HttpStatus httpStatus;
}
