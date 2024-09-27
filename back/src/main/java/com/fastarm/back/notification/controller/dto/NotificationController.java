package com.fastarm.back.notification.controller.dto;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/notifications")
public class NotificationController {
    @PatchMapping("/{notificationId}/response")
    public ResponseEntity<?> teamInvitationRespond(@PathVariable Long notificationId,
                                                   @RequestBody String response,
                                                   @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {

        return new ResponseEntity<>(new ApiResponse<>("NO100","그룹 초대 응답 성공",null), HttpStatus.OK);

    }

}
