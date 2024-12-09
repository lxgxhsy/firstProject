// pages/classify-index/classify-index.js
Page({
  data: {
    club: [{
        id: 1,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%A7%8B%E6%B0%B4.jpg',
        name: '秋水文学社',
        slogan: '有朋自远方来！',
      },
      {
        id: 2,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%8B%B1%E8%AF%AD.jpg',
        name: '英语俱乐部',
        slogan: '欢迎加入我们社团！',
      },
      {
        id: 3,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%AF%97%E8%AF%8D.jpg',
        name: '古今诗词学社',
        slogan: '欢迎加入我们社团！',
      },
      {
        id: 4,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E5%91%A8%E6%98%93.jpg',
        name: '周易研究学会',
        slogan: '欢迎加入我们社团！',
      },
      {
        id: 5,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E6%97%B6%E6%94%BF%E8%AE%BA%E5%9D%9B.jpg',
        name: '时政论坛',
        slogan: '欢迎加入我们社团！',
      },
      {
        id: 6,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E9%A9%AC%E5%85%8B%E6%80%9D.jpg',
        name: '马克思主义研究会',
        slogan: '欢迎加入我们社团！',
      },
    ],
    characteristicid: 1
  },

  onLoad(option){
    this.setData({
      characteristicid:option.characteristicid
    })
    // console.log(option.characteristicid);
  },
  onShow() {
    this.getDetailClubList();
  },
  //根据ID搜索某一类的所有信息；
  //建议是在查看更多的那个按钮上面绑定1，2，3，4的信息
  //左右
  getDetailClubList: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getListById/' + this.data.characteristicid + '/',
      method: 'POST',
      data: {
        characteristicid: this.data.characteristicid,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式
      },
      success: (res) => {
        console.log(res.data);
        this.setData({      // 清空数组
          club: null
        });
        for (let i = 1; i < res.data.length; i++) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].name,
            src: res.data[i].imgrl,
            slogan: res.data[i].intro
          }];
          //使用concat()来把两个数组合拼起来
          this.data.club = newarray.concat(this.data.club);
        }
        // 删去最开始的数组
        // console.log(this.data.activityList.length-1);
        this.data.club.splice(this.data.club.length-1, 1);
        this.setData({
          club: this.data.club
          });
        // console.log(this.data.club)
      },
    })
  }
})