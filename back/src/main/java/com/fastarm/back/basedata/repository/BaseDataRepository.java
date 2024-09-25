package com.fastarm.back.basedata.repository;

import com.fastarm.back.basedata.entity.BaseData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BaseDataRepository extends JpaRepository<BaseData, Long> {

    @Query("""
        SELECT bs
        FROM BaseData bs
        WHERE bs.member.loginId = :loginId
   """)
    List<BaseData> findByLoginId(@Param("loginId") String loginId);
}
