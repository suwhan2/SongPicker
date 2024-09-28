package com.fastarm.back.team.repository;

import com.fastarm.back.team.dto.TeamDto;
import com.fastarm.back.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {

    @Query("""
            SELECT new com.fastarm.back.team.dto.TeamDto(t.teamImage, t.name, COUNT(tm)) 
            FROM Team t LEFT JOIN t.teamMembers tm 
            WHERE tm.member.id = :memberId OR tm IS NULL 
            GROUP BY t.id, t.teamImage, t.name
            """)
    List<TeamDto> findTeamsWithMemberCountByMemberId(Long memberId);

}
