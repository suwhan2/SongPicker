package com.fastarm.back.song.dto;

import com.fastarm.back.song.entity.Song;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SongDto {
        private int number;
        private String title;
        private String singer;
        private String coverImage;
        private Boolean isLike;
        private Long likeId;

        //, boolean isLike, Long likeId
        public static SongDto from(Song song) {
                return SongDto.builder()
                        .number(song.getNumber())
                        .title(song.getTitle())
                        .singer(song.getSinger())
                        .coverImage(song.getCoverImage())
//                        .isLike(isLike)
//                        .likeId(likeId)
                        .build();
        }
}
