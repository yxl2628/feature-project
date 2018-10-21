//index.js
Page({
  data: {
    menu: ['测试'],
    result: ''
  },
  getTestInfo() {
    var that = this
    wx.request({
      url: 'https://www.chabao123.com/gyinfo/info/praise-reading/',
      method: 'POST',
      data: [{ "categoryCode": "a", "infoCodes": ["g12", "n1", "b14", "c14", "d10", "b12", "c11", "g11", "c12", "b6", "b11", "c8", "b1", "d9", "c7", "b2", "g3", "b10", "g2", "i1", "d2", "f6", "c5", "j3", "j7", "e2", "c10", "l1", "i4", "k1", "d6", "f7", "h2", "h10", "k5", "l4"] }],
      success (res) {
        that.setData({ result: JSON.stringify(res) })
      } 
    })
  }
})
