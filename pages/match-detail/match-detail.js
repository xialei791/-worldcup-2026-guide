// 比赛详情页
Page({
  data: {
    matchId: null,
    matchInfo: null,
    homePlayers: [],
    awayPlayers: [],
    homeGoals: [],
    awayGoals: [],
    homeAssists: [],
    awayAssists: [],
    statistics: null,
    timeline: [],
    activeTab: 'overview', // overview, lineup, stats, events
    showMusicPlayer: false
  },

  onLoad(options) {
    const matchId = options.id
    this.setData({ matchId })
    this.loadMatchDetail(matchId)
  },

  // 加载比赛详情
  loadMatchDetail(matchId) {
    // 模拟比赛数据
    const matchData = {
      id: matchId,
      homeTeam: '阿根廷',
      awayTeam: '法国',
      homeFlag: '/images/flags/arg.png',
      awayFlag: '/images/flags/fra.png',
      homeScore: 3,
      awayScore: 2,
      status: 'finished',
      group: '决赛',
      time: '20:00',
      date: '2026-07-19',
      stadium: '大都会人寿体育场',
      city: '纽约',
      attendance: '82,500',
      referee: '判罚员',
      weather: '晴朗 22°C'
    }

    // 模拟球员数据
    const homePlayers = [
      { number: 23, name: '马丁内斯', position: 'GK', goals: 0, assists: 0, yellow: 0, red: 0, rating: 7.5 },
      { number: 4, name: '蒙铁尔', position: 'DF', goals: 0, assists: 0, yellow: 1, red: 0, rating: 7.0 },
      { number: 13, name: '罗梅罗', position: 'DF', goals: 0, assists: 0, yellow: 0, red: 0, rating: 7.8 },
      { number: 19, name: '奥塔门迪', position: 'DF', goals: 0, assists: 0, yellow: 1, red: 0, rating: 7.2 },
      { number: 3, name: '塔利亚菲科', position: 'DF', goals: 0, assists: 1, yellow: 0, red: 0, rating: 7.5 },
      { number: 7, name: '德保罗', position: 'MF', goals: 0, assists: 0, yellow: 0, red: 0, rating: 8.0 },
      { number: 24, name: '恩佐', position: 'MF', goals: 0, assists: 1, yellow: 0, red: 0, rating: 8.5 },
      { number: 20, name: '麦卡利斯特', position: 'MF', goals: 0, assists: 0, yellow: 0, red: 0, rating: 7.8 },
      { number: 11, name: '迪马利亚', position: 'FW', goals: 1, assists: 0, yellow: 0, red: 0, rating: 8.2 },
      { number: 10, name: '梅西', position: 'FW', goals: 2, assists: 0, yellow: 0, red: 0, rating: 9.5 },
      { number: 9, name: '阿尔瓦雷斯', position: 'FW', goals: 0, assists: 0, yellow: 0, red: 0, rating: 7.0 }
    ]

    const awayPlayers = [
      { number: 1, name: '洛里斯', position: 'GK', goals: 0, assists: 0, yellow: 0, red: 0, rating: 6.5 },
      { number: 5, name: '孔德', position: 'DF', goals: 0, assists: 0, yellow: 0, red: 0, rating: 6.8 },
      { number: 4, name: '瓦拉内', position: 'DF', goals: 0, assists: 0, yellow: 0, red: 0, rating: 7.0 },
      { number: 18, name: '于帕梅卡诺', position: 'DF', goals: 0, assists: 0, yellow: 1, red: 0, rating: 6.5 },
      { number: 22, name: '特奥', position: 'DF', goals: 0, assists: 1, yellow: 0, red: 0, rating: 7.5 },
      { number: 8, name: '楚阿梅尼', position: 'MF', goals: 0, assists: 0, yellow: 0, red: 0, rating: 7.0 },
      { number: 14, name: '拉比奥特', position: 'MF', goals: 0, assists: 0, yellow: 1, red: 0, rating: 6.8 },
      { number: 7, name: '格列兹曼', position: 'MF', goals: 0, assists: 1, yellow: 0, red: 0, rating: 7.5 },
      { number: 11, name: '登贝莱', position: 'FW', goals: 0, assists: 0, yellow: 0, red: 0, rating: 6.5 },
      { number: 10, name: '姆巴佩', position: 'FW', goals: 2, assists: 0, yellow: 0, red: 0, rating: 8.8 },
      { number: 9, name: '吉鲁', position: 'FW', goals: 0, assists: 0, yellow: 0, red: 0, rating: 6.8 }
    ]

    // 进球数据
    const homeGoals = [
      { player: '梅西', minute: 23, assist: '' },
      { player: '迪马利亚', minute: 36, assist: '塔利亚菲科' },
      { player: '梅西', minute: 108, assist: '恩佐' }
    ]

    const awayGoals = [
      { player: '姆巴佩', minute: 80, assist: '格列兹曼' },
      { player: '姆巴佩', minute: 81, assist: '特奥' }
    ]

    // 助攻数据
    const homeAssists = [
      { player: '塔利亚菲科', count: 1 },
      { player: '恩佐', count: 1 }
    ]

    const awayAssists = [
      { player: '格列兹曼', count: 1 },
      { player: '特奥', count: 1 }
    ]

    // 比赛统计数据
    const statistics = {
      possession: { home: 52, away: 48 },
      shots: { home: 14, away: 12 },
      shotsOnTarget: { home: 8, away: 5 },
      corners: { home: 6, away: 4 },
      fouls: { home: 12, away: 15 },
      yellowCards: { home: 2, away: 2 },
      redCards: { home: 0, away: 0 },
      offsides: { home: 2, away: 3 },
      passes: { home: 487, away: 423 },
      passAccuracy: { home: 86, away: 82 }
    }

    // 比赛时间线
    const timeline = [
      { minute: 1, type: 'start', text: '比赛开始' },
      { minute: 23, type: 'goal', team: 'home', player: '梅西', text: '梅西进球！阿根廷 1-0 法国' },
      { minute: 36, type: 'goal', team: 'home', player: '迪马利亚', text: '迪马利亚进球！阿根廷 2-0 法国' },
      { minute: 45, type: 'card', team: 'home', player: '蒙铁尔', text: '蒙铁尔黄牌' },
      { minute: 45, type: 'half', text: '上半场结束' },
      { minute: 46, type: 'start', text: '下半场开始' },
      { minute: 68, type: 'substitution', team: 'away', text: '法国换人：科曼换下登贝莱' },
      { minute: 71, type: 'substitution', team: 'away', text: '法国换人：卡马文加换下拉比奥特' },
      { minute: 80, type: 'goal', team: 'away', player: '姆巴佩', text: '姆巴佩点球命中！阿根廷 2-1 法国' },
      { minute: 81, type: 'goal', team: 'away', player: '姆巴佩', text: '姆巴佩进球！阿根廷 2-2 法国' },
      { minute: 90, type: 'card', team: 'away', player: '于帕梅卡诺', text: '于帕梅卡诺黄牌' },
      { minute: 90, type: 'end', text: '90分钟结束，进入加时' },
      { minute: 91, type: 'start', text: '加时赛开始' },
      { minute: 95, type: 'substitution', team: 'home', text: '阿根廷换人：帕雷德斯换下麦卡利斯特' },
      { minute: 108, type: 'goal', team: 'home', player: '梅西', text: '梅西进球！阿根廷 3-2 法国' },
      { minute: 116, type: 'card', team: 'home', player: '奥塔门迪', text: '奥塔门迪黄牌' },
      { minute: 120, type: 'end', text: '比赛结束' }
    ]

    this.setData({
      matchInfo: matchData,
      homePlayers: homePlayers,
      awayPlayers: awayPlayers,
      homeGoals: homeGoals,
      awayGoals: awayGoals,
      homeAssists: homeAssists,
      awayAssists: awayAssists,
      statistics: statistics,
      timeline: timeline
    })
  },

  // 切换标签页
  switchTab(e) {
    const tab = e.currentTarget.dataset.tab
    this.setData({ activeTab: tab })
  },

  // 切换音乐播放器
  toggleMusicPlayer() {
    this.setData({ showMusicPlayer: !this.data.showMusicPlayer })
  }
})
