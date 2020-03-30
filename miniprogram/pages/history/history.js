// pages/history/history.js
Page({
  data: {
    reportHistorys: [],
    showIndex:-1
  },

  onShow: function (options) {
    //取得本地存储历史记录
    this.openHistorys()
  },

  //取得本地存储历史记录函数
  openHistorys: function () {
    this.setData({
      reportHistorys: wx.getStorageSync('reportHistorys') || [],//若无储存则为空
    })
  },
  panel:function(e){
    var index = e.currentTarget.dataset.index
    if(index!=this.data.showIndex){
      this.setData({
        showIndex:index
      })
    }else{
      this.setData({
        showIndex: -1
      })
    }
  },
  //删除
  del:function(e){
    var index = e.currentTarget.dataset.index
    wx.showModal({
      title: "确认要删除本条记录吗？",
      content: "删除后记录无法恢复，请谨慎操作！",
      confirmColor: '#394ca3',
      success: (res) => {
        if (res.confirm){
          var reportHistorys = this.data.reportHistorys
          reportHistorys.splice(index, 1)
          this.setData({
            reportHistorys: reportHistorys,
            showIndex: -1
          })
          wx.setStorageSync('reportHistorys', reportHistorys)
          wx.showToast({
            title: '记录删除成功',
            icon: 'success'
          })
        }
      }
    })
  },
  //查看
  lookUp:function(e){
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../report/report?username=' + this.data.reportHistorys[index].username +
        '&count=' + this.data.reportHistorys[index].count +
        '&course=' + JSON.stringify(this.data.reportHistorys[index].course) +
        '&avgGPA=' + this.data.reportHistorys[index].avgGPA
    })
  },
  //导入计算
  calculate:function(e){
    var index = e.currentTarget.dataset.index
    var reportHistory = this.data.reportHistorys[index]
    wx.setStorageSync('username', reportHistory.username)
    wx.setStorageSync('count', reportHistory.count)
    wx.setStorageSync('course', reportHistory.course)
    wx.setStorageSync('avgGPA', reportHistory.avgGPA)
    wx.navigateTo({
      url: '../calculate/calculate',
    })
  }
})