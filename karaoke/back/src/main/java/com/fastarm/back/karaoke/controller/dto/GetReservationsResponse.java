package com.fastarm.back.karaoke.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Getter
public class GetReservationsResponse {
    private int number;
    private String title;
    private String singer;
}
