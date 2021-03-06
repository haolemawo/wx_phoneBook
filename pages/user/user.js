const app = getApp();
const filter = require('../../utils/filter');
Page(filter.loginCheck({

	/**
	 * 页面的初始数据
	 */
	data: {
		userID: '',
		user: {}
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
    if (getApp().globalData.updateData){
      this.setData({
        user: getApp().globalData.updateData
      })
    }
		this.setData({
			userID: wx.getStorageSync('USERID')
		});
		let that = this;
		wx.request({
			url: `${app.globalData.apiUrl}/getContactByID/${that.data.userID}`,
			data: {},
			method: 'GET', 
			success: function (res) {
				// success
				if (res.data.success) {
					that.setData({
						user: res.data.data
					})
				}
			},
			fail: function () {
				// fail
			},
			complete: function () {
				// complete
			}
		})
	},

	callPhone: function (e) {
		wx.makePhoneCall({
			phoneNumber: e.currentTarget.dataset.phone
		})
	},

  onShow: function (e) {
    this.onLoad();
  },
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {
		return {
			title: `${this.data.user.name}的名片`
		}
	}
}))