// miniprogram/pages/index/index.js
import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isShow: false,
    groupName: "",
  },

  /**
   * 点击事件
   */
  showNewGroupModel() {
    this.setData({
      isShow:true
    })
  },


  /**
   * 关闭对话框
   */
  closeDialog(){
    this.clearDialog();
    console.log("关闭");
    this.setData({
      isShow:false
    })
  },

  /**
   * 清空数据框
   */
  clearDialog(){
    this.setData({
      groupName: ""
    })
  },
  /**
   * 提交对话框
   */
  submitDialog(){
    const self = this;
    if(this.data.groupName === ''){
      // 出现notify
      Notify({selector: '#van-notify', type: 'danger', message: '群组名不能为空',duration: 2000});
      self.selectComponent("#new-group-model").stopLoading();
      return;
    }
    else{    // 调用云函数
      wx.cloud.callFunction({
      name:"createGroup",
      data:{
        groupName:self.data.groupName
      },
      success(res){
        Notify({selector: '#van-notify', type: 'success', message: '创建成功',duration: 2000});
        self.closeDialog();
        const timer = setTimeout(()=>{
          wx.switchTab({
            url: '/pages/group/group'
          });
        },1000)
      },
      fail(error){
        console.log(error)
      }
    })
    }

    
  },
  /**
   *
   */
  onGroupNameChange(event) {
    this.setData({
      groupName: event.detail,
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {},

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {},

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {},

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {},

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {},

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {},
});
