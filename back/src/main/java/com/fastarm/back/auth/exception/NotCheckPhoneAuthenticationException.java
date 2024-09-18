package com.fastarm.back.auth.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotCheckPhoneAuthenticationException extends CustomException {
    public NotCheckPhoneAuthenticationException() {
        super(AuthExceptionConstants.NOT_CHECK_PHONE_AUTH);
    }
}
