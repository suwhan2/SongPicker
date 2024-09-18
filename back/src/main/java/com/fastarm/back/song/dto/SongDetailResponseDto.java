package com.fastarm.back.song.dto;

import com.fastarm.back.song.entity.Song;
import lombok.Builder;
import lombok.Getter;


import java.time.LocalDate;

@Getter
@Builder
public class SongDetailResponseDto {
    private String number;
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
