package com.fastarm.back.connection.repository;

import com.fastarm.back.connection.entity.ConnectionInfo;
import com.fastarm.back.member.entity.Member;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ConnectionInfoRepository extends JpaRepository<ConnectionInfo, Long> {
    List<ConnectionInfo> findListByMember(Member member);

    @EntityGraph(attributePaths = {"machine"})
    Optional<ConnectionInfo> findByMember(Member member);
}
