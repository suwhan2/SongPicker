package com.fastarm.back.team.dto;


import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TeamDetailDto {
    private String teamImage;
    private String teamName;
    private int teamMemberCnt;
    private List<TeamDetailMemberDto> members;

    public static TeamDetailDto of(String teamImage, String teamName, List<TeamDetailMemberDto> members) {
        return TeamDetailDto.builder()
                .teamImage(teamImage)
                .teamName(teamName)
                .teamMemberCnt(members.size())
                .members(members)
                .build();
    }
}
