package com.fastarm.back.song.repository;

import com.fastarm.back.song.dto.SongDto;

import java.util.List;

public interface SongRepositoryCustom {
    List<SongDto> findSongsWithLikeStatus(List<Long> songIds, Long memberId);
}

