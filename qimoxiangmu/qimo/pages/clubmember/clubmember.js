// pages/clubmember/clubmember.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubid: 1,
    memberList: [{
      id: 1,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户xxx',
      posts: '社长',
      signature: '该用户未编辑个性签名'
    }, {
      id: 2,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户zzz',
      posts: '副社长',
      signature: '节约时间，也就是使一个人的有限的生命，更加有效，而也就等于延长了人的寿命。'
    }, {
      id: 3,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户yyy',
      posts: '成员',
      signature: '该用户未编辑个性签名'
    }],


    modalList: [{
      id: 1,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户xxx',
      reason: '该用户未编辑个性签名'
    }, {
      id: 2,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户zzz',
      reason: '节约时间，也就是使一个人的有限的生命，更加有效，而也就等于延长了人的寿命。'
    }, {
      id: 3,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户yyy',
      reason: '该用户未编辑个性签名'
    }, {
      id: 4,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户yyy',
      reason: '该用户未编辑个性签名'
    }, {
      id: 5,
      headImg: 'http://rtm2v5ukd.hn-bkt.clouddn.com/202304280956875.png',
      name: '用户yyy',
      reason: '该用户未编辑个性签名'
    }],
    showModal: false,
  },

  onLoad(option) {
    this.setData({
      clubid: option.id
    })
    console.log(this.data.clubid);
  },

  onShow() {
    this.getMember();
    this.getInMember();
  },

  // 获取已加入的
  getMember: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/joined/' + this.data.clubid + '/',
      method: 'GET',
      success: (res) => {
        // console.log(res.data);
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

  // 获取申请
  getInMember: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/injoined/' + this.data.clubid + '/',
      method: 'GET',
      success: (res) => {
        console.log(res.data);
        this.setData({ // 清空数组
          modalList: null
        });
        if(res.data[0].error_message !== '我的天呐，当前社团还没有申请的人！！！！'){
          for (let i = res.data.length - 1; i >= 0; i--) {
            var newarray = [{
              id: res.data[i].id,
              name: res.data[i].nickname,
              headImg: res.data[i].imgurl,
              reason: res.data[i].detail
            }];
            //使用concat()来把两个数组合拼起来
            this.data.modalList = newarray.concat(this.data.modalList);
          }
          // 删去最开始的数组
          this.data.modalList.splice(this.data.modalList.length - 1, 1);
          this.setData({
            modalList: this.data.modalList
          });
          console.log(this.data.modalList);
        }
      },
      fail() {
        console.log("查人失败");
      }
    })
  },

  // 弹窗
  showDialogBtn: function () {
    this.setData({
      showModal: true
    })
  },

  // 弹出框蒙层，避免在弹窗后还可以点击或者滑动蒙层下的界面
  preventTouchMove: function () {},

  // 隐藏模态对话框
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },

  // 取消按钮
  onCancel: function () {
    this.hideModal();
    this.refuseAll();
  },

  // 确认按钮
  onConfirm: function () {
    this.hideModal();
    this.agreeAll()
  },

  agreeOne: function (e) {
    var userid = e.currentTarget.dataset.userid;
    console.log(userid);
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/AgreeJoinClub/' + userid + '/'+this.data.clubid+'/',
      method: 'POST',
      data:{
        userid:userid,
        clubid:this.data.clubid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式
        'token': 'Bearer '+ app.globalData.token
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.error_message === '该用户没有权限或者该社团没有此用户,请先去添加！！'){
          wx.showToast({
            title: '没有权限操作',
            icon: 'none',  
            duration: 2000     
          })  
        }
        this.onShow()
      }
    })
  },
  refuseOne: function (e) {
    var userid = e.currentTarget.dataset.userid;
    console.log(userid);
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/RefuseJoinClub/' + userid + '/'+this.data.clubid+'/',
      method: 'POST',
      data:{
        userid:userid,
        clubid:this.data.clubid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式
        'token': 'Bearer '+ app.globalData.token
      },
      success: (res) => {
        console.log(res.data);
        wx.showToast({
          title: '没有权限操作',
          icon: 'none',  
          duration: 2000     
        })  
        this.onShow()
      }
    })
  },
  agreeAll: function () {
    // var userid = e.currentTarget.dataset.userid;
    // console.log(userid);
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/AgreeAllJoinClub/'+this.data.clubid+'/',
      method: 'POST',
      data:{
        clubid:this.data.clubid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式
        'token': 'Bearer '+ app.globalData.token
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.error_message === '该用户没有权限或者该社团没有此用户,请先去添加！！'){
          wx.showToast({
            title: '没有权限操作',
            icon: 'none',  
            duration: 2000     
          })  
        }
        this.onShow()
      }
    })
  },
  refuseAll: function () {
    // var userid = e.currentTarget.dataset.userid;
    // console.log(userid);
    wx.request({
      url: 'http://127.0.0.1:3008/club/index/RefuseAllJoinClub/'+this.data.clubid+'/',
      method: 'POST',
      data:{
        clubid:this.data.clubid
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式
        'token': 'Bearer '+ app.globalData.token
      },
      success: (res) => {
        console.log(res.data);
        if(res.data.error_message === '该用户没有权限或者该社团没有此用户,请先去添加！！'){
          wx.showToast({
            title: '没有权限操作',
            icon: 'none',  
            duration: 2000     
          })  
        }
        this.onShow()
      }
    })
  },
})