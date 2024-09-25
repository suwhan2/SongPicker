package com.fastarm.back.likes.exception;

import com.fastarm.back.common.exception.ExceptionConstants;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum LikeExceptionConstants implements ExceptionConstants {

    ALREADY_LIKE("LI000", "이미 찜한 곡", HttpStatus.BAD_REQUEST),
    LIKE_NOT_FOUND("LI001", "찜 조회 실패", HttpStatus.BAD_REQUEST),
    CANNOT_REMOVE_LIKE("LI002", "찜 삭제 실패", HttpStatus.BAD_REQUEST);

    final String code;
    final String message;
    final HttpStatus httpStatus;
}
