package com.fastarm.back.song.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Song {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private int number;

    @Column(length = 60, nullable = false)
    private String title;

    @Column(length = 256, nullable = false)
    private String singer;

    @Column(length = 256, nullable = false)
    private String lyricist;

    @Column(length = 256, nullable = false)
    private String composer;

    @Column(nullable = false)
    private LocalDate releasedAt;

    @Column(length = 256)
    private String coverImage;

    @Column(nullable = false)
    private String lyrics;

    private int acousticness;

    private int danceability;

    private int energy;

    private int bpm;

    @Column(nullable = false)
    private String key;

    private int happiness;

}
