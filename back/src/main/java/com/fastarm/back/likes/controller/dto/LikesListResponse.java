package com.fastarm.back.likes.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class LikesListResponse {

    private int number;
    private String coverImage;
    private String title;
    private String singer;
    private Long likeId;

}
