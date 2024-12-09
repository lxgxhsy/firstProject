package com.kob.qimoxiangmu.consumer;

import com.kob.qimoxiangmu.mapper.UserMapper;
import com.kob.qimoxiangmu.pojo.User;
import io.swagger.models.auth.In;
import org.springframework.stereotype.Component;

import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.util.concurrent.ConcurrentHashMap;

@Component
@ServerEndpoint("/websocket/{token}")
public class WebSocketServer {
    final public static ConcurrentHashMap<Integer, WebSocketServer> users = new ConcurrentHashMap<>();

    private User user;
    private Session session = null;

    public static UserMapper userMapper;


}
