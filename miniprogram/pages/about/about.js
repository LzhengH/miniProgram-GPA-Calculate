// pages/introduce/introduce.js
Page({
  data: {
    mainText1: '本小程序是由大连大学一名在校本科生独立开发的第一个小程序，如有问题请见谅，也欢迎大家提出修改意见（加好友请备注信息）。 \n 　联系方式：',
    wx: '微信号:LZHbest518',
    qq:'QQ号:864345220'
  },
  saveImg: function (e) {
    console.log(e.currentTarget)
    let that = this
    wx.getSetting({
      success(res) {
        //未授权 先授权 然后保存
        if (!res.authSetting['scope.writePhotosAlbum']) {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success(re) {
              that.saveToBlum();
            }
          })
        } else {
          //已授 直接调用保存到相册方法
          that.saveToBlum();
        }
      }
    })
  },
  //保存到相册方法
  saveToBlum: function (e) {
    console.log(e)
    let imgUrl = '非网络图片';
    wx.getImageInfo({
      src: imgUrl,
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
        })
      }
    })
  }
})