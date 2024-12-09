const app = getApp();
const qnUploader = require('../../utils/qiniuUploader.js')
// pages/myinfo/myinfo.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl:'http://scdwjow71.hn-bkt.clouddn.com/202304280956875.png',
    username: '仲夏',
    id: 121212123,
    picker: {
      arr: ['男', '女'],
      index: 0
    },
    message: ''
  },

  onShow() {
    if(app.globalData.isEnableLogin === true){
      this.getInfo();
    }
  },
  

  changeName:function (e) {   //更改用户名
    console.log(e.detail);
    this.setData({
      username:e.detail
    })
  },

  introInput:function (e) {   //更改个性签名
    console.log(e.detail);
    this.setData({
      message:e.detail
    })
  },

  changeInfo: function (e) {
    this.updateInfo()
    // app.globalData.isClick = true
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },

  updateInfo:function () {
   wx.request({
     url: 'http://127.0.0.1:3008/user/account/updateInfo/',
     method:"POST",
     data:{
       photo:this.data.imgUrl,
       gender:this.data.picker.arr[this.data.picker.index],
       ID:this.data.id,
       intro:this.data.message,
     },
     header: { 
      "Content-Type": "application/x-www-form-urlencoded" ,//POST方式，
      'token': 'Bearer '+ app.globalData.token
      },
      success:(res)=>{
        wx.showToast({
          title: '保存成功',
          icon: 'none'
        })
      },
      fail:(res) =>{
        wx.showToast({
          title: '保存失败',
          icon: 'none'
        })
      }
   })
  },

  getInfo(){
    wx.request({
      url: 'http://127.0.0.1:3008/user/account/info/',
      method:'GET',
      header: {
        'token': 'Bearer '+ app.globalData.token
    },
      success: (res) => {
       console.log(res.data);
       var sex=0;
       if(res.data.sex == '女'){
         sex = 1;
       }
       this.setData({
        'username':res.data.nickname,
        imgUrl:res.data.photo,
        id:res.data.IIDDD,
        message:res.data.intro,
        'picker.index': sex
      })
      },
      fail: (res) =>{
        console.log("knnknn");
      }
    })
  },


  // 头像更换   
  changehead: function () {
    // 选择图片
    wx.chooseMedia({
      count: 1,
      mediaType: ['image', 'video'],
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        console.log(res);
        this.setData({
          imgUrl: res.tempFiles[0].tempFilePath
        })
        this.uploadImgQn(res.tempFiles[0].tempFilePath);
      }
    })
  },
  // 将图片上传至七牛云
  uploadImgQn: function (imgUrl) {
    var key =  new Date().getTime() + '.jpg';
    // 向自己服务器请求token（七牛云上传凭证）
    wx.request({
      url: 'http://127.0.0.1:8080/20JkCourseWeb/GetToken',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
      },
      data: {
        key: key
      },
      success: (res) => {
        var token = res.data.data.token;
        // 设置七牛上传的一些属性options
        const options = {
          region: 'SCN', // 七牛空间所在区域
          domain: 'http://scdwjow71.hn-bkt.clouddn.com', // 改为自己的七牛CDN域名，试用阶段为测试域名（30天有效期）
          uptoken: token, // 上传凭证
          key: key, // 指定上传文件key值，同名文件会自动覆盖
        };
        qnUploader.upload(imgUrl, (res) => {
            // console.log(res);
            // 将七牛图片url渲染到页面中
            this.setData({
              imgUrl: res.imageURL
            })
          }, (err) => {}, options,
          (progress) => { // 上传进度
            console.log(progress);
            wx.showToast({
              title: '上传中' + progress.progress + '%',
              icon: 'none'
            })
          },
          null, null, (complete) => {

          });
      }
    })
  },

  // 性别选项
  pickerChange: function (e) {
    var index = e.detail.value;
    this.setData({
      'picker.index': index
    })
  },


})