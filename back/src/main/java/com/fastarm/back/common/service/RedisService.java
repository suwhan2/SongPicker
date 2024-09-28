package com.fastarm.back.common.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, Object> redisTemplate;

    public void setData(String key, Object value, Long expiredTime) {
        redisTemplate.opsForValue().set(key, value, expiredTime, TimeUnit.MILLISECONDS);
    }

    public void setData(String key, Object value) {
        redisTemplate.opsForValue().set(key, value);
    }

    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void addToList(String key, Object value, Long expiredTime) {
        redisTemplate.opsForList().rightPush(key, value);
        redisTemplate.expire(key, expiredTime, TimeUnit.MILLISECONDS);
    }

    public List<Object> getList(String key) {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public Object getFistData(String key) {
        return redisTemplate.opsForList().leftPop(key);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }
}
