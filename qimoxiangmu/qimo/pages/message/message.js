// pages/message/message.js
const app = getApp();
Page({
  data: {
    mess:[],

  },

  onLoad:function(){
    // console.log(this.data.mess.length);
    wx.request({
      url: 'http://127.0.0.1:3008/user/mymessage/',
      method:'GET',
      header: {
        'token': 'Bearer '+ app.globalData.token
      },
      success:(res)=>{
        var len = res.data.length;
        // console.log(len);
        
        for(var i = 0; i < len; i ++){
          var now = new Date();
          var year = parseInt(res.data[i].time.slice(0,4));
          var mouth = parseInt(res.data[i].time.slice(5,7));
          var day = parseInt(res.data[i].time.slice(8,10));
          var hh = parseInt(res.data[i].time.slice(11,13))+8;
          var mm = parseInt(res.data[i].time.slice(14,16));
          var ss = parseInt(res.data[i].time.slice(17,19));
          var then = new Date(year,mouth-1,day,hh,mm,ss);
          var nowtime = now.getTime();
          var thentime = then.getTime();
          var str;
          if((nowtime-thentime)/1000/60 < 5){
            str = '刚刚';
          }else if((nowtime-thentime)/1000/60 <= 24*60){
            str = Math.trunc((nowtime-thentime)/1000/60) +'小时以前'
          }else{
            str = Math.trunc(((nowtime-thentime)/1000/60/60)/24) + '天前'
          }
          var ma = [{
            headimg:res.data[i].imgurl,
            name:res.data[i].photo,
            message:res.data[i].detail,
            time:str,
          }];
          this.data.mess = this.data.mess.concat(ma);
        }
        this.setData({
          'mess' : this.data.mess,
        })
      }
    })
  }
})