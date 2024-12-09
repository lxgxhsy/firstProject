package com.kob.qimoxiangmu.service.impl.pk;

import com.kob.qimoxiangmu.service.pk.StartGameService;

public class StartGameServiceImpl implements StartGameService {

    @Override
    public String startGame(Integer aId, Integer aBotId, Integer bId, Integer bBotId) {
        System.out.println("start game: " + aId + " " + aBotId + " " + bId + " " + bBotId);

        return null;
    }
}
