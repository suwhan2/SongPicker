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
    private Long teamId;
    private String teamImage;

    private String teamName;
    private Long teamMemberCount;

    public static TeamDto from(Long teamId, String teamImage, String teamName, Long teamMemberCount) {
        return TeamDto.builder()
                .teamId(teamId)
                .teamImage(teamImage)
                .teamName(teamName)
                .teamMemberCount(teamMemberCount)
                .build();
    }
}
