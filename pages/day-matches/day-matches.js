// 某天所有比赛页面
Page({
  data: {
    date: '',
    formattedDate: '',
    matches: [],
    importantMatch: null
  },

  onLoad(options) {
    const date = options.date || ''
    this.setData({ date })
    this.formatDate(date)
    this.loadMatches(date)
  },

  // 格式化日期
  formatDate(dateStr) {
    const date = new Date(dateStr)
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const week = weekDays[date.getDay()]
    this.setData({
      formattedDate: `${month}月${day}日 ${week}`
    })
  },

  // 加载比赛数据
  loadMatches(date) {
    // 模拟数据
    const allMatches = {
      '2026-06-12': [
        { id: 2, time: '16:00', homeTeam: '阿根廷', awayTeam: '加拿大', homeFlag: '/images/flags/arg.png', awayFlag: '/images/flags/can.png', homeScore: 3, awayScore: 1, status: 'finished', group: 'B组', isImportant: true, stadium: '洛杉矶索菲体育场', city: '洛杉矶' },
        { id: 3, time: '20:00', homeTeam: '法国', awayTeam: '澳大利亚', homeFlag: '/images/flags/fra.png', awayFlag: '/images/flags/aus.png', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', isImportant: true, stadium: '阿兹特克体育场', city: '墨西哥城' },
        { id: 7, time: '23:00', homeTeam: '英格兰', awayTeam: '突尼斯', homeFlag: '/images/flags/eng.png', awayFlag: '/images/flags/tun.png', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', isImportant: false, stadium: 'AT&T体育场', city: '达拉斯' }
      ],
      '2026-06-13': [
        { id: 4, time: '14:00', homeTeam: '西班牙', awayTeam: '日本', homeFlag: '/images/flags/esp.png', awayFlag: '/images/flags/jpn.png', homeScore: 2, awayScore: 0, status: 'live', minute: 67, group: 'D组', isImportant: true, stadium: '大都会人寿体育场', city: '纽约' },
        { id: 5, time: '17:00', homeTeam: '德国', awayTeam: '韩国', homeFlag: '/images/flags/ger.png', awayFlag: '/images/flags/kor.png', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', isImportant: true, stadium: '硬石体育场', city: '迈阿密' },
        { id: 6, time: '20:00', homeTeam: '巴西', awayTeam: '喀麦隆', homeFlag: '/images/flags/bra.png', awayFlag: '/images/flags/cmr.png', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', isImportant: true, stadium: '流明球场', city: '西雅图' },
        { id: 8, time: '23:00', homeTeam: '葡萄牙', awayTeam: '加纳', homeFlag: '/images/flags/por.png', awayFlag: '/images/flags/gha.png', homeScore: null, awayScore: null, status: 'upcoming', group: 'G组', isImportant: false, stadium: 'BC Place', city: '温哥华' }
      ]
    }

    const matches = allMatches[date] || []
    const importantMatch = matches.find(m => m.isImportant) || null

    this.setData({
      matches: matches,
      importantMatch: importantMatch
    })
  },

  // 跳转到比赛详情
  goToMatchDetail(e) {
    const matchId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${matchId}`
    })
  }
})
