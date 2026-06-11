// 日历页面
Page({
  data: {
    currentYear: 2026,
    currentMonth: 6,
    daysInMonth: [],
    selectedDate: '',
    selectedDateMatches: [],
    importantMatch: null,
    weekDays: ['日', '一', '二', '三', '四', '五', '六'],
    tournamentStart: '2026-06-11',
    tournamentEnd: '2026-07-19'
  },

  onLoad() {
    this.initCalendar()
    this.loadMatchData()
  },

  // 初始化日历
  initCalendar() {
    const now = new Date()
    const year = now.getFullYear() >= 2026 ? 2026 : now.getFullYear()
    const month = year === 2026 ? 6 : now.getMonth() + 1

    this.setData({
      currentYear: year,
      currentMonth: month
    })

    this.generateCalendar(year, month)
  },

  // 生成日历数据
  generateCalendar(year, month) {
    const firstDay = new Date(year, month - 1, 1)
    const lastDay = new Date(year, month, 0)
    const daysInMonth = lastDay.getDate()
    const startDayOfWeek = firstDay.getDay()

    const days = []

    // 上月填充
    for (let i = 0; i < startDayOfWeek; i++) {
      days.push({ type: 'empty' })
    }

    // 当月日期
    for (let i = 1; i <= daysInMonth; i++) {
      const date = `${year}-${String(month).padStart(2, '0')}-${String(i).padStart(2, '0')}`
      const matches = this.getMatchesForDate(date)

      days.push({
        type: 'day',
        day: i,
        date: date,
        matches: matches,
        matchCount: matches.length,
        hasImportant: matches.some(m => m.isImportant),
        isToday: this.isToday(date),
        isInTournament: this.isInTournament(date)
      })
    }

    this.setData({ daysInMonth: days })
  },

  // 获取某天的比赛
  getMatchesForDate(date) {
    // 模拟数据 - 实际应从服务器获取
    const matchData = {
      '2026-06-11': [
        { id: 1, time: '20:00', homeTeam: '美国', awayTeam: '墨西哥', homeFlag: '/images/flags/usa.png', awayFlag: '/images/flags/mex.png', isImportant: true, group: 'A组' }
      ],
      '2026-06-12': [
        { id: 2, time: '16:00', homeTeam: '阿根廷', awayTeam: '加拿大', homeFlag: '/images/flags/arg.png', awayFlag: '/images/flags/can.png', isImportant: true, group: 'B组' },
        { id: 3, time: '20:00', homeTeam: '法国', awayTeam: '澳大利亚', homeFlag: '/images/flags/fra.png', awayFlag: '/images/flags/aus.png', isImportant: true, group: 'C组' }
      ],
      '2026-06-13': [
        { id: 4, time: '14:00', homeTeam: '西班牙', awayTeam: '日本', homeFlag: '/images/flags/esp.png', awayFlag: '/images/flags/jpn.png', isImportant: true, group: 'D组' },
        { id: 5, time: '17:00', homeTeam: '德国', awayTeam: '韩国', homeFlag: '/images/flags/ger.png', awayFlag: '/images/flags/kor.png', isImportant: true, group: 'E组' },
        { id: 6, time: '20:00', homeTeam: '巴西', awayTeam: '喀麦隆', homeFlag: '/images/flags/bra.png', awayFlag: '/images/flags/cmr.png', isImportant: true, group: 'F组' }
      ]
    }
    return matchData[date] || []
  },

  // 检查是否是今天
  isToday(date) {
    const today = new Date().toISOString().split('T')[0]
    return date === today
  },

  // 检查是否在赛事期间
  isInTournament(date) {
    return date >= this.data.tournamentStart && date <= this.data.tournamentEnd
  },

  // 加载比赛数据
  loadMatchData() {
    // 设置默认选中今天或赛事开始日
    const today = new Date().toISOString().split('T')[0]
    const defaultDate = today >= this.data.tournamentStart ? today : this.data.tournamentStart
    this.selectDate({ currentTarget: { dataset: { date: defaultDate } } })
  },

  // 选择日期
  selectDate(e) {
    const date = e.currentTarget.dataset.date
    if (!date) return

    const matches = this.getMatchesForDate(date)
    const importantMatch = matches.find(m => m.isImportant) || matches[0]

    this.setData({
      selectedDate: date,
      selectedDateMatches: matches,
      importantMatch: importantMatch
    })
  },

  // 切换月份
  changeMonth(e) {
    const direction = e.currentTarget.dataset.direction
    let { currentYear, currentMonth } = this.data

    if (direction === 'prev') {
      if (currentMonth === 1) {
        currentYear--
        currentMonth = 12
      } else {
        currentMonth--
      }
    } else {
      if (currentMonth === 12) {
        currentYear++
        currentMonth = 1
      } else {
        currentMonth++
      }
    }

    this.setData({ currentYear, currentMonth })
    this.generateCalendar(currentYear, currentMonth)
  },

  // 跳转到比赛详情
  goToMatchDetail(e) {
    const matchId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${matchId}`
    })
  },

  // 查看日期所有比赛
  viewDayMatches() {
    if (!this.data.selectedDate) return
    wx.navigateTo({
      url: `/pages/day-matches/day-matches?date=${this.data.selectedDate}`
    })
  }
})
