package com.fastarm.back.connection.controller;

import com.fastarm.back.auth.security.dto.LoginMemberInfo;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.connection.controller.dto.ConnectionRequest;
import com.fastarm.back.connection.controller.dto.TeamConnectionRequest;
import com.fastarm.back.connection.controller.dto.ReservationRequest;
import com.fastarm.back.connection.dto.ConnectionDto;
import com.fastarm.back.connection.dto.TeamConnectionDto;
import com.fastarm.back.connection.dto.ReservationDto;
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
                        .nickname(loginMemberInfo.getNickname())
                        .build());
        return ResponseEntity.ok(new ApiResponse<>("CO100", "서비스 연동 성공", null));
    }

    @PostMapping("/group")
    public ResponseEntity<?> connectionSet(@RequestBody TeamConnectionRequest teamConnectionRequest,
                                           @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {
        connectionService.setGroupConnection(TeamConnectionDto.builder()
                        .serialNumber(teamConnectionRequest.getSerialNumber())
                        .teamId(teamConnectionRequest.getTeamId())
                        .nickname(loginMemberInfo.getNickname())
                        .build());
        return ResponseEntity.ok(new ApiResponse<>("CO100", "서비스 연동 성공", null));
    }

    @PostMapping("/reservations")
    public ResponseEntity<?> songReserve(@RequestBody ReservationRequest reservationRequest,
                                         @AuthenticationPrincipal LoginMemberInfo loginMemberInfo) {
        connectionService.reserveSong(ReservationDto.builder()
                        .number(reservationRequest.getNumber())
                        .nickname(loginMemberInfo.getNickname())
                        .build());
        return ResponseEntity.ok(new ApiResponse<>("CO101", "예약 성공", null));
    }
}
