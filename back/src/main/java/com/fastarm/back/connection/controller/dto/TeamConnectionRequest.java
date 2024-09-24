package com.fastarm.back.connection.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class TeamConnectionRequest {
    private String serialNumber;
    private Long teamId;
}
