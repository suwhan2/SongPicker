package com.fastarm.back.song.exception;

import com.fastarm.back.common.exception.CustomException;
import com.fastarm.back.member.exception.MemberExceptionConstants;

public class NotFoundSongDetailException extends CustomException{
    public NotFoundSongDetailException(){super(SongExceptionConstants.NOT_FOUND_SONG_DETAIL);}
}

