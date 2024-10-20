package com.fastarm.back.member.repository;

import com.fastarm.back.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Optional<Member> findByLoginId(String loginId);
    Optional<Member> findByNickname(String nickname);
    Optional<Member> findByPhone(String phone);
}

