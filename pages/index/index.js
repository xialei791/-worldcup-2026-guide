const app = getApp()

Page({
  data: {
    countdown: {
      days: '000',
      hours: '00',
      minutes: '00',
      seconds: '00'
    },
    currentGroup: 'A组',
    groups: ['A组', 'B组', 'C组', 'D组', 'E组', 'F组', 'G组', 'H组', 'I组', 'J组', 'K组', 'L组'],
    todayMatches: [],
    groupStandings: [],
    latestNews: [],
    // 动画相关
    animatedStandings: [],
    isAnimating: false,
    showMusicPlayer: false,
    musicPlaying: false,
    // 总积分榜数据
    overallStandings: [],
    activeStandingTab: 'groups' // groups, overall
  },

  onLoad() {
    this.startCountdown()
    this.loadTodayMatches()
    this.loadGroupStandings('A组')
    this.loadLatestNews()
    this.loadOverallStandings()
  },

  onShow() {
    this.loadTodayMatches()
  },

  // 倒计时
  startCountdown() {
    const targetDate = new Date('2026-06-11T00:00:00').getTime()

    const updateCountdown = () => {
      const now = new Date().getTime()
      const distance = targetDate - now

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24))
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((distance % (1000 * 60)) / 1000)

        this.setData({
          countdown: {
            days: days.toString().padStart(3, '0'),
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0')
          }
        })
      }
    }

    updateCountdown()
    setInterval(updateCountdown, 1000)
  },

  // 加载今日赛事
  loadTodayMatches() {
    const matches = [
      {
        id: 1,
        time: '20:00',
        group: 'A组',
        homeTeam: '美国',
        awayTeam: '墨西哥',
        homeFlag: '/images/flags/usa.png',
        awayFlag: '/images/flags/mex.png',
        homeScore: 2,
        awayScore: 1,
        status: 'finished',
        stadium: '洛杉矶索菲体育场'
      },
      {
        id: 2,
        time: '23:00',
        group: 'B组',
        homeTeam: '阿根廷',
        awayTeam: '加拿大',
        homeFlag: '/images/flags/arg.png',
        awayFlag: '/images/flags/can.png',
        homeScore: 3,
        awayScore: 0,
        status: 'live',
        minute: 67,
        stadium: 'AT&T体育场'
      }
    ]
    this.setData({ todayMatches: matches })
  },

  // 加载小组积分 - 带动画
  loadGroupStandings(group) {
    const standings = [
      { team: '阿根廷', flag: '/images/flags/arg.png', mp: 3, w: 3, d: 0, l: 0, pts: 9, gf: 8, ga: 1 },
      { team: '墨西哥', flag: '/images/flags/mex.png', mp: 3, w: 2, d: 0, l: 1, pts: 6, gf: 5, ga: 3 },
      { team: '波兰', flag: '/images/flags/pol.png', mp: 3, w: 1, d: 0, l: 2, pts: 3, gf: 2, ga: 4 },
      { team: '沙特', flag: '/images/flags/ksa.png', mp: 3, w: 0, d: 0, l: 3, pts: 0, gf: 1, ga: 8 }
    ]

    // 先设置空数据，触发进入动画
    this.setData({
      groupStandings: [],
      isAnimating: true,
      currentGroup: group
    })

    // 延迟逐个添加数据，产生动画效果
    let index = 0
    const addTeam = () => {
      if (index < standings.length) {
        const current = this.data.groupStandings
        current.push({
          ...standings[index],
          animationDelay: index * 100
        })
        this.setData({ groupStandings: current })
        index++
        setTimeout(addTeam, 150)
      } else {
        this.setData({ isAnimating: false })
      }
    }

    setTimeout(addTeam, 200)
  },

  // 加载总积分榜
  loadOverallStandings() {
    const overall = [
      { rank: 1, team: '阿根廷', flag: '/images/flags/arg.png', group: 'C', mp: 3, w: 3, d: 0, l: 0, pts: 9, gf: 8, ga: 1, gd: 7 },
      { rank: 2, team: '法国', flag: '/images/flags/fra.png', group: 'D', mp: 3, w: 2, d: 1, l: 0, pts: 7, gf: 6, ga: 2, gd: 4 },
      { rank: 3, team: '巴西', flag: '/images/flags/bra.png', group: 'G', mp: 3, w: 2, d: 1, l: 0, pts: 7, gf: 5, ga: 1, gd: 4 },
      { rank: 4, team: '英格兰', flag: '/images/flags/eng.png', group: 'B', mp: 3, w: 2, d: 1, l: 0, pts: 7, gf: 4, ga: 1, gd: 3 },
      { rank: 5, team: '西班牙', flag: '/images/flags/esp.png', group: 'E', mp: 3, w: 2, d: 0, l: 1, pts: 6, gf: 7, ga: 3, gd: 4 },
      { rank: 6, team: '葡萄牙', flag: '/images/flags/por.png', group: 'H', mp: 3, w: 2, d: 0, l: 1, pts: 6, gf: 5, ga: 3, gd: 2 },
      { rank: 7, team: '荷兰', flag: '/images/flags/ned.png', group: 'A', mp: 2, w: 2, d: 0, l: 0, pts: 6, gf: 4, ga: 1, gd: 3 },
      { rank: 8, team: '美国', flag: '/images/flags/usa.png', group: 'A', mp: 3, w: 2, d: 0, l: 1, pts: 6, gf: 3, ga: 2, gd: 1 }
    ]
    this.setData({ overallStandings: overall })
  },

  // 加载最新资讯
  loadLatestNews() {
    const news = [
      {
        id: 1,
        title: '2026世界杯扩军至48队，赛制全新改革详解',
        image: '/images/news/news1.jpg',
        category: '赛事',
        time: '2小时前'
      },
      {
        id: 2,
        title: '美加墨联合举办，16座球场巡礼',
        image: '/images/news/news2.jpg',
        category: '球场',
        time: '5小时前'
      },
      {
        id: 3,
        title: '卫冕冠军阿根廷备战情况：梅西最后一届世界杯',
        image: '/images/news/news3.jpg',
        category: '球队',
        time: '1天前'
      }
    ]
    this.setData({ latestNews: news })
  },

  // 切换积分榜标签
  switchStandingTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeStandingTab: tab })
  },

  // 切换小组
  switchGroup(e) {
    const group = e.currentTarget.dataset.group
    if (group !== this.data.currentGroup) {
      this.loadGroupStandings(group)
    }
  },

  // 页面跳转
  goToSchedule() {
    wx.switchTab({ url: '/pages/schedule/schedule' })
  },

  goToTeams() {
    wx.switchTab({ url: '/pages/teams/teams' })
  },

  goToStadiums() {
    wx.navigateTo({ url: '/pages/stadiums/stadiums' })
  },

  goToNews() {
    wx.switchTab({ url: '/pages/news/news' })
  },

  goToMatchDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/match-detail/match-detail?id=${id}` })
  },

  goToNewsDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}&type=news` })
  },

  // 跳转到日历页
  goToCalendar() {
    wx.navigateTo({ url: '/pages/calendar/calendar' })
  },

  // 下拉刷新
  onPullDownRefresh() {
    this.loadTodayMatches()
    this.loadLatestNews()
    wx.stopPullDownRefresh()
  },

  // 分享
  onShareAppMessage() {
    return {
      title: '2026世界杯观赛指南',
      path: '/pages/index/index',
      imageUrl: '/images/share.jpg'
    }
  }
})
