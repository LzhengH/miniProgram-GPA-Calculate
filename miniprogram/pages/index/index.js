Page({
  data: {
    colorPrimary: '#394ca3',
  },
  onShareAppMessage: function (options) {
    return {
      title: "5分制绩点快速计算",
      path: "/pages/index/index"
    }
  },

  calculate:function(e) {
    wx.navigateTo({
      url: '../calculate/calculate',
    })
  },
  algorithm:function(e){
    wx.navigateTo({
      url: '../algorithm/algorithm',
    })
  },
  introduce:function(e) {
    wx.navigateTo({
      url: '../introduce/introduce',
    })
  },
  about:function(e){
    wx.navigateTo({
      url: '../about/about',
    })
  }
})
