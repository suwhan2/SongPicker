package com.fastarm.back.notification.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotificationNotFoundException  extends CustomException {
    public NotificationNotFoundException() {super(NotificationExceptionConstants.NOTIFICATION_NOT_FOUND);}
}
