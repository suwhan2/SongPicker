package com.fastarm.back.connection.exception;

import com.fastarm.back.common.exception.CustomException;

public class CannotReserveException extends CustomException {
    public CannotReserveException() {
        super(ConnectionExceptionConstants.CANNOT_RESERVE);
    }
}
