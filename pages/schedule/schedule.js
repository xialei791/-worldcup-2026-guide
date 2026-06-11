Page({
  data: {
    currentStage: 'group',
    currentDate: '2026-06-11',
    stages: [
      { key: 'group', name: '小组赛' },
      { key: 'round16', name: '1/8决赛' },
      { key: 'quarter', name: '1/4决赛' },
      { key: 'semi', name: '半决赛' },
      { key: 'third', name: '季军赛' },
      { key: 'final', name: '决赛' }
    ],
    dates: [],
    matches: []
  },

  onLoad() {
    this.generateDates()
    this.loadMatches()
  },

  // 生成日期列表
  generateDates() {
    const dates = []
    const startDate = new Date('2026-06-11')
    const endDate = new Date('2026-07-19')

    for (let d = new Date(startDate); d <= endDate; d.setDate(d.getDate() + 1)) {
      const month = d.getMonth() + 1
      const day = d.getDate()
      const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

      dates.push({
        date: d.toISOString().split('T')[0],
        day: `${month}/${day}`,
        week: weekDays[d.getDay()]
      })
    }

    this.setData({ dates })
  },

  // 加载比赛数据
  loadMatches() {
    // 模拟数据
    const matches = [
      {
        id: 1,
        time: '20:00',
        group: 'A组',
        homeTeam: '德国',
        awayTeam: '苏格兰',
        homeFlag: '/images/flags/germany.png',
        awayFlag: '/images/flags/scotland.png',
        homeScore: 0,
        awayScore: 0,
        status: 'upcoming',
        stadium: '慕尼黑安联球场',
        city: '慕尼黑'
      },
      {
        id: 2,
        time: '23:00',
        group: 'A组',
        homeTeam: '匈牙利',
        awayTeam: '瑞士',
        homeFlag: '/images/flags/hungary.png',
        awayFlag: '/images/flags/switzerland.png',
        homeScore: 0,
        awayScore: 0,
        status: 'upcoming',
        stadium: '科隆莱茵能源球场',
        city: '科隆'
      }
    ]
    this.setData({ matches })
  },

  // 切换阶段
  switchStage(e) {
    const stage = e.currentTarget.dataset.key
    this.setData({ currentStage: stage })
    this.loadMatches()
  },

  // 切换日期
  switchDate(e) {
    const date = e.currentTarget.dataset.date
    this.setData({ currentDate: date })
    this.loadMatches()
  },

  // 跳转到详情
  goToDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}&type=match` })
  },

  onPullDownRefresh() {
    this.loadMatches()
    wx.stopPullDownRefresh()
  }
})
