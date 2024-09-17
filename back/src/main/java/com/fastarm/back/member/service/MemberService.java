package com.fastarm.back.member.service;

import com.fastarm.back.member.exception.LoginIdDuplicationException;
import com.fastarm.back.member.exception.NicknameDuplicationException;
import com.fastarm.back.member.exception.PhoneDuplicationException;
import com.fastarm.back.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

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
}
