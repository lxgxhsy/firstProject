// pages/activityRank/Laster.js
Page({
  data: {
    clubList: [{
        id: 1,
        name: "百词大赛",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/baicidasai.png",
        clubName: "英语社",
        time: "2023-05-08"
      },
      {
        id: 2,
        name: "书法展览",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/shufa.png",
        clubName: "足球社",
        time: "2023-05-06"
      },
      {
        id: 3,
        name: "象棋比赛",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/qi.png",
        clubName: "音乐社",
        time: "2023-05-03"
      },
      {
        id: 4,
        name: "朗诵中国",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg",
        clubName: "诗词社",
        time: "2023-04-23"
      },
      {
        id: 5,
        name: "篮球大赛",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/篮球.jpg",
        clubName: "篮球社",
        time: "2023-04-12"
      },
    ],

  },

  toActivityIndex(){
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex',
    })
  },

  onShow() {
    this.actNew();
  },

  actNew: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/getActivityOrderByLast/',
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        this.setData({ // 清空数组
          clubList: null
        });
        for (let i = 0; i < res.data.length; i++) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].title,
            images: res.data[i].imgurl,
            clubName: res.data[i].name,
            time: res.data[i].starttime.slice(0,10)
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
})