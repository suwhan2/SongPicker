package com.fastarm.back.notification.repository;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.notification.entity.NotificationTeamInvite;
import com.fastarm.back.notification.enums.Status;
import com.fastarm.back.notification.enums.Type;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface NotificationTeamInviteRepository  extends JpaRepository<NotificationTeamInvite, Long> {
    @Query("""
           SELECT m FROM Member m 
           WHERE m.nickname IN :nicknames 
           AND m.id NOT IN (SELECT tm.member.id FROM TeamMember tm WHERE tm.team.id = :teamId) 
           AND m.id NOT IN (SELECT nti.notification.receiver.id FROM NotificationTeamInvite nti 
           WHERE nti.team.id = :teamId AND nti.status = 'WAIT')
           """)
    List<Member> findInvitableMembers(@Param("teamId") Long teamId, @Param("nicknames") List<String> nicknames);

    @Query("""
           SELECT CASE WHEN COUNT(nt) > 0 THEN TRUE ELSE FALSE END 
           FROM Notification n JOIN NotificationTeamInvite nt ON n.id = nt.id
           WHERE n.type = :type AND n.receiver.id = :receiverId AND nt.status = :status
           """)
    boolean existsByTypeAndReceiverIdAndStatus(
            @Param("type") Type type,
            @Param("receiverId") Long receiverId,
            @Param("status") Status status);

}
