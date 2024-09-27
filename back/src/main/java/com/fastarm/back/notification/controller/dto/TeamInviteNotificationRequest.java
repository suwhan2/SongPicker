package com.fastarm.back.notification.controller.dto;

import com.fastarm.back.notification.dto.TeamInviteNotificationDto;
import lombok.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamInviteNotificationRequest {
    private Boolean accept;

    public TeamInviteNotificationDto toDto(Long notificationId, String loginId){
        return TeamInviteNotificationDto.builder()
                .notificationId(notificationId)
                .loginId(loginId)
                .accept(this.accept)
                .build();
    }

}
