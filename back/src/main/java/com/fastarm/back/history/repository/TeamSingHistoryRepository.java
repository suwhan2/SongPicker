package com.fastarm.back.history.repository;

import com.fastarm.back.history.entity.TeamSingHistory;
import com.fastarm.back.song.entity.Song;
import com.fastarm.back.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamSingHistoryRepository extends JpaRepository<TeamSingHistory, Long> {

    @Query("""
            SELECT th.song
            FROM TeamSingHistory th
            WHERE th.team = :team
            ORDER BY th.singAt DESC
            LIMIT 50
            """)
    List<Song> findByTeam(Team team);
}
