package com.fastarm.back.notification.exception;

import com.fastarm.back.common.exception.CustomException;

public class TeamInviteNotificationNotFoundException extends CustomException {
    public TeamInviteNotificationNotFoundException() {
        super(NotificationExceptionConstants.TEAM_INVITE_NOTIFICATION_NOT_FOUND);
    }
}
