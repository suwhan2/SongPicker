package com.fastarm.back.group.exception;

import com.fastarm.back.common.exception.CustomException;
import com.fastarm.back.member.exception.MemberExceptionConstants;

public class GroupNotFoundException extends CustomException {
    public GroupNotFoundException() {
        super(GroupExceptionConstants.Group_Not_Found_Exception);
    }
}
