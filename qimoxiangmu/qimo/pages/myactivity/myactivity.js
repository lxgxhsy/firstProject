const app = getApp();
// pages/myactivity/myactivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityList: [{
      id: 1,
      name: "象棋大赛",
      images: "http://scdwjow71.hn-bkt.clouddn.com/images/activity/qi.png",
      time: "2011/2/23~3/10",
      ClubName: "象棋社"
    }, {
      id: 2,
      name: "百词竞赛",
      images: "http://scdwjow71.hn-bkt.clouddn.com/images/activity/baicidasai.png",
      time: "2011/2/23~3/10",
      ClubName: "英语社"
    }],
    overActivityList: [{
      id: 1,
      name: "阅读大赛",
      images: "http://scdwjow71.hn-bkt.clouddn.com/images/activity/shufa.png",
      time: "2011/2/23~3/10",
      ClubName: "秋水文学社",
      clubid: ''
    }, {
      id: 2,
      name: "书法大赛",
      images: "http://scdwjow71.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg",
      time: "2011/2/23~3/10",
      ClubName: "书法社"
    }, {
      id: 3,
      name: "阅读大赛",
      images: "http://scdwjow71.hn-bkt.clouddn.com/images/activity/baicidasai.png",
      time: "2011/2/23~3/10",
      ClubName: "秋水文学社"
    }, ]
  },
  onShow() {
    // if (app.globalData.isEnableLogin === true) {
      this.GetActivity();
    // }
  },

  toActivityIndex: function (e) {
    // console.log(e.currentTarget.dataset);
    var id = e.currentTarget.dataset.id
    var cid = e.currentTarget.dataset.cid
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex?id=' + id + '&cid=' + cid,
    })
  },

  toAddAct: function () {
    wx.navigateTo({
      url: '/pages/addactivity/addactivity',
    })
  },


  //获取我的活动
  GetActivity: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/user/activity/getList/',
      method: 'GET',
      header: {
        'token': 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        //建议用两个数组来存这两个状态
        console.log(res.data);
        this.setData({ // 清空数组
          activityList: null,
          overActivityList: null
        });
        for (let i = 0; i < res.data.starting.length; i++) {
          var newarray = [{
            id: res.data.starting[i].Starting.id,
            name: res.data.starting[i].Starting.title,
            images: res.data.starting[i].Starting.imgurl,
            time: res.data.starting[i].Starting.starttime.slice(0, 10),
            ClubName: res.data.starting[i].Starting.clubid,
            clubId: res.data.starting[i].Starting.clubid,
          }];
          //使用concat()来把两个数组合拼起来
          this.data.activityList = newarray.concat(this.data.activityList);
          // console.log(this.data.activityList);
                // 删去最开始的数组
        this.data.activityList.splice(this.data.activityList.length - 1, 1);
        }
        for (let i = 0; i < res.data.Ended.length; i++) {
          var newarray = [{
            id: res.data.Ended[i].Ended.id,
            name: res.data.Ended[i].Ended.title,
            images: res.data.Ended[i].Ended.imgurl,
            time: res.data.Ended[i].Ended.starttime.slice(0, 10),
            ClubName: res.data.Ended[i].Ended.clubid,
            clubId: res.data.Ended[i].Ended.clubid,
          }];
          //使用concat()来把两个数组合拼起来
          this.data.overActivityList = newarray.concat(this.data.overActivityList);
          // console.log(this.data.overActivityList);
        }
        // 删去最开始的数组
        // this.data.overActivityList.splice(this.data.overActivityList.length - 1, 1);

        this.setData({
          activityList: this.data.activityList,
          overActivityList: this.data.overActivityList
        });
        console.log(this.data.activityList);
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },

})