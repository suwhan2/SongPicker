package com.fastarm.back.connection.dto;

import com.fastarm.back.connection.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ReservationDto {
    private int number;
    private String nickname;
}
