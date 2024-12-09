package com.kob.qimoxiangmu.consumer.utils;

import com.kob.qimoxiangmu.pojo.Bot;
import io.swagger.models.auth.In;

import javax.print.attribute.standard.PrinterMakeAndModel;
import java.util.ArrayList;
import java.util.Random;
import java.util.concurrent.locks.ReentrantLock;

public class Game extends Thread{
      private final Integer rows;
      private final Integer cols;
      private final Integer inner_walls_count;
      private final int[][]g;
      private final static int[] dx = {-1, 0, 1, 0}, dy = {0, 1, 0, -1};
      private final Player playerA, playerB;
      private Integer nextStepA = null;
      private Integer nextStepB = null;
      private ReentrantLock lock = new ReentrantLock();
      private String status = "playing"; //playing -> finished
      private String loser = "";//all : 平局 ，A: A输 ，B: B输

    private final static String addBotUrl = "http://127.0.0.1:3002/bot/add/";

    public Game(
            Integer rows,
            Integer cols,
            Integer inner_walls_count,
            Integer idA,
            Bot botA,
            Integer idB,
            Bot botB
    ){
        this.rows = rows;
        this.cols = cols;
        this.inner_walls_count = inner_walls_count;
        this.g = new int[rows][cols];

        Integer botIdA = -1, botIdB = -1;
        String botCodeA = "", botCodeB = "";
        if(botA != null){
            botIdA = botA.getId();
            botCodeA = botA.getContent();
        }
        if(botB != null){
            botIdB = botB.getId();
            botCodeB = botB.getContent();
        }
        playerA = new Player(idA, botIdA, botCodeA, rows - 2, 1, new ArrayList<>());
        playerB = new Player(idB, botIdB, botCodeB, cols - 2, 1, new ArrayList<>());
    }

    public Player getPlayerA() { return playerA; }

    public Player getPlayerB() {
        return playerB;
    }

    public void setNextStepA(Integer nextStepA){
        lock.lock();
        try {
            this.nextStepA = nextStepA;
        }finally {
            lock.unlock();
        }
    }
    public void setNextStepB(Integer nextStepB){
        lock.lock();
        try {
            this.nextStepB = nextStepB;
        }finally {
            lock.unlock();
        }
    }

    public int[][] getG(){return g;}

    private boolean check_connectivity(int sx, int sy, int tx, int ty){
        if(sx == tx && sy == ty)return true;
        g[sx][sy] = 1;

        for (int i = 0; i < 4; i++) {
            int x = sx  + dx[i], y = sy + dy[i];
            if(x >= 0 && x < this.rows && y >= 0 && y < this.cols && g[x][y] == 0){
                if(check_connectivity(x, y, tx, ty)){
                    g[sx][sy] = 0;
                    return true;
                }
            }
        }
        g[sx][sy] = 0;
        return false;
    }

    private boolean draw(){ //画地图
        for (int i = 0; i < this.rows; i ++) {
            for (int j = 0; j < this.cols; j ++) {
                g[i][j] = 0;
            }
        }
        for (int r = 0; r < this.rows; r ++) {
            g[r][0] = g[r][this.cols - 1] = 1;
        }

        for (int c = 0; c < this.cols; c ++) {
            g[0][c] = g[0][this.rows - 1] = 1;
        }
        Random random = new Random();
        for (int i = 0; i < this.inner_walls_count / 2; i ++) {
            for (int j = 0; j < 1000; j++) {
                int r = random.nextInt(this.rows);
                int c = random.nextInt(this.cols);

                if(g[r][c] == 1 || g[this.rows - 1 - r][this.cols - 1 - c] == 1)
                    continue;
                if(r == this.rows - 2 && c == 1 || r == 1 && c == this.cols - 2)
                    continue;

                g[r][c] = g[this.rows - r - 1][this.cols - c -1] = 1;
                break;

            }

        }
        return check_connectivity(this.rows - 2, 1, 1, this.cols - 2);
    }

    private void createMap(){
        for (int i = 0; i < 1000; i++) {
            if(draw())
                break;
        }
    }

    private String getInput(Player player){
        Player  me, you;
        if(playerA.getId().equals(player.getId())){
            me = playerA;
            you = playerB;
        }else{
            me = playerB;
            you = playerA;
        }
        return getMapString() + '#'
    }

    private String getMapString(){
        StringBuilder res = new StringBuilder();

    }

    @Override
    public void run() {
        super.run();
    }
}
