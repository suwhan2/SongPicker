package com.fastarm.back.connection.dto;

import com.fastarm.back.karaoke.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConnectInfoDto {
    private Type type;
    private String nickname;
    private Long groupId;
}
