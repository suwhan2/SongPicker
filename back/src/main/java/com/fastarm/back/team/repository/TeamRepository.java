package com.fastarm.back.team.repository;

import com.fastarm.back.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Long> {
}
