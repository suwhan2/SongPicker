package com.fastarm.back.history.controller.dto;

import com.fastarm.back.song.entity.Song;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TeamRecentSongsResponse {

    private int number;
    private String coverImage;
    private String title;
    private String singer;
    private Boolean isLike;
    private Long likeId;

    public static TeamRecentSongsResponse from(Song song) {
        return TeamRecentSongsResponse.builder()
                .number(song.getNumber())
                .coverImage(song.getCoverImage())
                .title(song.getTitle())
                .singer(song.getSinger())
                .build();
    }

}
