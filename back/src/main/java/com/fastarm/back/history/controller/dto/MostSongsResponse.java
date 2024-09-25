package com.fastarm.back.history.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class MostSongsResponse {

    private String title;
    private String singer;
    private String coverImage;
    private Long count;

}
