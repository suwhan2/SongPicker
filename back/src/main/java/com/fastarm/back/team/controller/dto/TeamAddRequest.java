package com.fastarm.back.team.controller.dto;

import com.fastarm.back.team.dto.TeamAddDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamAddRequest {
    private MultipartFile teamImage;
    private String teamName;

    public TeamAddDto toDto(String loginId){
        return TeamAddDto.builder()
                .groupImage(this.teamImage)
                .groupName(this.teamName)
                .loginId(loginId)
                .build();
    }
}
