package com.fastarm.back.auth.security.controller;

import com.fastarm.back.auth.security.service.JwtService;
import com.fastarm.back.common.controller.dto.ApiResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class JwtController {

    private final JwtService jwtService;

    @PostMapping("/auths/refresh")
    public ResponseEntity<?> accessReissue(HttpServletRequest request, HttpServletResponse response) {
        jwtService.reissueAccess(request, response);
        return ResponseEntity.ok(new ApiResponse<>("AU104", "엑세스 토큰 재발급 성공", null));
    }
}
