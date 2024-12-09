// pages/login/index.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isAgree:false,
    check:false,
  },

  isEnableLogin:function(){
    var s = this.data.isAgree;
    if(s == false){
      wx.showToast({
        title: '请勾选同意协议',
      })
    }else{
      this.getUserProfile();
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        // console.log(res)
        console.log(111);
         var  username =  res.userInfo.nickName
          var imgurl =  res.userInfo.avatarUrl
          var sex = res.userInfo.gender
          app.globalData.userInfo = res.userInfo
          console.log(app.globalData.userInfo);
        wx.login({
          success: (res) => {
            if(res.code){ 
              console.log(res.code);  
          wx.request({
            url: 'http://127.0.0.1:3008/login/token/',
             method:"POST",
            data: {
              code: res.code,
              nickname:username,
              imgurll:imgurl,
              sexx:sex,        
            },
            header: { 
              "Content-Type": "application/x-www-form-urlencoded" //POST方式
              },
            success: (resp) => {
              var token = resp.data.token
              app.globalData.token = token
              console.log( app.globalData.token );
              app.globalData.isEnableLogin = true
              console.log(app.globalData.isEnableLogin + "l;,l");
              this.insertMessage();
              if(app.globalData.isEnableLogin === true){
                wx.switchTab({
                  url: '/pages/index/index',
                })
              }
            },fail:(resp) => {
              console.log("sdsd");
            }
          })
        }
      
          },
        })
      },
      fail: (res) => {
        console.log(res);
      }
    })
  },

  //将用户信息插入到用户信息表里面
  insertMessage:function () {
    wx.request({
      url: 'http://127.0.0.1:3008/user/account/save/',
      method:'POST',
      data:{
        sex:app.globalData.userInfo.gender,
        username:app.globalData.userInfo.nickName
      },
            header: { 
      "Content-Type": "application/x-www-form-urlencoded" //POST方式
      },
          success: (res) => {
         console.log(res.data);
          },
    })
  },

 
  isEnableChoose:function (res) {
    console.log(res.detail.value);
    let one = res.detail.value
    if(one.length > 0){
      this.setData({
        isAgree:true
      })
    }
      else{
        this.setData({
          isAgree:false
        })
      } 
    }
  
})