package com.fastarm.back.team.controller.dto;

import com.fastarm.back.team.dto.TeamInviteDto;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.List;
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamInviteRequest {
    @NotNull
    private Long teamId;
    @NotEmpty
    private List<String> receivers;

    public TeamInviteDto toDto(String loginId) {
        return TeamInviteDto.builder()
                .teamId(this.teamId)
                .receivers(this.receivers)
                .loginId(loginId)
                .build();
    }
}
