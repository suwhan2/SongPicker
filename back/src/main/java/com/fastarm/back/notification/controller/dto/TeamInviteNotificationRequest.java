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
    private Long notificationId;
    public TeamInviteNotificationDto toDto(String loginId){
        return TeamInviteNotificationDto.builder()
                .notificationId(this.notificationId)
                .loginId(loginId)
                .accept(this.accept)
                .build();
    }

}
