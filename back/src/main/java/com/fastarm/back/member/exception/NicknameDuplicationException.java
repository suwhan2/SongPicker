package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class NicknameDuplicationException extends CustomException {
    public NicknameDuplicationException() {
        super(MemberExceptionConstants.NICKNAME_DUPLICATE);
    }
}
