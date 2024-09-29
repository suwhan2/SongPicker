package com.fastarm.back.team.controller.dto;

import lombok.*;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TeamInviteResponse {
    private List<String> successfulInvites;
    private List<String> alreadyInGroup;
    private List<String> previouslyInvited;


}
