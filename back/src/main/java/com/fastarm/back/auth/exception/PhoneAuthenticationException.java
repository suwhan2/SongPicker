package com.fastarm.back.auth.exception;

import com.fastarm.back.common.exception.CustomException;

public class PhoneAuthenticationException extends CustomException {
    public PhoneAuthenticationException() {
        super(AuthExceptionConstants.PHONE_AUTH_CODE_MISMATCH);
    }
}
