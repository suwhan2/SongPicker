package com.fastarm.back.likes.exception;

import com.fastarm.back.common.exception.CustomException;

public class AlreadyLikeException extends CustomException {
    public AlreadyLikeException() { super(LikeExceptionConstants.ALREADY_LIKE); }
}
