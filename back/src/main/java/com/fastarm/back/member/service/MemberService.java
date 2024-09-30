package com.fastarm.back.member.service;

import com.fastarm.back.auth.exception.NotCheckPhoneAuthenticationException;
import com.fastarm.back.common.constants.RedisSessionConstants;
import com.fastarm.back.member.dto.MemberAddDto;
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
//        if (checkSignupPreAuth(memberAddDto)) {
            String encodedPassword = bcryptPasswordEncoder.encode(memberAddDto.getPassword());
            memberRepository.save(memberAddDto.toEntity(encodedPassword));
//        }
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

