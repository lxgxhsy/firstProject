// pages/search/searchResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value:"    篮球",
    onClick(event) {
      wx.showToast({
        title: `点击标签 ${event.detail.name}`,
        icon: 'none',
      });
    },
    act_has: false,
    club_has: false,
    activityList: [
    //   {
    //   id: 1,
    //   clubid: 1,
    //   name: "篮球大赛",
    //   images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%AF%AE%E7%90%83.jpg",
    //   time: "2011/2/23~3/10",
    //   ClubName: "篮球社"
    // },{
    //   id: 2,
    //   clubid: 1,
    //   name: "足球大赛",
    //   images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%B6%B3%E7%90%83.jpg",
    //   time: "2011/2/23~3/10",
    //   ClubName: "足球社"
    // },
  ],
  ClubList:[
    // {
    //   id: 1,
    //   images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/%E7%AF%AE%E7%90%83.jpg",
    //   number: "43",
    //   ClubName: "    篮球社"
    // },{
    //   id: 2,
    //   images: "http://ru857uat2.hn-bkt.clouddn.com/images/club/%E8%B6%B3%E7%90%83.jpg",
    //   number: "34",
    //   ClubName: "  羽毛球社"
    // },
  ]
  },

  onLoad(option){
    // console.log(option.details);
    if (option != null) {
      this.setData({
        value: option.details
      })
    }
    this.search();
  },

  search:function(){
    wx.request({
      url: 'http://127.0.0.1:3008/search/club/',
      method:"POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data:{"content":this.data.value},
      success:(res)=>{
        console.log(res.data);
        var len = res.data.length;
        // var temClub = [];
        if(!res.data[0].error_message){
          this.setData({
            club_has: true
          })
          for(var i = 0; i < len; i ++){
            var temClub = [
              {id:res.data[i].id,
                images:res.data[i].imgurl,
                ClubName:res.data[i].name,
                number:res.data[i].num,
                slogan:res.data[i].slogan
              }
            ]
            this.data.ClubList = temClub.concat(this.data.ClubList);
          }
        }
        this.setData({
          'ClubList' : this.data.ClubList,
        })
      }
    })

    wx.request({
      url: 'http://127.0.0.1:3008/search/activity/',
      method:"POST",
      header: { "Content-Type": "application/x-www-form-urlencoded" },
      data:{"content":this.data.value},
      success:(res)=>{
        console.log(res.data);
        var len = res.data.length;
        var temAct = [];
        if(!res.data[0].error_message){
          this.setData({
            act_has: true
          })
          for(var i = 0; i < len; i ++){
            var temAct = [
              {
                id:res.data[i].id,
                clubid:res.data[i].clubid,
                name:res.data[i].title,
                images:res.data[i].imgurl,
                ClubName:res.data[i].name,
                time:''+parseInt(res.data[i].slogan.slice(0,4))+'/'+parseInt(res.data[i].slogan.slice(5,7))+''+parseInt(res.data[i].slogan.slice(8,10))
              }
            ]
            this.data.activityList = temAct.concat(this.data.activityList);
          }
        }
        this.setData({
          'activityList' : this.data.activityList,
        })
      }
    })
  },

  toClubIndex: function (e) {
    var cid = e.currentTarget.dataset.id;
    // console.log(cid);
    wx.navigateTo({
      url: '/pages/clubindex/clubindex?id=' + cid,
    })
  },

  toActivityIndex: function (e) {
    var id = e.currentTarget.dataset.id;
    var cid = e.currentTarget.dataset.clubid;
    // console.log(id+'：'+cid);
    wx.navigateTo({
      url: '/pages/activity-detail/activityIndex?cid=' + cid + '&id=' + id,
    })
  },

  onChange:function(e){
    // console.log(e.detail);
    this.setData({
      value: e.detail
    })
  },
//TODO
  onSearch:function(){
    // console.log(this.data.searchdata);
    if(this.data.value!=''){
      this.search();
    }
  },

  clear:function(){
    this.setData({
      value:'',
    })
  }
})