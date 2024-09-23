package com.fastarm.back.connection.dto;

import com.fastarm.back.connection.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SaveReservationDto {
    private int number;
    private String nickname;
    private Long groupId;
    private Type type;
}
