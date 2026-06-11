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
    latestNews: []
  },

  onLoad() {
    this.startCountdown()
    this.loadTodayMatches()
    this.loadGroupStandings('A组')
    this.loadLatestNews()
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
    // 模拟数据，实际应从API获取
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
        stadium: '慕尼黑安联球场'
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
        stadium: '科隆莱茵能源球场'
      }
    ]
    this.setData({ todayMatches: matches })
  },

  // 加载小组积分
  loadGroupStandings(group) {
    // 模拟数据
    const standings = [
      { team: '德国', flag: '/images/flags/germany.png', mp: 3, w: 2, d: 1, l: 0, pts: 7 },
      { team: '瑞士', flag: '/images/flags/switzerland.png', mp: 3, w: 1, d: 2, l: 0, pts: 5 },
      { team: '匈牙利', flag: '/images/flags/hungary.png', mp: 3, w: 1, d: 0, l: 2, pts: 3 },
      { team: '苏格兰', flag: '/images/flags/scotland.png', mp: 3, w: 0, d: 1, l: 2, pts: 1 }
    ]
    this.setData({ groupStandings: standings })
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

  // 切换小组
  switchGroup(e) {
    const group = e.currentTarget.dataset.group
    this.setData({ currentGroup: group })
    this.loadGroupStandings(group)
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
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}&type=match` })
  },

  goToNewsDetail(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/detail/detail?id=${id}&type=news` })
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
