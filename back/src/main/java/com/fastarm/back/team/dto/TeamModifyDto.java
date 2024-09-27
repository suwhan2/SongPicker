package com.fastarm.back.team.dto;

import com.fastarm.back.team.validation.annotation.TeamName;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Builder
public class TeamModifyDto {
    @TeamName
    private String teamName;
    @NotNull
    private Long teamId;
    private MultipartFile teamImage;
    private String loginId;

}
