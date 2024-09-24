package com.fastarm.back.team.dto;

import com.fastarm.back.team.entity.Team;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class TeamAddDto {
    private String teamName;
    private MultipartFile teamImage;
    private String loginId;

    public Team toEntity(String imagePath){
        return Team.builder()
                .name(teamName)
                .teamImage(imagePath)
                .build();
    }
}
