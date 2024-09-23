package com.fastarm.back.song.repository;

import com.fastarm.back.song.entity.Song;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SongRepository extends JpaRepository<Song, Long> {

    @Query(value = "SELECT * FROM song ORDER BY RAND() LIMIT 20", nativeQuery = true)
    List<Song> findRandomSongs();

    Optional<Song> findByTitle(String title);
    Optional<Song> findByNumber(int number);


}
