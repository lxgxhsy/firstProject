package com.kob.qimoxiangmu.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.kob.qimoxiangmu.mapper.UserMapper;
import com.kob.qimoxiangmu.pojo.User;
import com.kob.qimoxiangmu.service.impl.utils.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {
   @Autowired
   private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String nickname) throws UsernameNotFoundException {
        QueryWrapper<User> queryWrapper = new QueryWrapper<>();
        queryWrapper.eq("nickname",nickname);
          User user = userMapper.selectOne(queryWrapper);
          if(user == null){
              throw new RuntimeException("用户不存在");
          }
        return new UserDetailsImpl(user);
    }
}
