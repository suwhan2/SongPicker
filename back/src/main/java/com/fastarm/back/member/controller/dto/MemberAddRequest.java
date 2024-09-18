package com.fastarm.back.member.controller.dto;

import com.fastarm.back.member.dto.MemberAddDto;
import com.fastarm.back.member.enums.Gender;
import com.fastarm.back.member.enums.Role;
import com.fastarm.back.member.valication.annotation.*;
import jakarta.servlet.http.HttpSession;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MemberAddRequest {
    @LoginId
    private String loginId;
    @Password
    private String password;
    @Name
    private String name;
    @Nickname
    private String nickname;
    private LocalDate birth;
    @Phone
    private String phone;
    private Gender gender;
    private Role role;

    public MemberAddDto toDto(HttpSession session) {
        return MemberAddDto.builder()
                .loginId(loginId)
                .password(password)
                .name(name)
                .nickname(nickname)
                .birth(birth)
                .phone(phone)
                .gender(gender)
                .role(role)
                .session(session)
                .build();
    }
}
