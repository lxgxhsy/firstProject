// pages/clubRank/hot.js
const app = getApp()

Page({
  data: {
    clubList: [{
        id: 1,
        name: "街舞社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/街舞.jpg",
        number: "99",
        activityName: "街舞大赛究竟谁是冠军？？"
      },
      {
        id: 2,
        name: "足球社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/足球.jpg",
        number: "90",
        activityName: "绿茵场上谁是球王？？"
      },
      {
        id: 3,
        name: "乐器社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/乐器.jpg",
        number: "87",
        activityName: "十佳歌手就要开始啦！！"
      },
      {
        id: 4,
        name: "英语社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/英语.jpg",
        number: "84",
        activityName: "英语四六级即将到来！！！"
      },
      {
        id: 5,
        name: "篮球社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/篮球.jpg",
        number: "82",
        activityName: "篮球大赛即将开始啦！！！"
      },
    ],

  },

  toClubIndex: function (e) {
    var cid = e.currentTarget.dataset.id;
    console.log(cid);
    wx.navigateTo({
      url: '/pages/clubindex/clubindex?id=' + cid,
    })
  },
  onLoad() {
    this.HotMost();
  },
  HotMost: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getClubOrderActivityMem/',
      method: 'GET',
      success: (res) => {
        console.log(res.data)
        this.setData({ // 清空数组
          clubList: null
        });
        for (let i = res.data.length-1; i >=0 ; i--) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].name,
            images: res.data[i].imgurl,
            number: res.data.length-i+3
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
  }


})