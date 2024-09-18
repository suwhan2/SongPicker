package com.fastarm.back.song.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class SongRecommendDto {
        private String number;
        private String title;
        private String singer;
        private String coverImage;
        private Boolean isLike;
        private Long likeId;

}
