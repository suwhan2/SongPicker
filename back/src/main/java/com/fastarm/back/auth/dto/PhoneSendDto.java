package com.fastarm.back.auth.dto;

import com.fastarm.back.auth.validation.annotation.PhoneAuthPurpose;
import com.fastarm.back.member.valication.annotation.Phone;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PhoneSendDto {
    @Phone
    private String phone;
    private String loginId;
    @PhoneAuthPurpose
    private String purpose;
}

