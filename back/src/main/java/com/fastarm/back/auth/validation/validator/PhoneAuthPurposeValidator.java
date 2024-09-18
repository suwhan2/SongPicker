package com.fastarm.back.auth.validation.validator;

import com.fastarm.back.auth.validation.annotation.PhoneAuthPurpose;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PhoneAuthPurposeValidator implements ConstraintValidator<PhoneAuthPurpose, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext constraintValidatorContext) {
        if (value == null || value.isEmpty()) {
            return false;
        }

        for (com.fastarm.back.auth.enums.PhoneAuthPurpose purpose : com.fastarm.back.auth.enums.PhoneAuthPurpose.values()) {
            if (value.equals(purpose.getValue())) {
                return true;
            }
        }
        return false;
    }
}
