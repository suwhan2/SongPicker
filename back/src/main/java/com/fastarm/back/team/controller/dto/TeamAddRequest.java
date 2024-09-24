package com.fastarm.back.team.controller.dto;

import com.fastarm.back.team.dto.TeamAddDto;
import com.fastarm.back.team.validation.annotation.Name;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TeamAddRequest {
    private MultipartFile teamImage;

    @Name
    private String teamName;

    public TeamAddDto toDto(String loginId){
        return TeamAddDto.builder()
                .teamImage(this.teamImage)
                .teamName(this.teamName)
                .loginId(loginId)
                .build();
    }
}
