package com.fastarm.back.song.dto;


import com.fastarm.back.song.controller.dto.SongRecommendResponse;
import lombok.*;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SongRecommendDto {
    private int number;
    private String title;
    private String singer;
    private String coverImage;
//    private Boolean isLike;
//    private Long likeId;

    // 인자 추후 추가 boolean isLike, Long likeId
    public static SongRecommendDto from(SongRecommendResponse response) {
        return SongRecommendDto.builder()
                .number(response.getNumber())
                .title(response.getTitle())
                .singer(response.getSinger())
                .coverImage(response.getCoverImage())
//                .isLike(isLike)
//                .likeId(likeId)
                .build();
    }
}
