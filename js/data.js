// 2026世界杯数据

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥']
};

// 球队数据
const teamsData = [
    { id: 'arg', name: '阿根廷', flag: 'https://flagcdn.com/w80/ar.png', group: 'C', conf: 'CONMEBOL' },
    { id: 'bra', name: '巴西', flag: 'https://flagcdn.com/w80/br.png', group: 'F', conf: 'CONMEBOL' },
    { id: 'fra', name: '法国', flag: 'https://flagcdn.com/w80/fr.png', group: 'D', conf: 'UEFA' },
    { id: 'ger', name: '德国', flag: 'https://flagcdn.com/w80/de.png', group: 'A', conf: 'UEFA' },
    { id: 'esp', name: '西班牙', flag: 'https://flagcdn.com/w80/es.png', group: 'E', conf: 'UEFA' },
    { id: 'eng', name: '英格兰', flag: 'https://flagcdn.com/w80/gb-eng.png', group: 'B', conf: 'UEFA' },
    { id: 'por', name: '葡萄牙', flag: 'https://flagcdn.com/w80/pt.png', group: 'H', conf: 'UEFA' },
    { id: 'ned', name: '荷兰', flag: 'https://flagcdn.com/w80/nl.png', group: 'A', conf: 'UEFA' },
    { id: 'usa', name: '美国', flag: 'https://flagcdn.com/w80/us.png', group: 'A', conf: 'CONCACAF' },
    { id: 'mex', name: '墨西哥', flag: 'https://flagcdn.com/w80/mx.png', group: 'A', conf: 'CONCACAF' },
    { id: 'can', name: '加拿大', flag: 'https://flagcdn.com/w80/ca.png', group: 'B', conf: 'CONCACAF' },
    { id: 'jpn', name: '日本', flag: 'https://flagcdn.com/w80/jp.png', group: 'E', conf: 'AFC' },
    { id: 'kor', name: '韩国', flag: 'https://flagcdn.com/w80/kr.png', group: 'H', conf: 'AFC' },
    { id: 'aus', name: '澳大利亚', flag: 'https://flagcdn.com/w80/au.png', group: 'D', conf: 'AFC' },
    { id: 'mar', name: '摩洛哥', flag: 'https://flagcdn.com/w80/ma.png', group: 'F', conf: 'CAF' },
    { id: 'cmr', name: '喀麦隆', flag: 'https://flagcdn.com/w80/cm.png', group: 'F', conf: 'CAF' }
];

// 比赛数据
const matchesData = [
    { id: 1, date: '2026-06-11', time: '20:00', home: 'usa', away: 'mex', homeScore: 2, awayScore: 1, status: 'finished', group: 'A组', stage: 'group', stadium: '洛杉矶索菲体育场', important: true },
    { id: 2, date: '2026-06-12', time: '16:00', home: 'arg', away: 'can', homeScore: 3, awayScore: 0, status: 'finished', group: 'B组', stage: 'group', stadium: 'AT&T体育场', important: true },
    { id: 3, date: '2026-06-12', time: '20:00', home: 'fra', away: 'aus', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: '阿兹特克体育场', important: true },
    { id: 4, date: '2026-06-13', time: '14:00', home: 'esp', away: 'jpn', homeScore: 2, awayScore: 0, status: 'live', minute: 67, group: 'D组', stage: 'group', stadium: '大都会人寿体育场', important: true },
    { id: 5, date: '2026-06-13', time: '17:00', home: 'ger', away: 'kor', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: '硬石体育场', important: true },
    { id: 6, date: '2026-06-13', time: '20:00', home: 'bra', away: 'cmr', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', stage: 'group', stadium: '流明球场', important: true },
    { id: 7, date: '2026-06-14', time: '16:00', home: 'eng', away: 'ned', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: 'BC Place', important: true },
    { id: 8, date: '2026-06-14', time: '20:00', home: 'por', away: 'mar', homeScore: null, awayScore: null, status: 'upcoming', group: 'H组', stage: 'group', stadium: '吉列体育场', important: false }
];

// 小组积分榜数据
const groupStandings = {
    'A': [
        { team: 'arg', mp: 3, w: 3, d: 0, l: 0, gf: 8, ga: 1, pts: 9 },
        { team: 'mex', mp: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, pts: 6 },
        { team: 'usa', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'can', mp: 3, w: 0, d: 0, l: 3, gf: 1, ga: 8, pts: 0 }
    ],
    'B': [
        { team: 'eng', mp: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, pts: 7 },
        { team: 'ned', mp: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, pts: 6 },
        { team: 'kor', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'cmr', mp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 6, pts: 1 }
    ],
    'C': [
        { team: 'fra', mp: 3, w: 2, d: 1, l: 0, gf: 7, ga: 2, pts: 7 },
        { team: 'den', mp: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, pts: 6 },
        { team: 'aus', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'tun', mp: 3, w: 0, d: 1, l: 2, gf: 1, ga: 5, pts: 1 }
    ],
    'D': [
        { team: 'esp', mp: 3, w: 3, d: 0, l: 0, gf: 9, ga: 1, pts: 9 },
        { team: 'jpn', mp: 3, w: 1, d: 1, l: 1, gf: 4, ga: 4, pts: 4 },
        { team: 'crc', mp: 3, w: 1, d: 0, l: 2, gf: 2, ga: 5, pts: 3 },
        { team: 'ger', mp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 7, pts: 1 }
    ],
    'E': [
        { team: 'bra', mp: 3, w: 2, d: 1, l: 0, gf: 6, ga: 1, pts: 7 },
        { team: 'sui', mp: 3, w: 2, d: 0, l: 1, gf: 4, ga: 3, pts: 6 },
        { team: 'srb', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'cmr', mp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 6, pts: 1 }
    ],
    'F': [
        { team: 'mar', mp: 3, w: 2, d: 1, l: 0, gf: 5, ga: 2, pts: 7 },
        { team: 'cro', mp: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, pts: 6 },
        { team: 'bel', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'can', mp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 5, pts: 1 }
    ],
    'G': [
        { team: 'por', mp: 3, w: 2, d: 1, l: 0, gf: 6, ga: 3, pts: 7 },
        { team: 'uru', mp: 3, w: 2, d: 0, l: 1, gf: 4, ga: 2, pts: 6 },
        { team: 'gha', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'kor', mp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 5, pts: 1 }
    ],
    'H': [
        { team: 'ned', mp: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, pts: 7 },
        { team: 'sen', mp: 3, w: 2, d: 0, l: 1, gf: 5, ga: 4, pts: 6 },
        { team: 'ecu', mp: 3, w: 1, d: 0, l: 2, gf: 3, ga: 5, pts: 3 },
        { team: 'qat', mp: 3, w: 0, d: 1, l: 2, gf: 2, ga: 5, pts: 1 }
    ]
};

// 总积分榜
const overallStandings = [
    { rank: 1, team: 'arg', group: 'C', mp: 3, w: 3, d: 0, l: 0, gf: 8, ga: 1, gd: 7, pts: 9 },
    { rank: 2, team: 'esp', group: 'E', mp: 3, w: 3, d: 0, l: 0, gf: 9, ga: 1, gd: 8, pts: 9 },
    { rank: 3, team: 'ned', group: 'A', mp: 3, w: 2, d: 1, l: 0, gf: 5, ga: 1, gd: 4, pts: 7 },
    { rank: 4, team: 'bra', group: 'G', mp: 3, w: 2, d: 1, l: 0, gf: 6, ga: 1, gd: 5, pts: 7 },
    { rank: 5, team: 'eng', group: 'B', mp: 3, w: 2, d: 1, l: 0, gf: 6, ga: 2, gd: 4, pts: 7 },
    { rank: 6, team: 'por', group: 'H', mp: 3, w: 2, d: 1, l: 0, gf: 6, ga: 3, gd: 3, pts: 7 },
    { rank: 7, team: 'fra', group: 'D', mp: 3, w: 2, d: 0, l: 1, gf: 6, ga: 3, gd: 3, pts: 6 },
    { rank: 8, team: 'mex', group: 'A', mp: 3, w: 2, d: 0, l: 1, gf: 5, ga: 3, gd: 2, pts: 6 }
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
