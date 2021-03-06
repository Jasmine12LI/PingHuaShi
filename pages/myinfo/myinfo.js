const util = require('../../utils/util.js')
var app = getApp()

Page({
  data: {
    maxWords: 150,
    currentWords: 0,
    news_num: 0,
    hasLogout: false,
    ispage_num: 0,
    adtag: 0,
    advice_text: "",
    hasidenti: false,
    stu_id: null,
    stu_pwd: null,
    my_comment: [],
    my_praise: [],
    my_message: [],
    user: null,
    isCard: true,
    array: [],
    index: 0,
    course: [
      {
        title: "我的评价",
        jump: "jumpto1",
      },
      {
        title: "我的赞",
        jump: "jumpto2",
      },
      {
        title: "我的消息",
        jump: "jumpto3",
      },
      {
        title: "意见反馈",
        jump: "jumpto4",
      },
    ],

    advice: [
      {
        title: "小程序闪退",
        jump: "jumpto11",
        tag: 11,
      },
      {
        title: "卡顿",
        jump: "jumpto12",
        tag: 12,
      },
      {
        title: "黑屏",
        jump: "jumpto13",
        tag: 13,
      },
      {
        title: "界面错位",
        jump: "jumpto14",
        tag: 14,
      },
      {
        title: "加载过慢",
        jump: "jumpto15",
        tag: 15,
      },
      {
        title: "其他异常",
        jump: "jumpto16",
        tag: 16,
      },
      {
        title: "意见与建议",
        jump: "jumpto17",
        tag: 17,
      },
    ],
  },

  onPullDownRefresh: function () {
    if(this.data.ispage_num == 1)
      this.showMyComment();
    if (this.data.ispage_num == 2)
      this.showMyApproval();
    if (this.data.ispage_num == 3)
      this.showMyNews();
    else
      wx.stopPullDownRefresh();
  },

  onLoad:function(e){
    var that = this;
    this.getAllType()
    app.globalData.timerB = setInterval(function () {
      //console.log('timerB')
      that.setData({
        news_num: app.globalData.news_num
      })
    }, 1000) 
    
  },

  onShow: function (e) {
    if (app.globalData.isLogin == true) {
      console.log(app.globalData.user_detail)
      this.setData({
        hasLogout: false,
        user: app.globalData.user_detail
      })
      if (app.globalData.user_detail.role > 1)
        this.setData({
          hasidenti: true,
        })
    }
  },

  showMyComment:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: app.globalData.rootDomain + '/service/comment/my_comment',
      method: 'POST',
      data: {
        user_id: app.globalData.user_detail.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          my_comment: res.data.data
        })
        if(res.data.data.length == 0){
          wx.showToast({
            title: '无记录',
            icon: 'none',   
            duration: 2000,
            success(res) {
              setTimeout(function () {
                that.setData({
                  ispage_num: 0
                })
              }, 1000)
            }    
          })
        }
      },
      fail: res => {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        wx.showModal({
          title: 'ERROR',
          content: '响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },

  showMyApproval:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: app.globalData.rootDomain + '/service/comment/my_approval',
      method: 'POST',
      data: {
        user_id: app.globalData.user_detail.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          my_praise: res.data.data
        })
        if(res.data.data.length == 0){
          wx.showToast({
            title: '无记录',
            icon: 'none',   
            duration: 2000,
            success(res) {
              setTimeout(function () {
                that.setData({
                  ispage_num: 0
                })
              }, 1000)
            }    
          })
        }
      },
      fail: res => {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        wx.showModal({
          title: 'ERROR',
          content: '响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },

  showMyNews:function(e){
    wx.showLoading({
      title: '加载中',
    })
    var that = this
    wx.request({
      url: app.globalData.rootDomain + '/service/comment/my_news',
      method: 'POST',
      data: {
        user_id: app.globalData.user_detail.user_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        console.log(res.data)
        that.setData({
          my_message: res.data.data
        })
        if(res.data.data.length == 0){
          wx.showToast({
            title: '无记录',
            icon: 'none',   
            duration: 2000,
            success(res) {
              setTimeout(function () {
                that.setData({
                  ispage_num: 0
                })
              }, 1000)
            }    
          })
        }
      },
      fail: res => {
        wx.stopPullDownRefresh();
        wx.hideLoading()
        wx.showModal({
          title: 'ERROR',
          content: '响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },

  jumpto1: function (e) {
    this.setData({
      ispage_num: 1,
    })
    this.showMyComment();
  },

  jumpto2: function (e) {
    this.setData({
      ispage_num: 2,
    })
    this.showMyApproval();
  },

  jumpto3: function (e) {
    this.setData({
      ispage_num: 3,
    })
    wx.showLoading({
      title: '加载中',
    })
    this.showMyNews();
  },

  jumpto4: function (e) {
    this.setData({
      ispage_num: 4,
    })
  },

  jumpto11: function (e) {
    this.setData({
      ispage_num: 11,
    })
  },
  jumpto12: function (e) {
    this.setData({
      ispage_num: 12,
    })
  },
  jumpto13: function (e) {
    this.setData({
      ispage_num: 13,
    })
  },
  jumpto14: function (e) {
    this.setData({
      ispage_num: 14,
    })
  },
  jumpto15: function (e) {
    this.setData({
      ispage_num: 15,
    })
  },
  jumpto16: function (e) {
    this.setData({
      ispage_num: 16,
    })
  },
  jumpto17: function (e) {
    this.setData({
      ispage_num: 17,
    })
  },

  jumpreturn: function (e) {
    this.setData({
      ispage_num: 0,
    })
  },

  jumpreturn_last: function (e) {
    this.setData({
      ispage_num: 4,
    })
  },

  logout: function () {
    var that = this;
    wx.showModal({
      content: '确定退出？',
      success(res){
        if(res.confirm){
          app.globalData.hasLogout = true
          app.globalData.isLogin = false
          app.globalData.user_detail = null
          clearInterval(app.globalData.timerA)
          clearInterval(app.globalData.timerB)
          that.setData({
            ispage_num: 0,
            adtag: 0,
            advice_text: "未知",
            hasidenti: false,
            stu_id: null,
            stu_pwd: null,
            user: null,
            hasLogout: true,
          })
          wx.redirectTo({
            url: '../login/login',
          })
        }
      }
    })
  },

  get_advice: function (e) {
    var value = e.detail.value;
    // 获取输入框内容的长度
    var len = parseInt(value.length);
    //字数限制
    if (len > this.data.maxWords) {
      wx.showToast({
        title: '字数超出限制',
        icon: 'none'
      })
      return;
    }
    this.setData({
      currentWords: len,
      advice_text: value
    })
  },

  commiton: function (e) {
    var that = this;
    let typename = e.currentTarget.dataset.errtype;
    if(that.data.currentWords == 0){
      wx.showToast({
        title: '请输入内容',
        icon: 'none'
      })
      return;
    }
    console.log(typename)
    console.log(that.data.advice_text)
    wx.showModal({
      content: '确定提交？',
      success(res){
        if(res.confirm){
          wx.request({
            url:app.globalData.rootDomain + '/service/feedback/submitErr',
            method:'POST',
            data:{
              err_type: typename,
              err_content:that.data.advice_text
            },
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success:function(res){
              console.log(res)
              if(res.data.code == 0){
                
                wx.showToast({
                  title: '提交成功',
                  icon: 'success',
                  duration: 2000
                });
                that.setData({
                  ispage_num: 4,
                  currentWords: 0,
                  advice_text: ''
                })
          
              }
              else{
                wx.showToast({
                  title: '提交失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            },
            fail:function(err){
              console.log(err)
              wx.showToast({
                title: '添加失败',
                icon: 'none',   
                duration: 2000     
              })  
            }
            })
          
          
        }
      }
    })
    
  },

  identifi: function () {
    if (this.data.hasidenti)
      return
    this.setData({
      ispage_num: 5
    })
  },

  get_stu_id: function (e) {
    this.setData({
      stu_id: e.detail.value,
    })
  },

  get_stu_pwd: function (e) {
    this.setData({
      stu_pwd: e.detail.value,
    })
  },

  //提交身份鉴定信息
  auth_submit: function () {
    var that = this;
    if(!that.data.stu_id){
      wx.showToast({
        title: '请输入学工号',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (!that.data.stu_pwd) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    if (that.data.index == 0) {
      wx.showToast({
        title: '请选择专业',
        icon: 'none',
        duration: 2000
      })
      return;
    }
    wx.showLoading({
      title: '加载中',
    });
    wx.request({
      url: app.globalData.rootDomain + '/service/user/auth',
      method: 'POST',
      data: {
        id: app.globalData.user_detail.user_id,
        stu_id: that.data.stu_id,
        pwd: that.data.stu_pwd,
        stu_pro_index: that.data.index,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data)
        if (res.data.code == 0) {
          wx.showToast({
            title: '认证成功',
            icon: 'success',
            duration: 3000
          })
          app.globalData.user_detail.role = res.data.data.role
          that.setData({
            hasidenti: true
          })
          that.jumpreturn()
        }
        else {
          wx.hideLoading()
          wx.showModal({
            content: res.data.msg,
            showCancel: false,
          })
        }
      },
      fail: res => {
        wx.hideLoading()
        wx.showModal({
          title: 'ERROR',
          content: '响应失败', //响应失败输出信息
          showCancel: false,
        })
      }
    })
  },


  bindPickerChange: function (e) {
    var that = this;
    console.log('picker发送选择改变，携带值为', e.detail.value)
    that.setData({
      comment: [],
      index: e.detail.value,
    })
    //app.globalData.stu_pro_index = e.detail.value

  },
  getAllType: function () {
    let self = this
    wx.request({
      url: app.globalData.rootDomain + '/service/teacher/listProfession',
      method: 'POST',
      success: function (res) {
        console.log('zhuanye')
        let professions = res.data.data.professions
        let all={
          name:'请选择专业(教师选择:其他专业)',
          id:0
        }
        professions.splice(0,0,all)
        self.setData({
          array:professions,
          
        })
        console.log(self.data.array)
      },
      fail: function (err) {
        console.log(err)
      }
    })
  },

});