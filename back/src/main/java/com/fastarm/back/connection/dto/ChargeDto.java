package com.fastarm.back.connection.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ChargeDto {
    private String serialNumber;
    private String type;
    private int charge;
}


