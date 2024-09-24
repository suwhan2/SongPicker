package com.fastarm.back.karaoke.repository;

import com.fastarm.back.karaoke.entity.Machine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MachineRepository extends JpaRepository<Machine, Long> {

    Optional<Machine> findBySerialNumber(String serialNumber);
}
