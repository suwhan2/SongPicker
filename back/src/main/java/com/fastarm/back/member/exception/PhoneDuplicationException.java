package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class PhoneDuplicationException extends CustomException {
    public PhoneDuplicationException() {
        super(MemberExceptionConstants.PHONE_DUPLICATE);
    }
}
