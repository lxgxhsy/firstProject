const app = getApp();
Page({
  data: {
    club_1: [{
        id: 1,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%A7%8B%E6%B0%B4.jpg',
        name: '秋水文学社',
      },
      {
        id: 2,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%8B%B1%E8%AF%AD.jpg',
        name: '英语俱乐部',
      },
      {
        id: 3,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%AF%97%E8%AF%8D.jpg',
        name: '古今诗词学社',
      },
      {
        id: 4,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E5%91%A8%E6%98%93.jpg',
        name: '周易研究学会',
      },
      {
        id: 5,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E6%97%B6%E6%94%BF%E8%AE%BA%E5%9D%9B.jpg',
        name: '时政论坛',
      },
      {
        id: 6,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E9%A9%AC%E5%85%8B%E6%80%9D.jpg',
        name: '马克思主义研究会',
      },
    ],
    club_2: [{
        id: 1,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E6%AD%A6%E6%9C%AF.jpg',
        name: '武术协会',
      },
      {
        id: 2,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%B7%86%E6%8B%B3%E9%81%93.jpg',
        name: '跆拳道协会',
      },
      {
        id: 3,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%BD%AE%E6%BB%91.jpg',
        name: '轮滑协会',
      },
      {
        id: 4,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%B6%B3%E7%90%83.jpg',
        name: '足球协会',
      },
      {
        id: 5,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/OIP-C.jpg',
        name: '乒乓球协会',
      },
      {
        id: 6,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%AF%AE%E7%90%83.jpg',
        name: '篮球协会',
      },
    ],
    club_3: [{
        id: 1,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%94%B5%E8%84%91.jpg',
        name: '电脑爱好者协会',
      },
      {
        id: 2,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%94%B5%E5%AD%90%E5%8D%8F%E4%BC%9A.jpg',
        name: '电子协会',
      },
      {
        id: 3,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E5%BB%BA%E7%AD%91.jpg',
        name: '建筑模型设计社',
      },
      {
        id: 4,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E6%91%84%E5%BD%B1.jpg',
        name: '摄影与dv爱好者协会',
      },
    ],
    club_4: [{
        id: 1,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E5%8A%A8%E6%BC%AB.jpg',
        name: '动漫社',
      },
      {
        id: 2,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E4%B9%90%E5%99%A8.jpg',
        name: '百声器乐协会',
      },
      {
        id: 3,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%A1%97%E8%88%9E.jpg',
        name: '街舞协会',
      },
      {
        id: 4,
        src: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/%E6%96%87%E5%8C%96%E5%89%A7.jpg',
        name: '晨风剧社',
      },
    ],
  },

  toclaIndex: function (e) {
    var cl = e.currentTarget.dataset.cl
    // console.log(cl);
    wx.navigateTo({
      url: '/pages/classify-index/classify-index?characteristicid=' + cl,
    })
  },

  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  toClubIndex: function (e) {
    var id = e.currentTarget.dataset.clubid;
    console.log(id);
    wx.navigateTo({
      url: '/pages/clubindex/clubindex?id=' + id,
    })
  },

  onShow() {
    this.getClubList();
  },

  getClubList: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getList/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({ // 清空数组
          club_1: null,
          club_2: null,
          club_3: null,
          club_4: null
        });
        for (let i = 0; i < res.data[1].length; i++) {
          var newarray = [{
            id: res.data[1][i].id,
            name: res.data[1][i].name,
            src: res.data[1][i].imgrl,
          }];
          this.data.club_1 = newarray.concat(this.data.club_1);
        }
        for (let i = 0; i < res.data[2].length; i++) {
          var newarray = [{
            id: res.data[2][i].id,
            name: res.data[2][i].name,
            src: res.data[2][i].imgrl,
          }]
          this.data.club_2 = newarray.concat(this.data.club_2);
        }
        for (let i = 0; i < res.data[3].length; i++) {
          var newarray = [{
            id: res.data[3][i].id,
            name: res.data[3][i].name,
            src: res.data[3][i].imgrl,
          }]
          this.data.club_3 = newarray.concat(this.data.club_3);
        }
        for (let i = 0; i < res.data[4].length; i++) {
          var newarray = [{
            id: res.data[4][i].id,
            name: res.data[4][i].name,
            src: res.data[4][i].imgrl,
          }]
          this.data.club_4 = newarray.concat(this.data.club_4);
        }
        this.data.club_1.splice(this.data.club_1.length - 1, 1);
        this.data.club_2.splice(this.data.club_2.length - 1, 1);
        this.data.club_3.splice(this.data.club_3.length - 1, 1);
        this.data.club_4.splice(this.data.club_4.length - 1, 1);
        this.setData({
          club_1: this.data.club_1,
          club_2: this.data.club_2,
          club_3: this.data.club_3,
          club_4: this.data.club_4
        });
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  }
})