package com.fastarm.back.karaoke.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotFoundMachineException extends CustomException {
    public NotFoundMachineException() {
        super(KaraokeExceptionConstants.NOT_FOUND_MACHINE);
    }
}
