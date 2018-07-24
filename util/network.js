const app = getApp()
module.exports = (url, data, method, header = {}) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiBase + url,
      data,
      header: { "Content-Type": "json"},
      method,
      dataType: 'json',
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}