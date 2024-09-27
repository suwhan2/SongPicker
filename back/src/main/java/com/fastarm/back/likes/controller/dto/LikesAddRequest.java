package com.fastarm.back.likes.controller.dto;

import com.fastarm.back.likes.dto.LikesAddDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class LikesAddRequest {
    private Long songId;

    public LikesAddDto toDto(String loginId) {
        return LikesAddDto.builder()
                .loginId(loginId)
                .songId(songId)
                .build();
    }

}
