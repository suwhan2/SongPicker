package com.fastarm.back.connection.service;

import com.fastarm.back.common.service.RedisService;
import com.fastarm.back.connection.dto.ConnectionDto;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ConnectionService {

    private final RedisService redisService;

    public void setConnection(ConnectionDto connectionDto) {

    }
}
