package com.fastarm.back.connection.exception;

import com.fastarm.back.common.exception.CustomException;

public class CannotConnectException extends CustomException {
    public CannotConnectException() {
        super(ConnectionExceptionConstants.CANNOT_CONNECT);
    }
}
