'use strict'; 
const app = getApp()
const network = require('../../util/network')
var backgroundAudioManager = wx.getBackgroundAudioManager()
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    imgUrls: ['https://img.zcool.cn/community/0152a6554420920000019ae9be3967.jpg@1280w_1l_2o_100sh.webp', 'http://img.zcool.cn/community/01341556dcf0ed32f875520f21d7fd.jpg', 'http://img.zcool.cn/community/01ba6c5912dee2b5b3086ed4a69f1f.jpg@900w_1l_2o_100sh.jpg'],
    tabs: [{ title: '正在上映', id: 0 }, { title: '即将上映', id: 1 }, { title: '北美票房榜', id: 2 }, { title: '口碑榜', id: 3 }, { title: '新片榜', id: 4 }, { title: 'TOP250', id: 5 }],
    pathUrl: '',
    closeTabBar: false,
    pageSize: 20,
    pageIndex: 0,
    itemList: [], 
    text: '7月9日，魔道祖师在腾讯视频正式上线啦~ 月后魔道祖师之陈情令大电影也将上映~ ',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    marqueeDistance2: 0,
    marquee2copy_status: false,
    marquee2_margin: 60,
    size: 12,
    orientation: 'left',//滚动方向
    interval: 10 // 时间间隔
  },
  onShow() {
    this.setData({
      closeTabBar: app.globalData.closeTabBar
    })
  },
  onLoad(options) {
    this.setData({ isDefault: 0 })
    // 页面显示
    var vm = this;
    var length = vm.data.text.length * vm.data.size;//文字长度
    var windowWidth = wx.getSystemInfoSync().windowWidth;// 屏幕宽度
    vm.setData({
      length: length,
      windowWidth: windowWidth,
      marquee2_margin: length < windowWidth ? windowWidth - length : vm.data.marquee2_margin,//当文字长度小于屏幕长度时，需要增加补白
      isPrompt: true
    });
    // vm.run1();// 水平一行字滚动完了再按照原来的方向滚动
    vm.run2();// 第一个字消失后立即从右边出现
  },
  loadMore(pathUrl) {
    let { pageIndex, pageSize } = this.data
    const params = { start: ++pageIndex, count: pageSize }
    return network(pathUrl, params, 'GET')
      .then(res => {
        const items = this.data.itemList
        var itemList = items.concat(res.data.subjects)
        if (res.data.total){
          const totalPage = res.data.total
          const hasMore = this.data.pageIndex < totalPage
          this.setData({ totalPage, pageIndex, hasMore })
        } else {
          this.setData({ hasMore: false })
        }
        this.setData({ itemList })
      })
  },
  detail: function(e){
    wx.navigateTo({
      url: '/pages/details/detail?id=' + e.currentTarget.dataset.id
    })
  },
  onClick: function(e){
    var pathUrl;
    if (e.detail.key == 0){
      pathUrl = '/v2/movie/in_theaters'
    } else if (e.detail.key == 1){
      pathUrl = '/v2/movie/coming_soon'
    } else if (e.detail.key == 2) {
      pathUrl = '/v2/movie/us_box'
    } else if (e.detail.key == 3) {
      pathUrl = '/v2/movie/weekly'
    } else if (e.detail.key == 4) {
      pathUrl = '/v2/movie/new_movies'
    } else if (e.detail.key == 5) {
      pathUrl = '/v2/movie/top250'
    }
    this.loadMore(pathUrl)
    this.setData({ pathUrl: pathUrl, itemList: [], pageIndex: 0 })
  },
  closeTabBar: function(){
    if (this.data.closeTabBar){
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
  },
  onReachBottom(){
    if (this.data.hasMore){
      this.loadMore(this.data.pathUrl)
    }
  },
  run1: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance < vm.data.length) {
        vm.setData({
          marqueeDistance: vm.data.marqueeDistance - vm.data.marqueePace,
        });
      } else {
        clearInterval(interval);
        vm.setData({
          marqueeDistance: vm.data.windowWidth
        });
        vm.run1();
      }
    }, vm.data.interval);
  },
  run2: function () {
    var vm = this;
    var interval = setInterval(function () {
      if (-vm.data.marqueeDistance2 < vm.data.length) {
        // 如果文字滚动到出现marquee2_margin=30px的白边，就接着显示
        vm.setData({
          marqueeDistance2: vm.data.marqueeDistance2 - vm.data.marqueePace,
          marquee2copy_status: vm.data.length + vm.data.marqueeDistance2 <= vm.data.windowWidth + vm.data.marquee2_margin,
        });
      } else {
        if (-vm.data.marqueeDistance2 >= vm.data.marquee2_margin) { // 当第二条文字滚动到最左边时
          vm.setData({
            marqueeDistance2: vm.data.marquee2_margin // 直接重新滚动
          });
          clearInterval(interval);
          vm.run2();
        } else {
          clearInterval(interval);
          vm.setData({
            marqueeDistance2: -vm.data.windowWidth
          });
          vm.run2();
        }
      }
    }, vm.data.interval);
  },
  Prompt: function(){
    this.setData({ isPrompt: false })
  },
  onPullDownRefresh: function () {
    this.loadMore(this.data.pathUrl)
    wx.stopPullDownRefresh()
    this.setData({ itemList: [] })
  }
});