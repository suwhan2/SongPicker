package com.fastarm.back.team.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TeamWithdrawDto {
    @NotNull
    private Long teamId;
    private String loginId;
}
