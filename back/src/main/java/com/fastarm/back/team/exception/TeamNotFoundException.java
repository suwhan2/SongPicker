package com.fastarm.back.team.exception;

import com.fastarm.back.common.exception.CustomException;

public class TeamNotFoundException extends CustomException {
    public TeamNotFoundException() {
        super(TeamExceptionConstants.Team_Not_Found_Exception);
    }
}
