package com.fastarm.back.common.service;

import com.fastarm.back.common.constants.FcmTokenConstants;
import com.fastarm.back.common.constants.RedisConstants;
import com.fastarm.back.notification.controller.dto.NotificationRequest;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.WebpushConfig;
import com.google.firebase.messaging.WebpushNotification;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.concurrent.ExecutionException;


@Service
@RequiredArgsConstructor
public class FcmTokenService {

    private final RedisService redisService;
    private static final Logger logger = LoggerFactory.getLogger(FcmTokenService.class);

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
