package com.fastarm.back.group.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GroupDetailDto {
    private String groupImage;
    private String groupName;
    private int groupMemberCount;
    private List<Member> members;

    @Getter
    @Builder
    public static class Member {
        private String profileImage;
        private String nickname;
    }

    public static GroupDetailDto from(String groupImage, String groupName, List<Member> members) {
        return GroupDetailDto.builder()
                .groupImage(groupImage)
                .groupName(groupName)
                .groupMemberCount(members.size())
                .members(members)
                .build();
    }

}
