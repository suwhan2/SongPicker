package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class LoginIdPhoneMismatchException extends CustomException {
    public LoginIdPhoneMismatchException() {
        super(MemberExceptionConstants.LOGIN_ID_PHONE_MISMATCH);
    }
}
