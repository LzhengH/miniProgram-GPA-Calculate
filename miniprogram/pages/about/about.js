// pages/introduce/introduce.js
Page({
  data: {
    mainText1: '本小程序是由大连大学一名在校本科生独立开发的第一个小程序，如有问题请见谅，也欢迎大家提出修改意见（加好友请备注信息）。 \n 　联系方式：',
    wx: '微信号:LZHbest518',
    qq:'QQ号:864345220',

    update1:'1、新增功能：计算绩点时可以自由选择保留1-5位小数，避免了同学分不能比较绩点的问题。\n　　2、新增功能：可以在成绩单页面选择保存成绩单，保存后的成绩单可以在主页的"查看已保存成绩单"中看到，可以查看和删除已保存的成绩单，也可以将成绩列表快速导入计算页面。'
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