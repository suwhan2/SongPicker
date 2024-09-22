package com.fastarm.back.connection.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.connection.controller.dto.ConnectionRequest;
import com.fastarm.back.connection.dto.ConnectionDto;
import com.fastarm.back.connection.service.ConnectionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/connections")
@RequiredArgsConstructor
public class ConnectionController {

    private final ConnectionService connectionService;

    @PostMapping
    public ResponseEntity<?> connectionSet(@RequestBody ConnectionRequest connectionRequest,
                                           @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {
        connectionService.setConnection(ConnectionDto.builder()
                        .serialNumber(connectionRequest.getSerialNumber())
                        .loginId(loginMemberInfo.getLoginId())
                        .build());
        return ResponseEntity.ok(new ApiResponse<>("CO100", "서비스 연동 성공", null));
    }
}
