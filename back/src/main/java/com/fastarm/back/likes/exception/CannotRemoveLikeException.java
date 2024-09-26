package com.fastarm.back.likes.exception;

import com.fastarm.back.common.exception.CustomException;

public class CannotRemoveLikeException extends CustomException {
    public CannotRemoveLikeException() { super(LikeExceptionConstants.CANNOT_REMOVE_LIKE); }
}
