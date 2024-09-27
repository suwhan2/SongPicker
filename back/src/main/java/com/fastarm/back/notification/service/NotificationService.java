package com.fastarm.back.notification.service;

import com.fastarm.back.notification.dto.TeamInviteNotificationDto;
import com.fastarm.back.notification.entity.NotificationTeamInvite;
import com.fastarm.back.notification.repository.NotificationTeamInviteRepository;
import com.fastarm.back.team.repository.TeamMemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class NotificationService {

    private final TeamMemberRepository teamMemberRepository;
    private final NotificationTeamInviteRepository notificationTeamInviteRepository;


    @Transactional
    public void RespondTeamInvitation(TeamInviteNotificationDto dto){
//        if(dto.getAccept()){
//            NotificationTeamInvite notificationTeamInvite = notificationTeamInviteRepository.findById(dto.getNotificationId());
//        }
    }

}
