package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class LoginIdDuplicationException extends CustomException {
    public LoginIdDuplicationException() {
        super(MemberExceptionConstants.LOGIN_DUPLICATE);
    }
}

