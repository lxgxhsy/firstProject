const app = getApp()
const qnUploader = require('../../utils/qiniuUploader.js')
Page({
  data: {
    clubId: 0,
    imgList: [],
    tempFilePaths: null,
    title: '',
    content: '',
    startDate: '2021-01-01',
    endDate: '2021-01-01',
  },

  imgList: [], // 上传七牛的图片url存放数组
  onLoad(options) {
    console.log(options.id);
    if (options.id !== null) {
      this.setData({
        clubId: options.id
      })
    }
  },

  title_input(e) {
    var title = e.detail.value
    console.log(title)
    this.setData({
      title: title
    })
  },

  content_input(e) {
    var content = e.detail.value
    console.log(content)
    this.setData({
      content: content
    })
  },

  //选择图片
  uploadToQn: function () {
    // 选择图片
    wx.chooseImage({
      count: 6,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        // tempFilePath可以作为img标签的src属性显示图片
        this.tempFilePaths = res.tempFilePaths;
        this.imgList = [];
        // 上传第1张图片到七牛云空间
        this.uploadImgQn(0);
      }
    })
  },

  uploadImgQn: function (i) {
    var key = new Date().getTime() + '.jpg';
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
        qnUploader.upload(this.tempFilePaths[i], (res) => {
            // 将七牛图片url暂存
            this.imgList.push(res.imageURL);
            // 如果图片没有全部上传，则继续递归调用自身，上传下一张图片
            if (i < this.tempFilePaths.length - 1) {
              i += 1;
              this.uploadImgQn(i);
            } else {
              this.setData({
                imgList: this.imgList
              })
              wx.hideLoading();
              wx.showToast({
                title: '上传结束',
              })
            }
          }, (err) => {}, options,
          (progress) => { // 上传进度
            console.log(progress);
            wx.showLoading({
              title: '上传中',
            })
          },
          null, null, (complete) => {});
      }
    })
  },

  bindDateChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      startDate: e.detail.value
    })
  },
  bindDateChange2: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      endDate: e.detail.value
    })
  },

  fabu: function () {
    console.log(this.data);
    wx.request({
      url: 'http://127.0.0.1:3008/Mange/activity/addActivity/',
      method: 'POST',
      data: {
        title: this.data.title,
        inClub: this.data.clubId,
        startTime: this.data.startDate,
        endTime: this.data.endDate,
        RTE: this.data.content,
      },
      header: {
        "Content-Type": "application/x-www-form-urlencoded", //POST方式
        'token': 'Bearer ' + app.globalData.token
      },
      success:(res)=>{
        console.log(res.data);
      }
    })
  }
})