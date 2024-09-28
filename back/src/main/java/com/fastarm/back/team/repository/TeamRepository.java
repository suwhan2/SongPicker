package com.fastarm.back.team.repository;

import com.fastarm.back.team.dto.TeamDto;
import com.fastarm.back.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {

}
