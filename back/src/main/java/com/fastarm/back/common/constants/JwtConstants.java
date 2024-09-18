package com.fastarm.back.common.constants;

public class JwtConstants {
    public static final Long ACCESS_EXPIRED = 1800000L;
    public static final Long REFRESH_EXPIRED = 86400000L;
    public static final int COOKIE_EXPIRED = 24*60*60;

    public static final String REFRESH_TOKEN = "RefreshToken";
}
