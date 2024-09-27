package com.fastarm.back.history.repository;

import com.fastarm.back.history.controller.dto.MostSingersResponse;
import com.fastarm.back.history.controller.dto.MostSongsResponse;
import com.fastarm.back.history.entity.PersonalSingHistory;
import com.fastarm.back.member.entity.Member;
import com.fastarm.back.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PersonalSingHistoryRepository extends JpaRepository<PersonalSingHistory, Long> {

    @Query(
            """
            SELECT new com.fastarm.back.history.controller.dto.MostSongsResponse(s.title, s.singer, s.coverImage, COUNT(s))
            FROM PersonalSingHistory ph
            JOIN ph.song s
            WHERE ph.member.loginId = :loginId
            GROUP BY s.id
            ORDER BY COUNT(s) DESC
            LIMIT 3
            """
    )
    List<MostSongsResponse> personalMostSongsInfo(String loginId);

    @Query(
            """
            SELECT new com.fastarm.back.history.controller.dto.MostSingersResponse(s.singer, COUNT(s))
            FROM PersonalSingHistory ph
            JOIN ph.song s
            GROUP BY s.singer
            ORDER BY COUNT(s) DESC
            """
    )
    List<MostSingersResponse> personalMostSingersInfo(String loginId);

    @Query(
            """
            SELECT s.genre
            FROM PersonalSingHistory ph
            JOIN ph.song s
            GROUP BY s.genre
            ORDER BY COUNT(s) DESC
            LIMIT 3
            """
    )
    List<String> personalMostGenreInfo(String loginId);

    @Query(
            """
            SELECT ph.song
            FROM PersonalSingHistory ph
            WHERE ph.member = :member
            ORDER BY ph.singAt DESC
            LIMIT 50
            """
    )
    List<Song> findByMember(Member member);
}
