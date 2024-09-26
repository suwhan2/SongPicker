package com.fastarm.back.likes.dto;

import com.fastarm.back.likes.entity.Likes;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.song.entity.Song;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikesAddDto {

    private String loginId;
    private Long songId;

    public Likes toEntity(Member member, Song song) {
        return Likes.builder()
                .member(member)
                .song(song)
                .build();
    }

}
