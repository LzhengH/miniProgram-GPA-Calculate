// pages/report/report.js
Page({
  data: {
    showModal:false,
    reportName:"",
    reportHistorys:[]
  },

  onLoad: function(options) {
    //取得本地存储历史记录
    this.openHistorys()
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
  //保存成绩单
  preserve:function(e){
    this.setData({
      showModal:true
    })
  },
  //回到首页
  bindIndex:function(e){
    var page = getCurrentPages().length
    if(page>1){
      wx.navigateBack({
        delta:page
      })
    }else{
      wx.redirectTo({
        url: '/pages/index/index',
      })
    }
  },
  //取消保存
  cancel:function(e){
    this.setData({
      showModal: false
    })
  },
  //确认保存
  formSubmit:function(e){
    var reportName = this.data.reportName
    
      var reportHistorys = this.data.reportHistorys;//取得历史记录数组
      //创建新的历史记录
      var rh = {
        reportName: this.data.reportName,
        count : this.data.count,
        username : this.data.username,
        course : this.data.course,
        avgGPA : this.data.avgGPA
      }
      reportHistorys.push(rh)//将本次记录放入数组
      this.setData({
        reportHistorys: reportHistorys,
        showModal: false
      })
      wx.setStorageSync('reportHistorys', reportHistorys)
      wx.showToast({
        title: '成绩单已保存',
        icon: 'success'
      })
    
  },
  //保存成绩单输入框改变
  update: function (e) {
    this.setData({
      reportName: e.detail.value
    })
  },
  //取得本地存储历史记录函数
  openHistorys: function () {
    this.setData({
      reportHistorys: wx.getStorageSync('reportHistorys') || [],//若无储存则为空
    })
  }
})