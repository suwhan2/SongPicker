package com.fastarm.back.song.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SongSearchRequest {
    private String keyword;
    private String loginId;

    public static SongSearchRequest from(String keyword, String loginId) {
        return SongSearchRequest.builder()
                .keyword(keyword)
                .loginId(loginId)
                .build();
    }


}
