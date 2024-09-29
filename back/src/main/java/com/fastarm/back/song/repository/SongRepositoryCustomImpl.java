package com.fastarm.back.song.repository;

import com.fastarm.back.song.dto.SongDto;
import com.querydsl.core.types.Projections;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.List;
import static com.fastarm.back.song.entity.QSong.song;
import static com.fastarm.back.likes.entity.QLikes.likes;

@RequiredArgsConstructor
public class SongRepositoryCustomImpl implements SongRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public List<SongDto> findSongsWithLikeStatus(List<Long> songIds, Long memberId) {
        return queryFactory
                .select(Projections.constructor(SongDto.class,
                        song.id,
                        song.number,
                        song.title,
                        song.singer,
                        song.coverImage,
                        likes.id.isNotNull(),
                        likes.id
                ))
                .from(song)
                .leftJoin(likes).on(likes.song.id.eq(song.id).and(likes.member.id.eq(memberId)))
                .where(song.id.in(songIds))
                .fetch();
    }
}
