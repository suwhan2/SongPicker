package com.fastarm.back.member.controller;

import com.fastarm.back.common.constants.RedisSessionConstants;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.member.controller.dto.MemberAddRequest;
import com.fastarm.back.member.service.MemberService;
import com.fastarm.back.member.valication.annotation.LoginId;
import com.fastarm.back.member.valication.annotation.Nickname;
import com.fastarm.back.member.valication.annotation.Phone;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;

    @GetMapping("/check-id")
    public ResponseEntity<?> idCheck(@LoginId @RequestParam("loginId") String loginId, HttpSession session) {
        memberService.checkId(loginId);
        session.setAttribute(RedisSessionConstants.CHECK_ID, loginId);
        return ResponseEntity.ok(new ApiResponse<>("ME101", "로그인 아이디 중복검사 성공", null));
    }

    @GetMapping("/check-nickname")
    public ResponseEntity<?> nicknameCheck(@Nickname @RequestParam("nickname") String nickname, HttpSession session) {
        memberService.checkNickname(nickname);
        session.setAttribute(RedisSessionConstants.CHECK_NICKNAME, nickname);
        return ResponseEntity.ok(new ApiResponse<>("ME102", "닉네임 중복 검사 성공", null));
    }

    @GetMapping("/check-phone")
    public ResponseEntity<?> phoneCheck(@Phone @RequestParam("phone") String phone, HttpSession session) {
        memberService.checkPhone(phone);
        session.setAttribute(RedisSessionConstants.CHECK_PHONE, phone);
        return ResponseEntity.ok(new ApiResponse<>("ME103", "전화번호 중복 검사 성공", null));
    }

    @PostMapping
    public ResponseEntity<?> memberAdd(@Valid @RequestBody MemberAddRequest request, HttpSession session) {
        memberService.addMember(request.toDto(session));
        return new ResponseEntity<>(new ApiResponse<>("ME100", "회원가입 성공", null), HttpStatus.CREATED);
    }
}
