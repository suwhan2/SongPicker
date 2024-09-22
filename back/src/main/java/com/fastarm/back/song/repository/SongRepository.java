package com.fastarm.back.song.repository;

import com.fastarm.back.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    @Query(value = "SELECT * FROM song LIMIT 20", nativeQuery = true)
    List<Song> findRandomSongs();
}
