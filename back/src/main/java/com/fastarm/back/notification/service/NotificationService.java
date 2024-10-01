package com.fastarm.back.notification.service;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.member.exception.MemberNotFoundException;
import com.fastarm.back.member.repository.MemberRepository;
import com.fastarm.back.notification.dto.NotificationDto;
import com.fastarm.back.notification.dto.TeamInviteNotificationDto;
import com.fastarm.back.notification.entity.Notification;
import com.fastarm.back.notification.entity.NotificationTeamInvite;
import com.fastarm.back.notification.exception.AlreadyInviteException;
import com.fastarm.back.notification.exception.NotificationNotFoundException;
import com.fastarm.back.notification.repository.NotificationRepository;
import com.fastarm.back.notification.repository.NotificationTeamInviteRepository;
import com.fastarm.back.team.entity.Team;
import com.fastarm.back.team.entity.TeamMember;
import com.fastarm.back.team.repository.TeamMemberRepository;
import com.fastarm.back.notification.exception.TeamInviteNotificationNotFoundException;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.concurrent.ExecutionException;

import static com.google.firebase.messaging.Notification.*;


@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {

    private final TeamMemberRepository teamMemberRepository;
    private final NotificationRepository notificationRepository;
    private final NotificationTeamInviteRepository notificationTeamInviteRepository;
    private final MemberRepository memberRepository;
    @Transactional
    public void respondTeamInvitation(TeamInviteNotificationDto dto){
        NotificationTeamInvite notificationInvite = notificationTeamInviteRepository.findById(dto.getNotificationId())
                .orElseThrow(TeamInviteNotificationNotFoundException::new);

        if (dto.getAccept() != null && dto.getAccept()){
            notificationInvite.accept();

            Team team = notificationInvite.getTeam();
            Member member = memberRepository.findByLoginId(dto.getLoginId())
                    .orElseThrow(MemberNotFoundException::new);

            boolean alreadyExists = teamMemberRepository.existsByTeamAndMember(team,member);
            if (alreadyExists) {
                throw new AlreadyInviteException();
            }

            TeamMember teamMember = TeamMember.builder()
                    .member(member)
                    .team(team)
                    .build();

            teamMemberRepository.save(teamMember);
        } else {
            notificationInvite.reject();
        }
        notificationTeamInviteRepository.save(notificationInvite);
    }

    @Transactional
    public void readNotification(NotificationDto dto){
        Notification notification = notificationRepository.findById(dto.getNotificationId())
                .orElseThrow(NotificationNotFoundException::new);

        Member member = memberRepository.findByLoginId(dto.getLoginId())
                        .orElseThrow(MemberNotFoundException::new);

        isMemberNotification(notification,member);

        notification.read();
        notificationRepository.save(notification);

    }

    @Transactional
    public void removeNotification(NotificationDto dto){
        Notification notification = notificationRepository.findById(dto.getNotificationId())
                .orElseThrow(NotificationNotFoundException::new);

        Member member = memberRepository.findByLoginId(dto.getLoginId())
                .orElseThrow(MemberNotFoundException::new);

        isMemberNotification(notification,member);
        notification.delete();
        notificationRepository.save(notification);

    }

    @Transactional
    public void isMemberNotification(Notification notification, Member member) {
        if(!notification.getReceiver().getId().equals(member.getId()))
            throw new NotificationNotFoundException();
    }

    @Transactional
    public void sendNotification(String targetToken, String title, String body) throws ExecutionException, InterruptedException {

        Message message = Message.builder()
                .setToken(targetToken)
                .setNotification(builder()
                        .setTitle(title)
                        .setBody(body)
                        .build())
                .build();

        String response = FirebaseMessaging.getInstance().sendAsync(message).get();
        log.info("Successfully sent message: {}", response);
    }


}
