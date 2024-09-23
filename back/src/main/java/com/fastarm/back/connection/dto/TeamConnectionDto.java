package com.fastarm.back.connection.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TeamConnectionDto {
    private String serialNumber;
    private Long teamId;
    private String nickname;
}
