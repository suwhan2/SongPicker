package com.fastarm.back.basesong.repository;

import com.fastarm.back.basesong.entity.BaseSong;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BaseSongRepository extends JpaRepository<BaseSong, Long> {

    @Query("""
        SELECT bs
        FROM BaseSong bs
        WHERE bs.member.loginId = :loginId
   """)
    List<BaseSong> findByLoginId(@Param("loginId") String loginId);
}
