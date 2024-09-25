package com.fastarm.back.song.repository;

import com.fastarm.back.basedata.controller.dto.GetPopularResponse;
import com.fastarm.back.song.entity.Song;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;


public interface SongRepository extends JpaRepository<Song, Long> {
    @Query("SELECT s FROM Song s WHERE s.title LIKE %:keyword%")
    List<Song> findSongsByKeyword(@Param("keyword") String keyword);

    @Query("SELECT s FROM Song s ORDER BY RAND() LIMIT 20")
    List<Song> findRandomSongs();

    Optional<Song> findByNumber(int number);


    @Query("SELECT s FROM Song s WHERE s.singer LIKE %:keyword%")
    List<Song> findSongsBySinger(@Param("keyword") String keyword);

    @Query("""
        SELECT new com.fastarm.back.basedata.controller.dto.GetPopularResponse(
            s.id,
            s.coverImage,
            s.title,
            s.singer
        )
        FROM Song s
        WHERE s.isPopular = true
    """
    )
    Slice<GetPopularResponse> getPopularSongs(Pageable pageable);
}
