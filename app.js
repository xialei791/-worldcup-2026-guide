App({
  onLaunch() {
    console.log('2026世界杯观赛指南小程序启动')

    // 检查更新
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate((res) => {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(() => {
            wx.showModal({
              title: '更新提示',
              content: '新版本已准备好，是否重启应用？',
              success: (res) => {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
        }
      })
    }
  },

  globalData: {
    userInfo: null,
    // 2026世界杯数据
    worldCupData: {
      startDate: '2026-06-11',
      endDate: '2026-07-19',
      hostCountries: ['美国', '加拿大', '墨西哥'],
      teams: 48,
      matches: 104
    }
  }
})
