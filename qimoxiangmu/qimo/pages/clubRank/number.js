// pages/clubRank/number.js
const app = getApp()

Page({
  data: {
    clubList: [{
        id: 1,
        name: "轮滑社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/轮滑.jpg",
        number: "59",
        sound: "健康运动"
      },
      {
        id: 2,
        name: "足球社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/足球.jpg",
        number: "67",
        sound: "青春舞蹈"
      },
      {
        id: 3,
        name: "乐器社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/乐器.jpg",
        number: "78",
        sound: "脑力风暴"
      },
      {
        id: 4,
        name: "诗词社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/诗词.jpg",
        number: "57",
        sound: "诗词文化"
      },
      {
        id: 5,
        name: "篮球社",
        images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/篮球.jpg",
        number: "50",
        sound: "快乐运动"
      },
    ],

  },

  onLoad() {
    this.NumberMost();
  },
  toClubIndex: function (e) {
    var cid = e.currentTarget.dataset.id;
    console.log(cid);
    wx.navigateTo({
      url: '/pages/clubindex/clubindex?id=' + cid,
    })
  },
  NumberMost: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/getClubOrderByMem/',
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
            number: res.data[i].number,
            sound: res.data[i].slogan
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