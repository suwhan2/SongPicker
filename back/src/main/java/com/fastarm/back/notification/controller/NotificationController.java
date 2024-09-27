package com.fastarm.back.notification.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.notification.controller.dto.TeamInviteNotificationRequest;
import com.fastarm.back.notification.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {

    private final NotificationService notificationService;

    @PatchMapping("/{notificationId}/response")
    public ResponseEntity<?> teamInvitationRespond(@PathVariable Long notificationId,
                                                   @RequestBody TeamInviteNotificationRequest teamInviteNotificationRequest,
                                                   @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {
        notificationService.RespondTeamInvitation(teamInviteNotificationRequest.toDto(notificationId,loginMemberInfo.getLoginId()));
        return new ResponseEntity<>(new ApiResponse<>("NO100","그룹 초대 응답 성공",null), HttpStatus.OK);

    }

}
