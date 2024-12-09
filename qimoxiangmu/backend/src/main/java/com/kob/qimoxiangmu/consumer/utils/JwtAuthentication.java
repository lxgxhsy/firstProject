package com.kob.qimoxiangmu.consumer.utils;

import com.kob.qimoxiangmu.utils.JwtUtil;
import io.jsonwebtoken.Claims;
import io.swagger.models.auth.In;

public class JwtAuthentication {
    public static Integer getUserId(String token) {
        int userId = -1;
        try {
            Claims claims = JwtUtil.parseJWT(token);
            userId = Integer.parseInt(claims.getSubject());
        } catch (Exception e) {
           throw  new RuntimeException();
        }

        return userId;
    }
}
