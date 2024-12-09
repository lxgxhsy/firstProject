// pages/addclub/addclub.js
const app = getApp();
const qnUploader = require('../../utils/qiniuUploader.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: 'http://scdwjow71.hn-bkt.clouddn.com/images/club_background/%E9%BB%98%E8%AE%A4%E5%9B%BE%E7%89%87.png',

    name: '',
    picker: {
      arr: ['理论研究类', '体育竞技类', '科技创新类', '艺术修养类'],
      index: 0
    },
    message: ''

  },


  pickerChange: function (e) {
    var index = e.detail.value;
    console.log(index);
    this.setData({
      'picker.index': index
    })
  },

  chooseImage() {
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

  NameChange: function (e) {
    // console.log(e.detail);
    this.setData({
      name: e.detail,
    })
  },

  MessageChange: function (e) {
    // console.log(e.detail);
    this.setData({
      message: e.detail,
    })
  },

  addNew: function () {
    if (this.data.name != '' && this.data.message != '') {
      wx.showModal({
        title: '提示',
        content: '确定申请社团吗？',
        success: (res) => {
          if (res.confirm) {
            console.log('用户点击确定')
            this.init()
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showModal({
        title: '请提交完整信息',
        content: '',
      })
    }
  },

  init: function () {
    // console.log(this.data.picker.arr[this.data.picker.index]);
    wx.request({
      url: 'http://127.0.0.1:3008/club/add/',
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式，
        'token': 'Bearer ' + app.globalData.token
      },
      data: {
        imgurl: this.data.imgUrl,
        name: this.data.name,
        intro: this.data.message,
        kindname: this.data.picker.arr[this.data.picker.index],
      },
      success: (res) => {
        console.log(res.data);
        wx.showToast({
          title: '创建成功',
          icon: 'none', //如果要纯文本，不要icon，将值设为'none'
          duration: 2000
        })
      }
    })
  }

})