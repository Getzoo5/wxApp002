'use strict';
const app = getApp()
const network = require('../../util/network')
var backgroundAudioManager = wx.getBackgroundAudioManager()
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    pathUrl:  '/v2/movie/subject/'
  },
  onLoad(options) {
    this.setData({ id: options.id })
    this.loadMore(this.data.pathUrl + options.id)
  },
  loadMore(pathUrl) {
    return network(pathUrl, 'GET')
      .then(res => {
        this.setData({ detail: res.data})
      })
  },
  videos: function (e) {
    wx.navigateTo({
      url: '../videos/index?src=' + e.currentTarget.dataset.videos
    })
  },
  casts: function (e) {
    wx.navigateTo({
      url: '../celebrity/index?id=' + e.currentTarget.dataset.id
    })
  }
});