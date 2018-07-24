'use strict';
  const app = getApp()
const network = require('../../util/network')
var backgroundAudioManager = wx.getBackgroundAudioManager()
Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Page({
    data: {
      pathUrl: '/v2/movie/subject/'
    },
    onLoad(options) {
      this.setData({ src: options.src })
    }
  });