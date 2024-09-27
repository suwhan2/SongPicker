package com.fastarm.back.likes.exception;

import com.fastarm.back.common.exception.CustomException;

public class LikeNotFoundException extends CustomException {
    public LikeNotFoundException() { super(LikeExceptionConstants.LIKE_NOT_FOUND); }
}
