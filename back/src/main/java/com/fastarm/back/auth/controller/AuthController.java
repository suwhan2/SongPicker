package com.fastarm.back.auth.controller;

import com.fastarm.back.auth.dto.PhoneSendDto;
import com.fastarm.back.auth.enums.PhoneAuthPurpose;
import com.fastarm.back.auth.service.AuthService;
import com.fastarm.back.common.constants.RedisSessionConstants;
import com.fastarm.back.common.controller.dto.ApiResponse;
import com.fastarm.back.member.exception.NotCheckingPhoneDuplicationException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auths")
public class AuthController {

    private final AuthService authService;

    @PostMapping("/phone/send")
    public ResponseEntity<?> authCodeSend(@Valid @RequestBody PhoneSendDto phoneSendDto,
                                          @SessionAttribute(name = RedisSessionConstants.CHECK_PHONE, required = false) String phone) {
        String purpose = phoneSendDto.getPurpose();
        if (purpose.equals(PhoneAuthPurpose.SIGNUP.getPurpose()) || purpose.equals(PhoneAuthPurpose.CHANGE_PHONE.getPurpose())) {
            if (!phoneSendDto.getPhone().equals(phone)) {
                throw new NotCheckingPhoneDuplicationException();
            }
        }
        authService.sendAuthCode(phoneSendDto);
        return ResponseEntity.ok(new ApiResponse<>("AU101", "전화번호 인증 코드 전송 성공", null));
    }
}
