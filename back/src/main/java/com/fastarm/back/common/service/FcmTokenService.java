package com.fastarm.back.common.service;

import com.fastarm.back.common.constants.FcmTokenConstants;
import com.fastarm.back.common.constants.RedisConstants;
import com.fastarm.back.common.constants.RedisExpiredTimeConstants;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class FcmTokenService {

    private final RedisService redisService;

    public void setFcmToken(String loginId, String token){
        redisService.setData(RedisConstants.FCM_TOKEN + loginId, token, FcmTokenConstants.FCM_TOKEN_EXPIRED);
    }

    public String getFcmToken(String loginId){
        return (String)redisService.getData(RedisConstants.FCM_TOKEN + loginId);
    }

    public void deleteFcmToken(String loginId){
        redisService.deleteData(RedisConstants.FCM_TOKEN + loginId);
    }

}
