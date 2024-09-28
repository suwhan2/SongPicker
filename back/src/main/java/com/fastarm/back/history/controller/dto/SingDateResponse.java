package com.fastarm.back.history.controller.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class SingDateResponse {
    private LocalDate createdAt;
    private List<LocalDate> singAt;
}
