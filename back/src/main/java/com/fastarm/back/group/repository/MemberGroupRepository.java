package com.fastarm.back.group.repository;

import com.fastarm.back.group.entity.MemberGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MemberGroupRepository extends JpaRepository<MemberGroup, Long> {
    List<MemberGroup> findByMemberId(Long memberId);

    int countByGroupId(Long groupId);
}
