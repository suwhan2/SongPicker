package com.fastarm.back.connection.exception;

import com.fastarm.back.common.exception.CustomException;

public class AlreadyExistConnectionException extends CustomException {
    public AlreadyExistConnectionException() {
        super(ConnectionExceptionConstants.ALREADY_CONNECT);
    }
}
