package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotCheckingPhoneDuplicationException extends CustomException {
    public NotCheckingPhoneDuplicationException() {
        super(MemberExceptionConstants.NOT_CHECK_PHONE_DUPLICATE);
    }
}
