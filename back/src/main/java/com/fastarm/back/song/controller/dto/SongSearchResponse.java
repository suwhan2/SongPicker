package com.fastarm.back.song.controller.dto;

import com.fastarm.back.song.dto.SongDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
public class SongSearchResponse {
    private int songSearchCnt;
    private List<SongDto> songSearchList;
    private int singerSearchCnt;
    private List<SongDto> singerSearchList;

    public static SongSearchResponse from(List<SongDto> songResults, List<SongDto> singerResults) {
        return SongSearchResponse.builder()
                .songSearchCnt(songResults.size())
                .songSearchList(songResults)
                .singerSearchCnt(singerResults.size())
                .singerSearchList(singerResults)
                .build();
    }
}
