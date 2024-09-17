package com.fastarm.back.auth.dto;

import com.fastarm.back.member.valication.annotation.LoginId;
import com.fastarm.back.member.valication.annotation.Phone;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class PhoneSendDto {
    @Phone
    private String phone;
    @LoginId
    private String loginId;
    private String purpose;
}
