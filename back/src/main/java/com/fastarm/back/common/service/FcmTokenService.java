package com.fastarm.back.common.service;

import com.fastarm.back.common.constants.FcmTokenConstants;
import com.fastarm.back.common.constants.RedisConstants;
import com.fastarm.back.common.constants.RedisExpiredTimeConstants;
import com.fastarm.back.common.constants.RedisFieldConstants;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class FcmTokenService {

    private final RedisService redisService;
    private static final Logger logger = LoggerFactory.getLogger(FcmTokenService.class);

    public void setFcmToken(String loginId, String token){
        redisService.setData(RedisConstants.TOKEN + loginId, RedisFieldConstants.FCM, token);
    }

    public String getFcmToken(String loginId){
        return (String)redisService.getData(RedisConstants.FCM_TOKEN + loginId);
    }

    public void deleteFcmToken(String loginId){
        redisService.deleteData(RedisConstants.FCM_TOKEN + loginId);
    }

}
