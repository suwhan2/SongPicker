package com.fastarm.back.notification.dto;

import com.fastarm.back.team.validation.annotation.TeamName;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamInviteNotificationDto {
    @NotNull
    private Long notificationId;
    private Boolean accept;
    private String loginId;
}
