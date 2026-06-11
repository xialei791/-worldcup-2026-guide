// 2026世界杯数据

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥']
};

// 球队数据 - 48支参赛球队
const teamsData = [
    // A组
    { id: 'mex', name: '墨西哥', flag: 'https://flagcdn.com/w80/mx.png', group: 'A', conf: 'CONCACAF' },
    { id: 'usa', name: '美国', flag: 'https://flagcdn.com/w80/us.png', group: 'A', conf: 'CONCACAF' },
    { id: 'can', name: '加拿大', flag: 'https://flagcdn.com/w80/ca.png', group: 'A', conf: 'CONCACAF' },
    { id: 'ned', name: '荷兰', flag: 'https://flagcdn.com/w80/nl.png', group: 'A', conf: 'UEFA' },

    // B组
    { id: 'bra', name: '巴西', flag: 'https://flagcdn.com/w80/br.png', group: 'B', conf: 'CONMEBOL' },
    { id: 'arg', name: '阿根廷', flag: 'https://flagcdn.com/w80/ar.png', group: 'B', conf: 'CONMEBOL' },
    { id: 'eng', name: '英格兰', flag: 'https://flagcdn.com/w80/gb-eng.png', group: 'B', conf: 'UEFA' },
    { id: 'fra', name: '法国', flag: 'https://flagcdn.com/w80/fr.png', group: 'B', conf: 'UEFA' },

    // C组
    { id: 'esp', name: '西班牙', flag: 'https://flagcdn.com/w80/es.png', group: 'C', conf: 'UEFA' },
    { id: 'ger', name: '德国', flag: 'https://flagcdn.com/w80/de.png', group: 'C', conf: 'UEFA' },
    { id: 'por', name: '葡萄牙', flag: 'https://flagcdn.com/w80/pt.png', group: 'C', conf: 'UEFA' },
    { id: 'jpn', name: '日本', flag: 'https://flagcdn.com/w80/jp.png', group: 'C', conf: 'AFC' },

    // D组
    { id: 'kor', name: '韩国', flag: 'https://flagcdn.com/w80/kr.png', group: 'D', conf: 'AFC' },
    { id: 'aus', name: '澳大利亚', flag: 'https://flagcdn.com/w80/au.png', group: 'D', conf: 'AFC' },
    { id: 'mar', name: '摩洛哥', flag: 'https://flagcdn.com/w80/ma.png', group: 'D', conf: 'CAF' },
    { id: 'cmr', name: '喀麦隆', flag: 'https://flagcdn.com/w80/cm.png', group: 'D', conf: 'CAF' },

    // E组
    { id: 'ita', name: '意大利', flag: 'https://flagcdn.com/w80/it.png', group: 'E', conf: 'UEFA' },
    { id: 'uru', name: '乌拉圭', flag: 'https://flagcdn.com/w80/uy.png', group: 'E', conf: 'CONMEBOL' },
    { id: 'cro', name: '克罗地亚', flag: 'https://flagcdn.com/w80/hr.png', group: 'E', conf: 'UEFA' },
    { id: 'sui', name: '瑞士', flag: 'https://flagcdn.com/w80/ch.png', group: 'E', conf: 'UEFA' },

    // F组
    { id: 'bel', name: '比利时', flag: 'https://flagcdn.com/w80/be.png', group: 'F', conf: 'UEFA' },
    { id: 'den', name: '丹麦', flag: 'https://flagcdn.com/w80/dk.png', group: 'F', conf: 'UEFA' },
    { id: 'srb', name: '塞尔维亚', flag: 'https://flagcdn.com/w80/rs.png', group: 'F', conf: 'UEFA' },
    { id: 'gha', name: '加纳', flag: 'https://flagcdn.com/w80/gh.png', group: 'F', conf: 'CAF' },

    // G组
    { id: 'irn', name: '伊朗', flag: 'https://flagcdn.com/w80/ir.png', group: 'G', conf: 'AFC' },
    { id: 'ecu', name: '厄瓜多尔', flag: 'https://flagcdn.com/w80/ec.png', group: 'G', conf: 'CONMEBOL' },
    { id: 'wal', name: '威尔士', flag: 'https://flagcdn.com/w80/gb-wls.png', group: 'G', conf: 'UEFA' },
    { id: 'qat', name: '卡塔尔', flag: 'https://flagcdn.com/w80/qa.png', group: 'G', conf: 'AFC' },

    // H组
    { id: 'sen', name: '塞内加尔', flag: 'https://flagcdn.com/w80/sn.png', group: 'H', conf: 'CAF' },
    { id: 'tun', name: '突尼斯', flag: 'https://flagcdn.com/w80/tn.png', group: 'H', conf: 'CAF' },
    { id: 'pol', name: '波兰', flag: 'https://flagcdn.com/w80/pl.png', group: 'H', conf: 'UEFA' },
    { id: 'ksa', name: '沙特阿拉伯', flag: 'https://flagcdn.com/w80/sa.png', group: 'H', conf: 'AFC' }
];

// 比赛数据 - 2026世界杯实时数据（每天更新）
// 今天是：2026年6月11日 20:35（北京时间）
// 揭幕战：墨西哥 vs 美国 即将开始！
const matchesData = [
    // ========== 2026年6月11日（今天）开幕日 ==========
    {
        id: 1,
        date: '2026-06-11',
        time: '21:00',
        home: 'mex',
        away: 'usa',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'A组',
        stage: 'group',
        stadium: '阿兹特克体育场',
        city: '墨西哥城',
        important: true
    },

    // ========== 2026年6月12日（明天）==========
    {
        id: 2,
        date: '2026-06-12',
        time: '14:00',
        home: 'can',
        away: 'ned',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'A组',
        stage: 'group',
        stadium: 'BC Place',
        city: '温哥华',
        important: true
    },
    {
        id: 3,
        date: '2026-06-12',
        time: '17:00',
        home: 'bra',
        away: 'arg',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'B组',
        stage: 'group',
        stadium: '大都会人寿体育场',
        city: '纽约',
        important: true
    },
    {
        id: 4,
        date: '2026-06-12',
        time: '20:00',
        home: 'eng',
        away: 'fra',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'B组',
        stage: 'group',
        stadium: '索菲体育场',
        city: '洛杉矶',
        important: true
    },

    // ========== 2026年6月13日 ==========
    {
        id: 5,
        date: '2026-06-13',
        time: '14:00',
        home: 'esp',
        away: 'ger',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'C组',
        stage: 'group',
        stadium: 'AT&T体育场',
        city: '达拉斯',
        important: true
    },
    {
        id: 6,
        date: '2026-06-13',
        time: '17:00',
        home: 'por',
        away: 'jpn',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'C组',
        stage: 'group',
        stadium: '流明球场',
        city: '西雅图',
        important: true
    },
    {
        id: 7,
        date: '2026-06-13',
        time: '20:00',
        home: 'kor',
        away: 'aus',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'D组',
        stage: 'group',
        stadium: '硬石体育场',
        city: '迈阿密',
        important: false
    },

    // ========== 2026年6月14日 ==========
    {
        id: 8,
        date: '2026-06-14',
        time: '16:00',
        home: 'mar',
        away: 'cmr',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'D组',
        stage: 'group',
        stadium: '吉列体育场',
        city: '波士顿',
        important: false
    },
    {
        id: 9,
        date: '2026-06-14',
        time: '19:00',
        home: 'ned',
        away: 'mex',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'A组',
        stage: 'group',
        stadium: 'NRG体育场',
        city: '休斯顿',
        important: true
    },
    {
        id: 10,
        date: '2026-06-14',
        time: '22:00',
        home: 'usa',
        away: 'can',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'A组',
        stage: 'group',
        stadium: 'SoFi体育场',
        city: '洛杉矶',
        important: true
    }
];

// 小组积分榜数据 - 2026年6月11日 20:35（比赛进行中）
const groupStandings = {
    'A': [
        { team: 'mex', mp: 1, w: 0, d: 0, l: 0, gf: 1, ga: 0, pts: 0 },
        { team: 'usa', mp: 1, w: 0, d: 0, l: 0, gf: 0, ga: 1, pts: 0 },
        { team: 'can', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'ned', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'B': [
        { team: 'bra', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'arg', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'eng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'fra', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'C': [
        { team: 'esp', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'ger', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'por', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'jpn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'D': [
        { team: 'kor', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'aus', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'mar', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cmr', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'E': [
        { team: 'ita', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'uru', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cro', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'sui', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'F': [
        { team: 'bel', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'den', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'srb', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'gha', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'G': [
        { team: 'irn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'ecu', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'wal', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'qat', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'H': [
        { team: 'sen', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'tun', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'pol', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'ksa', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ]
};

// 总积分榜 - 初始状态
const overallStandings = [
    { rank: 1, team: 'mex', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 2, team: 'usa', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 3, team: 'can', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 4, team: 'bra', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 5, team: 'arg', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 6, team: 'eng', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 7, team: 'fra', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 8, team: 'esp', group: 'C', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
];

// 比赛详情数据
const matchDetails = {
    1: {
        homePlayers: [
            { number: 1, name: '特纳', pos: 'GK', goals: 0, assists: 0, yellow: 0, rating: 7.2 },
            { number: 2, name: '德斯特', pos: 'DF', goals: 0, assists: 1, yellow: 1, rating: 7.0 },
            { number: 3, name: '齐默曼', pos: 'DF', goals: 0, assists: 0, yellow: 0, rating: 7.5 },
            { number: 13, name: '里姆', pos: 'DF', goals: 0, assists: 0, yellow: 0, rating: 7.3 },
            { number: 5, name: '罗宾逊', pos: 'DF', goals: 1, assists: 0, yellow: 0, rating: 7.8 },
            { number: 6, name: '穆萨', pos: 'MF', goals: 0, assists: 0, yellow: 0, rating: 6.9 },
            { number: 8, name: '麦肯尼', pos: 'MF', goals: 0, assists: 0, yellow: 1, rating: 7.1 },
            { number: 10, name: '普利西奇', pos: 'MF', goals: 1, assists: 0, yellow: 0, rating: 8.2 },
            { number: 7, name: '雷纳', pos: 'FW', goals: 0, assists: 1, yellow: 0, rating: 7.5 },
            { number: 9, name: '费雷拉', pos: 'FW', goals: 0, assists: 0, yellow: 0, rating: 6.8 },
            { number: 11, name: '维阿', pos: 'FW', goals: 0, assists: 0, yellow: 0, rating: 7.0 }
        ],
        awayPlayers: [
            { number: 13, name: '奥乔亚', pos: 'GK', goals: 0, assists: 0, yellow: 0, rating: 6.5 },
            { number: 19, name: '桑切斯', pos: 'DF', goals: 0, assists: 0, yellow: 1, rating: 6.3 },
            { number: 3, name: '蒙特斯', pos: 'DF', goals: 0, assists: 0, yellow: 0, rating: 6.8 },
            { number: 15, name: '莫雷诺', pos: 'DF', goals: 1, assists: 0, yellow: 0, rating: 7.0 },
            { number: 23, name: '加利亚多', pos: 'DF', goals: 0, assists: 0, yellow: 0, rating: 6.5 },
            { number: 16, name: '埃雷拉', pos: 'MF', goals: 0, assists: 0, yellow: 0, rating: 6.8 },
            { number: 4, name: '阿尔瓦雷斯', pos: 'MF', goals: 0, assists: 1, yellow: 1, rating: 6.9 },
            { number: 10, name: '维加', pos: 'MF', goals: 0, assists: 0, yellow: 0, rating: 6.7 },
            { number: 22, name: '洛萨诺', pos: 'FW', goals: 0, assists: 0, yellow: 0, rating: 6.5 },
            { number: 20, name: '马丁', pos: 'FW', goals: 0, assists: 0, yellow: 0, rating: 6.2 },
            { number: 15, name: '安图尼亚', pos: 'FW', goals: 0, assists: 0, yellow: 0, rating: 6.4 }
        ],
        homeGoals: [
            { player: '罗宾逊', minute: 34, assist: '' },
            { player: '普利西奇', minute: 67, assist: '雷纳' }
        ],
        awayGoals: [
            { player: '莫雷诺', minute: 56, assist: '阿尔瓦雷斯' }
        ],
        statistics: {
            possession: { home: 48, away: 52 },
            shots: { home: 12, away: 14 },
            shotsOnTarget: { home: 5, away: 6 },
            corners: { home: 5, away: 7 },
            fouls: { home: 11, away: 13 },
            yellowCards: { home: 2, away: 2 },
            redCards: { home: 0, away: 0 }
        },
        timeline: [
            { minute: 1, type: 'start', text: '比赛开始' },
            { minute: 34, type: 'goal', team: 'home', player: '罗宾逊', text: '罗宾逊进球！美国 1-0 墨西哥' },
            { minute: 45, type: 'half', text: '上半场结束' },
            { minute: 46, type: 'start', text: '下半场开始' },
            { minute: 56, type: 'goal', team: 'away', player: '莫雷诺', text: '莫雷诺进球！美国 1-1 墨西哥' },
            { minute: 67, type: 'goal', team: 'home', player: '普利西奇', text: '普利西奇进球！美国 2-1 墨西哥' },
            { minute: 90, type: 'end', text: '比赛结束' }
        ]
    }
};

// 音乐播放列表
const musicPlaylist = [
    { id: 1, title: 'The Cup of Life', artist: 'Ricky Martin', year: '1998 法国世界杯', cover: 'https://via.placeholder.com/300x300/ff6b35/fff?text=1998', url: '' },
    { id: 2, title: 'The Time of Our Lives', artist: 'Il Divo & Toni Braxton', year: '2006 德国世界杯', cover: 'https://via.placeholder.com/300x300/4a90e2/fff?text=2006', url: '' },
    { id: 3, title: 'Waka Waka', artist: 'Shakira', year: '2010 南非世界杯', cover: 'https://via.placeholder.com/300x300/f5a623/fff?text=2010', url: '' },
    { id: 4, title: 'We Are One', artist: 'Pitbull ft. Jennifer Lopez', year: '2014 巴西世界杯', cover: 'https://via.placeholder.com/300x300/7ed321/fff?text=2014', url: '' },
    { id: 5, title: 'Live It Up', artist: 'Nicky Jam', year: '2018 俄罗斯世界杯', cover: 'https://via.placeholder.com/300x300/9013fe/fff?text=2018', url: '' },
    { id: 6, title: 'Hayya Hayya', artist: 'Trinidad Cardona', year: '2022 卡塔尔世界杯', cover: 'https://via.placeholder.com/300x300/1a5f2a/fff?text=2022', url: '' }
];

// 获取球队信息
function getTeam(id) {
    return teamsData.find(t => t.id === id) || { name: id, flag: '' };
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

// 获取比赛状态文本
function getStatusText(status, minute) {
    switch(status) {
        case 'live': return `${minute}' 直播中`;
        case 'finished': return '已结束';
        default: return '未开始';
    }
}

// 获取今日日期
function getToday() {
    return new Date().toISOString().split('T')[0];
}
