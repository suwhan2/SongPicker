package com.fastarm.back.history.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DateSongsDto {
    private int year;
    private int month;
    private int day;
    private String loginId;
}
