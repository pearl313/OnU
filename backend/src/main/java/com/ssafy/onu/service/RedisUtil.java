package com.ssafy.onu.service;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.Map;
import java.util.Set;

@Service
public class RedisUtil {
    private final RedisTemplate redisTemplate;

    public RedisUtil(RedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

    public void setData(String key, String value, int expiredMinute) {
        redisTemplate.opsForValue().set(key, value, Duration.ofMinutes(expiredMinute));
    }

    public String getData(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }

    public void deleteDate(String key) {
        redisTemplate.delete(key);
    }

    public boolean hasNutrient(String key, String value) {
        return redisTemplate.opsForHash().hasKey(key, value);
    }

    public Set<String> getKeys(String key){
        return redisTemplate.opsForHash().keys(key);
    }

    public String getNutrientInfo(String nutrientId, String key){
        return (String) redisTemplate.opsForHash().get(nutrientId, key);
    }

    public void cacheNutrient(String nutrientId, Map<String, Object> nutrientInfo){
        redisTemplate.opsForHash().putAll(nutrientId, nutrientInfo);
    }
    public String getIntake(String key) {
        return (String) redisTemplate.opsForValue().get(key);
    }
    public void setData(String key, String value) {
        redisTemplate.opsForValue().set(key, value);
    }
    public Map<String,Object> getHash(String key){
        return redisTemplate.opsForHash().entries(key);
    }
}
