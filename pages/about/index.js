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
    onShow() {
      this.setData({
        closeTabBar: app.globalData.closeTabBar
      })
    },
    tabs: [{ title: '正在热映', id: 0 }, { title: '即将上映', id: 1 }, { title: 'top250', id: 2 }, { title: '口碑榜', id: 3 }, { title: '北美票房榜', id: 4 }, { title: '新片榜', id: 5 }],
    itemList: [{ id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }, { id: 0 }]
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