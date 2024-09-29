package com.fastarm.back.notification.controller.dto;

import com.fastarm.back.notification.dto.NotificationDto;
import lombok.*;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class NotificationRequest {
    private Long notificationId;

    public NotificationDto toDto(String loginId){
        return NotificationDto.builder()
                .notificationId(this.notificationId)
                .loginId(loginId)
                .build();
    }
}
