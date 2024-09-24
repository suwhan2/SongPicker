package com.fastarm.back.team.entity;

import com.fastarm.back.member.entity.Member;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
@Table(name = "member_team")
public class TeamMember {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @ManyToOne
    @JoinColumn(name = "team_id", nullable = false)
    private Team team;

    @CreatedDate
    @Column(name = "join_at", nullable = false)
    private LocalDateTime joinAt;

    //필요한가?
//    @Column(name = "withdrawn_at")
//    private LocalDateTime withdrawnAt;

}
