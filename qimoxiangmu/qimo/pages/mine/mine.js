// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    userInfo:{},
    headimg:'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLRDYibKYKSMqko0ibCozY5XibWwv1tsxbpscZtECr20rmkTRI0nJFmdOvB1hysPfdHHt7W40rNeF0qw/132',
    username:'app',
    id: 121212123,
    message: '该用户未编辑个性签名'
  },

  myinfo: function(){
    wx.navigateTo({
      url: '/pages/myinfo/myinfo',
    })
  },
 

  onShow(){
      this.GetMyinfo();
  },

   //获取我的信息
   GetMyinfo:function() {
    wx.request({
      url: 'http://127.0.0.1:3008/user/account/info/',
      method:'GET',
      header: {
        'token': 'Bearer '+ app.globalData.token
    },
      success: (res) => {
        console.log(res.data);
        this.setData({
          username:res.data.nickname,
          headimg:res.data.photo,
          id:res.data.IIDDD,
          message:res.data.intro,
        })
        app.globalData.userid = res.data.id;
        console.log(app.globalData.userid);
      },
      fail: (res) =>{
        console.log("knnknn");
      }
    })
  },
});
