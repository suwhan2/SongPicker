package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotCheckLoginIdDuplicationException extends CustomException {
    public NotCheckLoginIdDuplicationException() {
        super(MemberExceptionConstants.NOT_CHECK_LOGIN_ID_DUPLICATE);
    }
}

