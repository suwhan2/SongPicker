package com.fastarm.back.team.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class TeamDetailDto {
    private String teamImage;
    private String teamName;
    private int teamMemberCount;
    private List<Member> members;

    @Getter
    @Builder
    public static class Member {
        private String profileImage;
        private String nickname;
    }

    public static TeamDetailDto from(String teamImage, String teamName, List<Member> members) {
        return TeamDetailDto.builder()
                .teamImage(teamImage)
                .teamName(teamName)
                .teamMemberCount(members.size())
                .members(members)
                .build();
    }

}
