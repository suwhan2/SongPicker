package com.fastarm.back.song.exception;

import com.fastarm.back.common.exception.CustomException;

public class NotFoundSongException extends CustomException {
  public NotFoundSongException(){super(SongExceptionConstants.NOT_FOUND_SONG);}
}
