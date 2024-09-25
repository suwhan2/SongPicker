package com.fastarm.back.team.repository;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.team.entity.Team;
import com.fastarm.back.team.entity.TeamMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamMemberRepository extends JpaRepository<TeamMember, Long> {
    List<TeamMember> findByMemberId(Long memberId);
    List<TeamMember> findByTeamId(Long teamId);
    int countByTeamId(Long teamId);
    boolean existsByMemberAndTeam(Member member, Team team);
}
