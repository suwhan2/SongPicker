package com.fastarm.back.notification.exception;
import com.fastarm.back.common.exception.CustomException;

public class AlreadyInviteException extends CustomException{
    public AlreadyInviteException() {super(NotificationExceptionConstants.ALREADY_INVITE);}
}
