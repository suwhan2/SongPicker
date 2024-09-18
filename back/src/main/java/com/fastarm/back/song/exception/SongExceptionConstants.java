package com.fastarm.back.song.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SongExceptionConstants implements ExceptionConstants {

    Song_NOT_FOUND("SO000", "노래 상세 조회 실패", HttpStatus.BAD_REQUEST);

    final String code;
    final String message;
    final HttpStatus httpStatus;
}
