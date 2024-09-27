package com.fastarm.back.team.validation.validator;

import com.fastarm.back.team.validation.annotation.TeamName;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;


public class TeamNameValidator implements ConstraintValidator<TeamName, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        if (value.length() > 32) {
            return false;
        }

        String regex = "^[가-힣a-zA-Z0-9_-]+$";
        return value.matches(regex);
    }
}

