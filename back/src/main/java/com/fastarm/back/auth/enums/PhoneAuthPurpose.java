package com.fastarm.back.auth.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum PhoneAuthPurpose {
    SIGNUP("signup"), FIND_PASSWORD("findPassword"), CHANGE_PHONE("changePhone");

    private final String purpose;
}
