package com.fastarm.back.member.exception;

import com.fastarm.back.common.exception.CustomException;

public class MemberNotFoundException extends CustomException {
    public MemberNotFoundException() {
        super(MemberExceptionConstants.MEMBER_NOT_FOUND);
    }
}

