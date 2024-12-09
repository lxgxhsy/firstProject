const app = getApp();
Page({
  data: {
    activityList: [{
      id: 1,
      name: "象棋大赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/qi.png",
      time: "2011/2/23~3/10",
      ClubName: "象棋社",
      clubId: 1,
    }, {
      id: 2,
      name: "百词竞赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/baicidasai.png",
      time: "2011-2 --23---",
      ClubName: "英语社",
      clubId: 1,
    }, {
      id: 3,
      name: "阅读大赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/shufa.png",
      time: "2011-2 --23---",
      ClubName: "秋水文学社",
      clubId: 1,
    }, {
      id: 4,
      name: "书法大赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/M-630894-9204CD13.jpg",
      time: "2011-2 --23---",
      ClubName: "书法社",
      clubId: 1,
    }, {
      id: 5,
      name: "阅读大赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/baicidasai.png",
      time: "2011-2 --23---",
      ClubName: "秋水文学社",
      clubId: 1,
    }],
  },

  toSearch: function () {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },

  toActivityIndex: function (e) {
    var id = e.currentTarget.dataset.actid;
    var cid = e.currentTarget.dataset.clubid;
    console.log(id + ':' + cid);
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex?id=' + id +'&cid=' +cid,
    })
  },

  onShow() {
    this.getActivity();
  },

  //获取所有活动？？？
  getActivity: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/getList/',
      method: 'GET',
      header: {
        'token': 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        console.log(res.data)
        this.setData({ // 清空数组
          activityList: null
        });
        for (let i = 0; i < res.data.length; i++) {
          var newarray = [{
            id: res.data[i].activity.id,
            name: res.data[i].activity.title,
            images: res.data[i].activity.imgurl,
            time: res.data[i].activity.starttime.slice(0, 10),
            ClubName: res.data[i].clubName,
            clubId: res.data[i].activity.clubid
          }];
          //使用concat()来把两个数组合拼起来
          this.data.activityList = newarray.concat(this.data.activityList);
        }
        // 删去最开始的数组
        // console.log(this.data.activityList.length-1);
        this.data.activityList.splice(this.data.activityList.length - 1, 1);
        this.setData({
          activityList: this.data.activityList
        });
        // console.log(this.data.activityList)
      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },

})