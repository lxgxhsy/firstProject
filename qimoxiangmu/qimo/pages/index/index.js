const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // value: '',
    // TabCur: 0,
    // scrollLeft: 0,
    //存放轮播图数据的列表
    clubSwiper: [{
      id: 1,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/club/篮球.jpg'
    }, {
      id: 2,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/club/摄影.jpg'
    }],
    activitySwiper: [{
      id: 1,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/qi.png'
    }, {
      id: 2,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg'
    }],

    //存放九宫格数据的列表
    clubMostNumber: [{ // 人数最多
      id: 1,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/club/篮球.jpg',
      name: '篮球社'
    }, {
      id: 2,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/秋水.jpg',
      name: '秋水文学社'
    }],
    clubHot: [{ // 近期热门
      id: 1,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/街舞.jpg',
      name: '街舞社'
    }, {
      id: 2,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/诗词.jpg',
      name: '诗词社'
    }],
    clubUpdate: [{ // 近期更新
      id: 1,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/动漫.jpg',
      name: '动漫社'
    }, {
      id: 2,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/club/摄影.jpg',
      name: '摄影社'
    }],

    actOnClick: [{ // 点击最多
      id: 1,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/activity/qi.png',
      title: '象棋大赛',
      clubId:1
    }, {
      id: 2,
      image: 'http://ru857uat2.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg',
      title: '诗歌朗诵比赛',
      clubId:1
    }],
    actNew: [{ // 最新活动
      id: 1,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg',
      title: '诗歌朗诵比赛',
      clubId:1
    }, {
      id: 2,
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/activity/shufa.png',
      title: '书法大赛',
      clubId:1
    }],
    index: 0
  },

  toNumber: function () {
    wx.navigateTo({
      url: '/pages/clubRank/number',
    })
  },

  toHot: function () {
    wx.navigateTo({
      url: '/pages/clubRank/hot',
    })
  },

  toUpdate: function () {
    wx.navigateTo({
      url: '/pages/clubRank/update',
    })
  },

  toClick: function () {
    wx.navigateTo({
      url: '/pages/activityRank/clickNumber',
    })
  },

  toLaster: function () {
    wx.navigateTo({
      url: '/pages/activityRank/Laster',
    })
  },

  toClubIndex: function (e) {
    var cid = e.currentTarget.dataset.id;
    console.log(cid);
    wx.navigateTo({
      url: '/pages/clubindex/clubindex?id=' + cid,
    })
  },

  toActivityIndex: function (e) {
    var id = e.currentTarget.dataset.id;
    var cid = e.currentTarget.dataset.clubid;
    console.log(id+'：'+cid);
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex?cid=' + cid + '&id=' + id,
    })
  },

  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  // 社团查询
  UpdateQuick: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getClubByLastActivity1/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          'clubUpdate[0].id': res.data[0].id,
          'clubUpdate[0]image': res.data[0].imgurl,
          'clubUpdate[0].name': res.data[0].name,
          'clubUpdate[1].id': res.data[1].id,
          'clubUpdate[1]image': res.data[1].imgurl,
          'clubUpdate[1].name': res.data[1].name
        })
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },
  HotMost: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getClubOrderActivityMem1/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          'clubHot[0].id': res.data[0].id,
          'clubHot[0]image': res.data[0].imgurl,
          'clubHot[0].name': res.data[0].name,
          'clubHot[1].id': res.data[1].id,
          'clubHot[1]image': res.data[1].imgurl,
          'clubHot[1].name': res.data[1].name
        })
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },
  NumberMost: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getClubOrderByMem1/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          'clubMostNumber[0].id': res.data[0].id,
          'clubMostNumber[0]image': res.data[0].imgurl,
          'clubMostNumber[0].name': res.data[0].name,
          'clubMostNumber[1].id': res.data[1].id,
          'clubMostNumber[1]image': res.data[1].imgurl,
          'clubMostNumber[1].name': res.data[1].name
        })
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },

  // 活动查询
  activityClick: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/getActivityOrderByMem1/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          'actOnClick[0].id': res.data[0].id,
          'actOnClick[0]image': res.data[0].imgurl,
          'actOnClick[0].title': res.data[0].title,
          'actOnClick[0].clubId': res.data[0].clubid,
          'actOnClick[1].id': res.data[1].id,
          'actOnClick[1]image': res.data[1].imgurl,
          'actOnClick[1].title': res.data[1].title,
          'actOnClick[0].clubId': res.data[0].clubid
        })
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },
  actNew: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/getActivityOrderByLast/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data)
        this.setData({
          'actNew[0].id': res.data[0].id,
          'actNew[0]image': res.data[0].imgurl,
          'actNew[0].title': res.data[0].title,
          'actNew[0].clubId': res.data[0].clubid,
          'actNew[1].id': res.data[1].id,
          'actNew[1]image': res.data[1].imgurl,
          'actNew[1].title': res.data[1].title,
          'actNew[0].clubId': res.data[0].clubid
        })
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },

  // onLoad() {
  //   if (app.globalData.isEnableLogin === false) {
  //     wx.navigateTo({
  //       url: '/pages/login/index',
  //     })
  //   }
  // },

  onShow() {
    this.UpdateQuick();
    this.HotMost();
    this.NumberMost();
    this.activityClick();
    this.actNew();
  }

})