// pages/report/report.js
Page({
  data: {
    
  },

  onLoad: function(options) {
    // 接收转译参数(注意类型!)
    var course = JSON.parse(options.course)
    var count = parseInt(options.count)
    this.setData({
      count: count,
      username: options.username,
      course: course,
      avgGPA: options.avgGPA
    })
  },
  onShareAppMessage: function(options) {
    return {
      title: "Hello,这是我的成绩单",
      path: '/pages/report/report?username=' + this.data.username +
        '&count=' + this.data.count +
        '&course=' + JSON.stringify(this.data.course) +
        '&avgGPA=' + this.data.avgGPA,
      success: function(res) {
        console.log("转发成功！");
      }
    }
  },
  bindIndex:function(e){
    var page = getCurrentPages().length
    if(page>1){
      wx.navigateBack({
        delta:2
      })
    }else{
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  }
})