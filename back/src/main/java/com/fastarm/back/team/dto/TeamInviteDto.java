package com.fastarm.back.team.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamInviteDto {
    @NotNull
    private Long teamId;
    @NotEmpty
    private List<String> receivers;
    private String loginId;

}
