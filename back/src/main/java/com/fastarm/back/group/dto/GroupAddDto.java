package com.fastarm.back.group.dto;

import com.fastarm.back.group.entity.Group;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class GroupAddDto {
    private String groupName;
    private MultipartFile groupImage;
    private String loginId;
    public Group toEntity(String imagePath){
        return Group.builder()
                .name(groupName)
                .groupImage(imagePath)
                .build();
    }
}
