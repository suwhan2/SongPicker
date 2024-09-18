package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotCheckNicknameDuplicationException extends CustomException {
    public NotCheckNicknameDuplicationException() {
        super(MemberExceptionConstants.NOT_CHECK_NICKNAME_DUPLICATE);
    }
}
