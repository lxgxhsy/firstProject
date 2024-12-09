// pages/activityRank/clickNumber.js
Page({
  data: {
    clubList: [{
        id: 1,
        name: "百词大赛",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/baicidasai.png",
        clickNumber: "99",
        clubName: "英语社",
        time: "2023-05-08"
      },
      {
        id: 2,
        name: "书法展览",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/shufa.png",
        clickNumber: "90",
        clubName: "足球社",
        time: "2023-05-08"
      },
      {
        id: 3,
        name: "象棋比赛",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/qi.png",
        clickNumber: "87",
        clubName: "音乐社",
        time: "2023-05-08"
      },
      {
        id: 4,
        name: "朗诵中国",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg",
        clickNumber: "84",
        clubName: "诗词社",
        time: "2023-05-08"
      },
      {
        id: 5,
        name: "篮球大赛",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/篮球.jpg",
        clickNumber: "82",
        clubName: "篮球社",
        time: "2023-05-08"
      },
    ],

  },


  activityClick: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/getActivityOrderByMem/',
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        this.setData({ // 清空数组
          clubList: null
        });
        for (let i = res.data.length - 1; i >= 0; i--) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].title,
            images: res.data[i].imgurl,
            clickNumber: res.data[i].num,
            time: res.data[i].starttime.slice(0,10),
            clubName: res.data[i].name
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

  onShow() {
    this.activityClick();
  },

  toActivityIndex() {
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex',
    })
  }

})