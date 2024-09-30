package com.fastarm.back.member.service;

import com.fastarm.back.auth.exception.NotCheckPhoneAuthenticationException;
import com.fastarm.back.common.constants.RedisSessionConstants;
import com.fastarm.back.member.dto.MemberAddDto;
import com.fastarm.back.member.dto.NicknameModifyDto;
import com.fastarm.back.member.dto.PasswordFindDto;
import com.fastarm.back.member.dto.PasswordModifyDto;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.exception.*;
import com.fastarm.back.member.repository.MemberRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final BCryptPasswordEncoder bcryptPasswordEncoder;

    @Transactional(readOnly = true)
    public void checkId(String loginId) {
        if (memberRepository.findByLoginId(loginId).isPresent()) {
            throw new LoginIdDuplicationException();
        }
    }

    @Transactional(readOnly = true)
    public void checkNickname(String nickname) {
        if (memberRepository.findByNickname(nickname).isPresent()) {
            throw new NicknameDuplicationException();
        }
    }

    @Transactional(readOnly = true)
    public void checkPhone(String phone) {
        if (memberRepository.findByPhone(phone).isPresent()) {
            throw new PhoneDuplicationException();
        }
    }

    @Transactional
    public void addMember(MemberAddDto memberAddDto) {
        if (checkSignupPreAuth(memberAddDto)) {
            String encodedPassword = bcryptPasswordEncoder.encode(memberAddDto.getPassword());
            memberRepository.save(memberAddDto.toEntity(encodedPassword));
        }
    }

    @Transactional(readOnly = true)
    public String findNickname(String loginId) {
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);
        return member.getNickname();
    }

    @Transactional(readOnly = true)
    public String findLoginId(String phone) {
        Member member = memberRepository.findByPhone(phone)
                .orElseThrow(MemberNotFoundException::new);

        return member.getLoginId();
    }

    @Transactional
    public void findPassword(PasswordFindDto passwordFindDto) {
        Member member = memberRepository.findByLoginId(passwordFindDto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        if (!passwordFindDto.getNewPassword().equals(passwordFindDto.getCheckPassword())) {
            throw new PasswordModificationException();
        }

        member.modifyPassword(passwordFindDto.getNewPassword());
    }

    @Transactional
    public void modifyPassword(PasswordModifyDto passwordModifyDto) {
        Member member = memberRepository.findByLoginId(passwordModifyDto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        if (!passwordModifyDto.getNewPassword().equals(passwordModifyDto.getCheckPassword())) {
            throw new PasswordModificationException();
        }

        member.modifyPassword(passwordModifyDto.getNewPassword());
    }

    @Transactional
    public void modifyNickname(NicknameModifyDto nicknameModifyDto) {
        Member member = memberRepository.findByLoginId(nicknameModifyDto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        member.modifyNickname(nicknameModifyDto.getNewNickname());
    }

    private Boolean checkSignupPreAuth(MemberAddDto memberAddDto) {

        HttpSession session = memberAddDto.getSession();
        String checkId = (String)session.getAttribute(RedisSessionConstants.CHECK_ID);
        String checkNickname = (String)session.getAttribute(RedisSessionConstants.CHECK_NICKNAME);
        String authPhone = (String)session.getAttribute(RedisSessionConstants.AUTH_PHONE);

        if (checkId == null || !checkId.equals(memberAddDto.getLoginId())) {
            throw new NotCheckLoginIdDuplicationException();
        }

        if (checkNickname == null || !checkNickname.equals(memberAddDto.getNickname())) {
            throw new NotCheckNicknameDuplicationException();
        }

        if (authPhone == null || !authPhone.equals(memberAddDto.getPhone())) {
            throw new NotCheckPhoneAuthenticationException();
        }

        return true;
    }
}

