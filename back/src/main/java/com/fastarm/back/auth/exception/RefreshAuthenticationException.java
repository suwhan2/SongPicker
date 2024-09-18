package com.fastarm.back.auth.exception;

import com.fastarm.back.common.exception.CustomException;

public class RefreshAuthenticationException extends CustomException {
    public RefreshAuthenticationException() {
        super(AuthExceptionConstants.REFRESH_AUTH_FAIL);
    }
}
