// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     searchList:[
     {id:1,name:"篮球", },
     {id:2,name:"羽毛球"},
     {id:3,name:"足球"},
     {id:4,name:"乒乓球"}
    ],
    searchdata:'',
    value:'',
  },

  onChange:function(e){
    this.setData({
      searchdata: e.detail
    })
  },

  search:function(){
    // console.log(this.data.searchdata);
    if(this.data.searchdata!=''){
      wx.navigateTo({
        url: '/pages/search/searchResult?details=' + this.data.searchdata,
      })
    }
  },

  infill:function(e){
    // console.log(e.currentTarget.dataset.search);
    this.setData({
      searchdata: e.currentTarget.dataset.search,
      value: e.currentTarget.dataset.search,
    })
  }
})