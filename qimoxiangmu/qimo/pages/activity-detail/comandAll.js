// pages/activityIndex/comandAll.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commentList:[
      // {
      //   name:'',detail:'',imgURL:'',icon:'',dianzan:-1,look:-1,reply:-1,time:'',
      // }
    ],
    id:-1,
    clubId:-1,
  },

  onLoad(option) {
    // console.log(option.id + ':' + option.cid);
    this.setData({
      id: option.id,
      clubId: option.cid
    })

    this.getcom()
  },
  
  getcom:function(){
    wx.request({
      url: 'http://127.0.0.1:3008/activity/index/getCommand/' + this.data.clubId + '/' + this.data.id + '/',
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded" //POST方式
      },
      success:(res)=>{
        
        var len = res.data.length;
        
        for(var i = 0; i < len; i ++){
          var tem = [
            {name:res.data[i].name,
            detail:res.data[i].Detail,
            imgURL:res.data[i].background,
            icon:res.data[i].imgurl,
            dianzan:res.data[i].dianzanNum,
            look:res.data[i].looksum,
            reply:res.data[i].replysum,
            time:parseInt(res.data[i].time.slice(0,4)) + '年' + parseInt(res.data[i].time.slice(5,7)) + '月' + parseInt(res.data[i].time.slice(8,10)) + '日'
          }];
          
          this.data.commentList = tem.concat(this.data.commentList);
          // console.log(this.data.commentList);
        }
        this.setData({
          'commentList' : this.data.commentList,
        })
        // console.log(this.data.commentList[1].name);
      }
    })
  },

  //跳转到评论详情
  gotoComand() {
    wx.navigateTo({
      url:'/pages/activity-detail/comand'
    })
  },
})