package com.fastarm.back.team.controller.dto;

import com.fastarm.back.team.dto.TeamModifyDto;
import com.fastarm.back.team.validation.annotation.TeamName;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TeamModifyRequest {
    private MultipartFile teamImage;
    @TeamName
    private String teamName;

    public TeamModifyDto toDto(Long teamId, String loginId){
        return TeamModifyDto.builder()
                .teamId(teamId)
                .teamImage(this.teamImage)
                .teamName(this.teamName)
                .loginId(loginId)
                .build();
    }
}
