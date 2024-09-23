package com.fastarm.back.song.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum SongExceptionConstants implements ExceptionConstants {

    NOT_FOUND_SONG_DETAIL("SO000", "노래 상세 조회 실패", HttpStatus.BAD_REQUEST),
    NOT_FOUND_SONG("SO001","존재하지 않는 노래",HttpStatus.BAD_REQUEST);

    final String code;
    final String message;
    final HttpStatus httpStatus;
}
