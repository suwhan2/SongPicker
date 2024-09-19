package com.fastarm.back.member.controller.dto;

import lombok.Getter;

@Getter
public class MemberLoginRequest {
    private String loginId;
    private String password;
}
