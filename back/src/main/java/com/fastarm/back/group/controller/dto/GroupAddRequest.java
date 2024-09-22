package com.fastarm.back.group.controller.dto;

import com.fastarm.back.group.dto.GroupAddDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GroupAddRequest {
    private MultipartFile groupImage;
    private String groupName;

    public GroupAddDto toDto(String loginId){
        return GroupAddDto.builder()
                .groupImage(this.groupImage)
                .groupName(this.groupName)
                .loginId(loginId)
                .build();
    }
}
