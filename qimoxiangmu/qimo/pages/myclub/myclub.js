const app = getApp();
Page({
  data: {
    clubList: [{
      id: 1,
      clubName: '电子协会',
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E7%94%B5%E5%AD%90%E5%8D%8F%E4%BC%9A.jpg'
    }, {
      id: 2,
      clubName: '动漫社',
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/club/%E5%8A%A8%E6%BC%AB.jpg'
    }, {
      id: 3,
      clubName: '古今诗词学社',
      image: 'http://scdwjow71.hn-bkt.clouddn.com/images/202304281029881.jpg'
    }]
  },

  toClubIndex: function (e) {
    console.log(e.currentTarget.dataset.id);
    wx.navigateTo({
      url: '/pages/clubindex/clubindex?id=' + e.currentTarget.dataset.id,
    })
  },

  addNewClub: function () {
    wx.navigateTo({
      url: '/pages/addclub/addclub',
    })
  },
  onLoad() {
    if (app.globalData.isEnableLogin === true) {
      this.GetClub();
    }
  },
  //获取我的社团
  GetClub: function () {
    wx.request({
      url: 'http://127.0.0.1:3008/user/club/getList/',
      method: 'GET',
      header: {
        'token': 'Bearer ' + app.globalData.token
      },
      success: (res) => {
        console.log(res.data.clubs)
        this.setData({ // 清空数组
          clubList: null
        });
        for (let i = 0; i < res.data.clubs.length; i++) {
          var newarray = [{
            id: res.data.clubs[i].clubMessage.id,
            clubName: res.data.clubs[i].clubMessage.name,
            image: res.data.clubs[i].clubMessage.imgurl,
          }];
          //使用concat()来把两个数组合拼起来
          this.data.clubList = newarray.concat(this.data.clubList);
        }
        // 删去最开始的数组
        this.data.clubList.splice(this.data.clubList.length - 1, 1);
        this.setData({
          clubList: this.data.clubList
        });

      },
      fail: (res) => {
        console.log("knnknn");
      }
    })
  },

})