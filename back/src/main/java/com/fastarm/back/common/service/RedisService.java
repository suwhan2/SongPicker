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

    public void setHashData(String key, String field, Object value) {
        redisTemplate.opsForHash().put(key, field, value);
    }

    public Object getData(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public Object getHashData(String key, String field) {
        return redisTemplate.opsForHash().get(key, field);
    }

    public void addToList(String key, Object value) {
        redisTemplate.opsForList().rightPush(key, value);
    }

    public List<Object> getList(String key) {
        return redisTemplate.opsForList().range(key, 0, -1);
    }

    public void deleteData(String key) {
        redisTemplate.delete(key);
    }
}
