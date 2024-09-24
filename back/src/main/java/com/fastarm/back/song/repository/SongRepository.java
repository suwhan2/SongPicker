package com.fastarm.back.song.repository;

import com.fastarm.back.song.entity.Song;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SongRepository extends JpaRepository<Song, Long> {
    // 노래 제목으로 검색
    @Query("SELECT s FROM Song s WHERE s.title LIKE %:keyword%")
    List<Song> findSongsByKeyword(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM song ORDER BY RAND() LIMIT 20", nativeQuery = true)
    List<Song> findRandomSongs();

    Optional<Song> findByTitle(String title);
    Optional<Song> findByNumber(int number);


    // 가수 이름으로 검색
    @Query("SELECT s FROM Song s WHERE s.singer LIKE %:keyword%")
    List<Song> findSongsBySinger(@Param("keyword") String keyword);
}
