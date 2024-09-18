package com.fastarm.back.auth.dto;

import com.fastarm.back.member.valication.annotation.Phone;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PhoneVerifyDto {
    @Phone
    private String phone;
    private String authCode;
}
