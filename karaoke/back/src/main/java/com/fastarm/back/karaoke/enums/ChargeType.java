package com.fastarm.back.karaoke.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum ChargeType {
    COIN("coin"), TIME("time");

    private final String value;
}
