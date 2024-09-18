package com.fastarm.back.auth.validation.annotation;

import com.fastarm.back.auth.validation.validator.PhoneAuthPurposeValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.PARAMETER, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PhoneAuthPurposeValidator.class)
public @interface PhoneAuthPurpose {
    String message() default "전화번호 인증 목적 형식 불일치";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}

