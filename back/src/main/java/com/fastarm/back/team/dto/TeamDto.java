package com.fastarm.back.team.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamDto {
    private String teamImage;
    private String teamName;
    private int teamMemberCount;

    public static TeamDto from(String teamImage, String teamName, int teamMemberCount) {
        return TeamDto.builder()
                .teamImage(teamImage)
                .teamName(teamName)
                .teamMemberCount(teamMemberCount)
                .build();
    }
}
