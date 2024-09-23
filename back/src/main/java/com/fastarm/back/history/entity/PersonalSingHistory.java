package com.fastarm.back.history.entity;

import com.fastarm.back.member.entity.Member;
import com.fastarm.back.song.entity.Song;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Builder
@Getter
public class PersonalSingHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne
    @JoinColumn(name = "song_id")
    private Song song;

    @CreatedDate
    @Column(nullable = false, updatable = false)
    private LocalDateTime singAt;

}
