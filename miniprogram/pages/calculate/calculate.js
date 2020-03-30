// pages/calculate/calculate.js
Page({
  data: {
    colorPrimary: '#394ca3',
    course: [{
      name: "",
      grade: "",
      credit: ""
    }],
    count: 1,
    username: "",
    gradeTip: "请填入0-100的数字",
    creditTip: "请填入合理学分",
    avgGPA: null,
    showModal: false,
    digit:[1, 2, 3, 4, 5],
    digitIndex: 1
  },
  //加载本页面时获取本地缓存填在input内
  onLoad: function(options) {
    if (wx.getStorageInfoSync().keys != []) {
      var username = wx.getStorageSync('username')
      var count = wx.getStorageSync('count')
      var course = wx.getStorageSync('course')
      if (count > 0) {
        this.setData({
          count: count,
          username: username,
          course: course
        })
      }
    }
  },
  //表单提交
  formSubmit: function(e) {
    let count = this.data.count;
    let course = this.data.course;
    //点击clear图标
    if (e.detail.target.dataset.type == 3) {
      var id = parseInt(e.detail.target.id)
      //在course中删除下标为id的元素
      course.splice(id, 1)
      this.setData({
        count: count - 1,
        course: course
      })
    } else if (e.detail.target.dataset.type == 2) {
      // 检查成绩、学分
      var sumGPA = 0;
      var sumCredit = 0;
      var flag = true;
      course.forEach(function(value, index, array) {
        var grade = parseFloat(value.grade)
        var credit = parseFloat(value.credit)
        if (grade >= 60)
          sumGPA = sumGPA + (grade / 10 - 5) * credit
        sumCredit = sumCredit + credit
        if (value.grade == "" || grade < 0 || grade > 100 || value.credit == "" || credit < 0 || credit > 10) {
          flag = false;
          wx.showToast({
            title: '成绩和学分项填写不规范哦~',
            icon: 'none'
          })
          return;
        }
      })
      if (flag == true) {
        var digit = parseInt(this.data.digitIndex) + 1
        var avgGPA = (sumGPA / sumCredit).toFixed(digit)
        this.setData({
          avgGPA: avgGPA,
          showModal: true
        })
      }

    } else if (e.detail.target.dataset.type == 1) {
      // 检查姓名、课程名、成绩、学分
      var sumGPA = 0;
      var sumCredit = 0;
      var flag = true;
      var username = this.data.username
      course.forEach(function(value, index, array) {
        var grade = parseFloat(value.grade)
        var credit = parseFloat(value.credit)
        if (grade >= 60)
          sumGPA = sumGPA + (grade / 10 - 5) * credit
        sumCredit = sumCredit + credit
        if (username == "" || value.name == "" || value.grade == "" || grade < 0 || grade > 100 || value.credit == "" || credit < 0 || credit > 10) {
          flag = false;
          wx.showToast({
            title: '请把全部信息填写完全哦~',
            icon: 'none'
          })
          return;
        }
      })
      if (flag == true) {
        var digit = parseInt(this.data.digitIndex) + 1
        var avgGPA = (sumGPA / sumCredit).toFixed(digit)
        this.setData({
          avgGPA: avgGPA,
        })
        wx.setStorageSync('username', this.data.username)
        wx.setStorageSync('count', this.data.count)
        wx.setStorageSync('course', this.data.course)
        wx.setStorageSync('avgGPA', this.data.avgGPA)
        //跳转到成绩单页面
        wx.navigateTo({
          url: '../report/report?username=' + this.data.username +
            '&count=' + this.data.count +
            '&course=' + JSON.stringify(this.data.course) +
            '&avgGPA=' + this.data.avgGPA
        })
      }
    }
  },
  //表单清空
  formReset: function(e) {
    wx.showModal({
      title: "确认要清空数据吗？",
      content: "清空后数据无法恢复，请谨慎操作！",
      confirmColor: '#394ca3',
      success: (res) => {
        if (res.confirm) {
          this.setData({
            course: [{
              name: "",
              grade: "",
              credit: ""
            }],
            count: 1,
            username: "",
            avgGPA: null
          })
        }
      }
    })
  },
  //点击add图标
  addCourse: function(e) {
    var count = this.data.count
    var course = this.data.course
    var obj = {
      name: "",
      grade: "",
      credit: ""
    }
    course.push(obj)
    this.setData({
      count: count + 1,
      course: course
    })
  },
  //离开界面时本地缓存
  onUnload: function(e) {
    wx.setStorageSync('username', this.data.username)
    wx.setStorageSync('count', this.data.count)
    wx.setStorageSync('course', this.data.course)
    wx.setStorageSync('avgGPA', this.data.avgGPA)
  },
  //输入时触发，功能为更新data
  update: function(e) {
    var id = e.target.id
    this.setData({
      [id]: e.detail.value
    })

  },
  onblur: function(e) {
    this.check(e)
  },
  //输入提示函数
  check: function(e) {
    var id = e.target.id
    if (id != 'username') {
      //正则取[后的一个字符
      var index = id.match(/\[(.?)/)[1]
      //正则取.后的内容
      var code = id.match(/\.(.*)/)[1]
      //成绩判断
      if (code == "grade") {
        //flag用来判断tips的显示
        var flag = "gradeTipFlag[" + index + "]"
        var value = e.detail.value
        var grade = parseFloat(value)
        if (value == "" || grade > 100 || grade < 0) {
          this.setData({
            [flag]: true
          })
        } else {
          this.setData({
            [flag]: null
          })
        }
      }
      if (code == "credit") {
        //flag用来判断tips的显示
        var flag = "creditTipFlag[" + index + "]"
        var value = e.detail.value
        var credit = parseFloat(value)
        if (value == "" || credit > 10 || credit < 0) {
          this.setData({
            [flag]: true
          })
        } else {
          this.setData({
            [flag]: null
          })
        }
      }
    }
  },
  //遮罩层禁止屏幕滚动
  preventTouchMove: function() {},
  //关闭弹窗
  ok: function() {
    this.setData({
      showModal: false
    })
  },
  //选择保留位数
  bindPickerChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      digitIndex: e.detail.value
    })
  }
})