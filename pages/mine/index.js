'use strict';
const app = getApp()
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    '__code__': {
      readme: ''
    },
    itemList: [{
      id: 0,
      name: '想看',
      tips: 111
    }, {
      id: 1,
      name: '看过',
      tips: 124
    }, {
      id: 2,
      name: 'haha',
      tips: 14
    }],

    closeTabBar: false
  },
  onShow() {
    this.setData({
      closeTabBar: app.globalData.closeTabBar
    })
  },
  onLoad() {
    if (app.globalData.userInfo){
      this.setData({
        userInfo: app.globalData.userInfo
      })
    }
  },
  login(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo
    })
  },
  closeTabBar: function () {
    if (this.data.closeTabBar) {
      wx.showTabBar({
        animation: true
      })
      app.globalData.closeTabBar = !this.data.closeTabBar
    } else {
      wx.hideTabBar({
        animation: true
      })
      app.globalData.closeTabBar = !this.data.closeTabBar
    }
    this.setData({
      closeTabBar: !this.data.closeTabBar
    })
  }
});