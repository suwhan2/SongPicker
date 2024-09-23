package com.fastarm.back.connection.dto;

import com.fastarm.back.connection.enums.Type;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ConnectInfoDto {
    private String serialNumber;
    private Type type;
    private Long groupId;
}
