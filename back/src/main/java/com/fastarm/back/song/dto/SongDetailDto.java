package com.fastarm.back.song.dto;

import lombok.Builder;
import lombok.Getter;


import java.time.LocalDate;

@Getter
@Builder
public class SongDetailDto {
    private int number;
    private String title;
    private String singer;
    private String coverImage;
    private String genre;
    private String lyricist;
    private String composer;
    private String lyrics;
    private LocalDate releasedAt;

    private Boolean isLike;
    private Long likeId;

}
