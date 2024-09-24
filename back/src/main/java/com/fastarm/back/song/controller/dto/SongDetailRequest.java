package com.fastarm.back.song.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SongDetailRequest {
    private Long songId;
    private String loginId;

    public static SongDetailRequest from(Long songId, String loginId) {
        return SongDetailRequest.builder()
                .songId(songId)
                .loginId(loginId)
                .build();
    }


}

