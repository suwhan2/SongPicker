package com.fastarm.back.song.controller.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SongRecommendResponse {
    private int number;
    private String title;
    private String singer;
    private String coverImage;
}
