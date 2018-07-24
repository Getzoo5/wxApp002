'use strict';
const app = getApp()
const network = require('../../util/network')
var backgroundAudioManager = wx.getBackgroundAudioManager()
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    pathUrl: '/v2/movie/celebrity/'
  },
  onLoad(options) {
    this.setData({ id: options.id })
    this.loadMore(this.data.pathUrl + options.id)
  },
  loadMore(pathUrl) {
    return network(pathUrl, 'GET')
      .then(res => {
        this.setData({ celebrity: res.data })
      })
  },
  detail: function(e){
    wx.navigateBack({
      delta: 2
    })
    wx.navigateTo({
      url: '../details/detail?id=' + e.currentTarget.dataset.id
    })
  }
});