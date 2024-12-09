const app = getApp()
Page({
  data: {
    onClub: false,
    onAud: false,
    id: 2,
    imgUrl: 'http://rvvfyy1xi.hn-bkt.clouddn.com/news-details-img-1.jpg',

    clubName: '动漫社',
    describes: '',

    memberList: [{
      id: 1,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户xxx',
      posts: '社长',
      signature: '该用户未编辑个性签名'
    }, {
      id: 2,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户yyy',
      posts: '-社长',
      signature: '该用户未编辑个性签名'
    }, {
      id: 3,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户zzz',
      posts: '成员',
      signature: '该用户未编辑个性签名'
    }, {
      id: 4,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: 'aaa',
      posts: '成员',
      signature: '该用户未编辑个性签名'
    }],

    clubActivityList: [{
      id: 1,
      name: "象棋大赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/qi.png",
      time: "2011/2/23~3/10",
      ClubName: "象棋社"
    }, {
      id: 2,
      name: "百词竞赛",
      images: "http://ru857uat2.hn-bkt.clouddn.com/images/activity/baicidasai.png",
      time: "2011/2/23~3/10",
      ClubName: "英语社"
    }],
  },

  onLoad(option) {
    if (option != null) {
      this.setData({
        id: option.id
      })
    }
    // console.log(this.data.id);
  },

  onShow() {
    // console.log(this.data.id);
    this.getClubInfo();
    this.getClubMember();
    this.getClubAct();
  },

  toMember: function () {
    wx.navigateTo({
      url: '/pages/clubmember/clubmember?id=' + this.data.id,
    })
  },

  toActivity:function(e){
    console.log(e);
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex?cid=' + this.data.id+'&id='+e.currentTarget.dataset.id
    })
  },
  toAddAct: function () {
    // console.log(this.data.id);
    wx.navigateTo({
      url: '/pages/addactivity/addactivity?id=' + this.data.id,
    })
  },

  judge:function () {
    wx.request({
      url: 'http://127.0.0.1:3008/user/judge/' + this.data.id + '/',
      method: 'GET',
      header: {
        'token': 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        console.log(res.data[0]);
        this.setData({
          onClub: res.data[0].error_message,
          onAud: res.data[0].ischeck
        })
        console.log(this.data);
      },
    })
  },

  // 获取社团信息
  getClubInfo: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/clubMessage/' + this.data.id + '/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data);
        this.judge()
        this.setData({
          imgUrl: res.data[0].backgroundurl,
          clubName: res.data[0].name,
          describes: res.data[0].slogan
        })
        console.log(this.data.describes);
      },
    })
  },

  // 获取用户
  getClubMember: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/joined/' + this.data.id + '/',
      method: 'GET',
      success: (res) => {
        console.log(res.data);
        this.setData({ // 清空数组
          memberList: null
        });
        for (let i = res.data.length - 1; i >= 0; i--) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].nickname,
            headImg: res.data[i].imgurl,
            signature: res.data[i].intro,
            posts: res.data[i].role == 1 ? '社长' : '成员'
          }];
          //使用concat()来把两个数组合拼起来
          this.data.memberList = newarray.concat(this.data.memberList);
        }
        // 删去最开始的数组
        this.data.memberList.splice(this.data.memberList.length - 1, 1);
        this.setData({
          memberList: this.data.memberList
        });
      },
      fail() {
        console.log("查人失败");
      }
    })
  },

  // 获取活动
  getClubAct: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/ActMessage/' + this.data.id + '/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data);
        this.setData({ // 清空数组
          clubActivityList: null
        });
        for (let i = res.data.length - 1; i >= 0; i--) {
          var newarray = [{
            id: res.data[i].id,
            name: res.data[i].name,
            images: res.data[i].imgurl,
            time: res.data[i].starttime.slice(0, 10),
            ClubName: res.data[i].clubName
          }];
          //使用concat()来把两个数组合拼起来
          this.data.clubActivityList = newarray.concat(this.data.clubActivityList);
        }
        // 删去最开始的数组
        this.data.clubActivityList.splice(this.data.clubActivityList.length - 1, 1);
        this.setData({
          clubActivityList: this.data.clubActivityList
        });
      },
      fail() {
        console.log("查人失败");
      }
    })
  },

  // 加入
  JoinTo: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/joinClub/' + this.data.id + '/',
      method: 'POST',
      data: {
        clubid: this.data.id
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式
        'token': 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        console.log(res.data);
        this.getClubInfo();
          wx.showToast({
            title: '申请成功',
            icon: 'none', //如果要纯文本，不要icon，将值设为'none'
            duration: 2000
          })
      },
    })
  },

  join: function () {
    wx.showModal({
      title: '提示',
      content: '确定加入该社团吗？',
      success: (res) => {
        if (res.confirm) {
          // console.log('用户点击确定')
          this.JoinTo();
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})