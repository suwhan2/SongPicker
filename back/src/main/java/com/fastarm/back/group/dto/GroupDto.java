package com.fastarm.back.group.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GroupDto {
    private String groupImage;
    private String groupName;
    private int groupMemberCount;

    public static GroupDto from(String groupImage, String groupName, int groupMemberCount) {
        return GroupDto.builder()
                .groupImage(groupImage)
                .groupName(groupName)
                .groupMemberCount(groupMemberCount)
                .build();
    }
}
