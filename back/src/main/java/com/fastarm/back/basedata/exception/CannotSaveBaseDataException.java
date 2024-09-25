package com.fastarm.back.basedata.exception;

import com.fastarm.back.common.exception.CustomException;

public class CannotSaveBaseDataException extends CustomException {
    public CannotSaveBaseDataException() {
        super(BaseDataExceptionConstants.CANNOT_SAVE_DATA);
    }
}
