// pages/clubRank/update.js
Page({
  data: {
    clubList: [{
        id: 1,
        name: "轮滑社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/轮滑.jpg",
        time: "2023-05-06",
        slogan: "轮滑大赛"
      },
      {
        id: 2,
        name: "足球社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/足球.jpg",
        time: "2023-05-01",
        slogan: "足球校园杯"
      },
      {
        id: 3,
        name: "乐器社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/乐器.jpg",
        time: "2023-04-27",
        slogan: "奏唱新中国"
      },
      {
        id: 4,
        name: "诗词社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/诗词.jpg",
        time: "2023-04-20",
        slogan: "词牌乐"
      },
      {
        id: 5,
        name: "篮球社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/篮球.jpg",
        time: "2023-04-12",
        slogan: "三人斗牛大赛"
      },
    ],

  },

  onLoad() {
    this.UpdateQuick();
  },
  UpdateQuick: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getClubByLastActivity/',
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        this.setData({ // 清空数组
          clubList: null
        });

        for (let i = 0; i < res.data.length; i++) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].name,
            images: res.data[i].imgurl,
            time: res.data[i].intro.slice(0,10),
            slogan: res.data[i].slogan
          }];
          //使用concat()来把两个数组合拼起来
          this.data.clubList = newarray.concat(this.data.clubList);
        }
        // 删去最开始的数组
        this.data.clubList.splice(this.data.clubList.length - 1, 1);
        this.setData({
          clubList: this.data.clubList
        });
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },

  toClubIndex() {
    wx.navigateTo({
      url: '/pages/clubindex/clubindex',
    })
  }
})