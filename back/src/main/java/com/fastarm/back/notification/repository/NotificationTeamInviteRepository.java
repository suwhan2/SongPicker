package com.fastarm.back.notification.repository;

import com.fastarm.back.notification.entity.NotificationTeamInvite;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationTeamInviteRepository  extends JpaRepository<NotificationTeamInvite, Long> {
}
