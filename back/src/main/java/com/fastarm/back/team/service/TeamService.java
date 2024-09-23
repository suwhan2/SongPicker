package com.fastarm.back.team.service;

import com.fastarm.back.team.dto.TeamAddDto;
import com.fastarm.back.team.dto.TeamDetailDto;
import com.fastarm.back.team.dto.TeamDto;
import com.fastarm.back.team.entity.Team;
import com.fastarm.back.team.entity.TeamMember;
import com.fastarm.back.team.repository.TeamRepository;
import com.fastarm.back.team.repository.TeamMemberRepository;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.fastarm.back.member.exception.MemberNotFoundException;
import com.fastarm.back.team.exception.TeamNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamService {

    private final TeamMemberRepository memberGroupRepository;
    private final TeamRepository teamRepository;
    private final MemberRepository memberRepository;

    @Transactional(readOnly = true)
    public List<TeamDto> getMyTeams(String loginId){
        Member member = memberRepository.findByLoginId(loginId)
                .orElseThrow(MemberNotFoundException::new);

        return memberGroupRepository.findByMemberId(member.getId()).stream()
                .map(memberGroup -> {
                    Team team = memberGroup.getTeam();
                    String teamImage = team.getTeamImage();
                    String teamName = team.getName();
                    int groupMemberCount = memberGroupRepository.countByTeamId(team.getId());

                    return TeamDto.from(teamImage, teamName, groupMemberCount);
                })
                .collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public TeamDetailDto getTeamDetail(Long teamId){
        Team team = teamRepository.findById(teamId).orElseThrow(TeamNotFoundException::new);
        List<TeamDetailDto.Member> members = memberGroupRepository.findByTeamId(teamId).stream()
                .map(teamMember ->{
                    Member member = teamMember.getMember();
                    return TeamDetailDto.Member.builder()
                            .profileImage(member.getProfileImage())
                            .nickname(member.getNickname())
                            .build();

                }).collect(Collectors.toList());

        return TeamDetailDto.from(
                team.getTeamImage(),
                team.getName(),
                members
        );
    }

    @Transactional
    public void createTeam(TeamAddDto dto){
        String imagePath="";
//        String imagePath = saveImage(dto.getGroupImage()); S3 업로드 로직 추가
        Team team = dto.toEntity(imagePath);
        Team savedTeam = teamRepository.save(team);

        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        // 방장 그룹에 자동 추가
        TeamMember teamMember = TeamMember.builder()
                .member(member)
                .team(savedTeam)
                .build();
        memberGroupRepository.save(teamMember);

    }
}
