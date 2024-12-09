const app = getApp();
Page({
  data: {
    id: 9,
    title: 'aaa',
    clubId: 1,
    clubName: 'xxx',
    startime: '2022-04-03',
    endtime: '2023-01-01',
    number: 20,
    result: '报名',
    com: '',
    sound: ' 欢迎大家参加我们英语社举办的百词竞赛哦，希望大家赛出风格。',
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'http://ru857uat2.hn-bkt.clouddn.com/Snipaste_2023-05-31_10-09-38.png',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }],

    comments: [{
      id: 1,
      username: '啊哈',
      userImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      time: '2022-09-09',
      content: '爱国i给发个附件是官方哈根是非常v和v很多嘎嘎还是更好的嘎飞机公司的宏观环境',
      picture: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      look: '23',
      zan: '12',
      num: '23'
    }, {
      id: 1,
      username: '啊哈',
      userImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      time: '2022-09-09',
      content: '爱国i给发个附件是官方哈根是非常v和v很多嘎嘎还是更好的嘎飞机公司的宏观环境',
      picture: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      look: '23',
      zan: '12',
      num: '23'
    }]
  },

  onLoad(option) {
    console.log(option.id + ':' + option.cid);
    this.setData({
      id: option.id,
      clubId: option.cid
    })
  },

  onShow() {
    this.getActInfo();
    this.getActCom();
  },

  comI: function (e) {
    // console.log(e.detail);
    this.setData({
      com: e.detail.value
    })
  },

  fasong: function () {
    if (this.data.com !== '') {
      wx.request({
        url: 'http://127.0.0.1:3008/activity/index/PostCommmand/',
        method: 'POST',
        data: {
          activityid: this.data.id,
          detail: this.data.com,
          imgurl: ''
        },
        header: {
          "Content-Type": "application/x-www-form-urlencoded", //POST方式
          'token': 'Bearer ' + app.globalData.token
        },
        success: (res) => {
          console.log(res);
          this.getActCom();
          this.setData({
            com: '',
          })
        }
      })
    }
    else{
      wx.showToast({
        title: '请输入内容',
        icon: 'none',
        duration: 2000
      })
    }
  },

  getActInfo: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/index/getActivityMes/' + this.data.clubId + '/' + this.data.id + '/',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式
      },
      success: (res) => {
        // console.log(res.data);
        this.setData({
          title: res.data.title,
          clubName: res.data.clubName,
          startime: res.data.startTime.slice(0, 10),
          endtime: res.data.endTime.slice(0, 10),
          number: res.data.JoinNum,
          sound: res.data.rte
        })
      },
    })
  },

  // 获取评论
  getActCom: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/index/getThreeCommand/' + this.data.clubId + '/' + this.data.id + '/',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式
      },
      success: (res) => {
        console.log(res.data);
        this.setData({ // 清空数组
          comments: null
        });
        for (let i = 0; i < res.data.length; i++) {
          var newarray = [{
            username: res.data[i].name,
            userImg: res.data[i].imgurl,
            time: res.data[i].time.slice(0, 10),
            content: res.data[i].Detail,
            picture: res.data[i].background,
            look: res.data[i].looksum,
            zan: res.data[i].dianzanNum,
            num: res.data[i].replysum
          }];
          //使用concat()来把两个数组合拼起来
          this.data.comments = newarray.concat(this.data.comments);
        }
        // 删去最开始的数组
        // console.log(this.data.activityList.length-1);
        this.data.comments.splice(this.data.comments.length - 1, 1);
        this.setData({
          comments: this.data.comments
        });
      },
    })
  },

  //跳转到所有评论页面
  gotoInfo() {
    wx.navigateTo({
      url: '/pages/activity-detail/comandAll?cid=' + this.data.clubId + '&id=' + this.data.id,
    })
  },

  //跳转到评论详情
  gotoComand() {
    wx.navigateTo({
      url: '/pages/activity-detail/comand',
    })
  },

  apply: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/activity/index/OneClickJoin/' + this.data.clubId + '/' + this.data.id + '/',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式，
        'token': 'Bearer ' + app.globalData.token
      },
      data: {
        clubid: this.data.clubId,
        activityid: this.id,
      },
      success: (res) => {
        this.setData({
          result: '已报名',
        })
        wx.showModal({
          title: '报名成功',
        })
        this.getActInfo();
      }
    })
  },

  zan: function (e) {
    console.log(e);
    // this.setData({
    //   'comments.zan': this.data.comments.zan+1
    // })
  }

})