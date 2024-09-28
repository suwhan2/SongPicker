package com.fastarm.back.team.dto;

import com.fastarm.back.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TeamDetailMemberDto {
    private String profileImage;
    private String nickname;

    public static TeamDetailMemberDto from(Member member){
        return TeamDetailMemberDto.builder()
                .profileImage(member.getProfileImage())
                .nickname(member.getNickname())
                .build();

    }
}
