// 2026世界杯数据 - 基于FIFA官方信息
// 更新时间：2026年6月11日
// 注意：部分小组名单可能还有变动，以FIFA最终公布为准

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-20',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥']
};

// 48支参赛球队 - 基于2025年12月抽签结果
// 注：部分小组还有待定名额
const teamsData = [
    // A组
    { id: 'mex', name: '墨西哥', flag: 'https://flagcdn.com/w80/mx.png', group: 'A', conf: 'CONCACAF' },
    { id: 'rsa', name: '南非', flag: 'https://flagcdn.com/w80/za.png', group: 'A', conf: 'CAF' },
    { id: 'kor', name: '韩国', flag: 'https://flagcdn.com/w80/kr.png', group: 'A', conf: 'AFC' },
    { id: 'cze', name: '捷克', flag: 'https://flagcdn.com/w80/cz.png', group: 'A', conf: 'UEFA' },

    // B组
    { id: 'can', name: '加拿大', flag: 'https://flagcdn.com/w80/ca.png', group: 'B', conf: 'CONCACAF' },
    { id: 'bih', name: '波黑', flag: 'https://flagcdn.com/w80/ba.png', group: 'B', conf: 'UEFA' },
    { id: 'qat', name: '卡塔尔', flag: 'https://flagcdn.com/w80/qa.png', group: 'B', conf: 'AFC' },
    { id: 'sui', name: '瑞士', flag: 'https://flagcdn.com/w80/ch.png', group: 'B', conf: 'UEFA' },

    // C组
    { id: 'bra', name: '巴西', flag: 'https://flagcdn.com/w80/br.png', group: 'C', conf: 'CONMEBOL' },
    { id: 'mar', name: '摩洛哥', flag: 'https://flagcdn.com/w80/ma.png', group: 'C', conf: 'CAF' },
    { id: 'hai', name: '海地', flag: 'https://flagcdn.com/w80/ht.png', group: 'C', conf: 'CONCACAF' },
    { id: 'sco', name: '苏格兰', flag: 'https://flagcdn.com/w80/gb-sct.png', group: 'C', conf: 'UEFA' },

    // D组
    { id: 'usa', name: '美国', flag: 'https://flagcdn.com/w80/us.png', group: 'D', conf: 'CONCACAF' },
    { id: 'par', name: '巴拉圭', flag: 'https://flagcdn.com/w80/py.png', group: 'D', conf: 'CONMEBOL' },
    { id: 'aus', name: '澳大利亚', flag: 'https://flagcdn.com/w80/au.png', group: 'D', conf: 'AFC' },
    { id: 'tur', name: '土耳其', flag: 'https://flagcdn.com/w80/tr.png', group: 'D', conf: 'UEFA' },

    // E组
    { id: 'ger', name: '德国', flag: 'https://flagcdn.com/w80/de.png', group: 'E', conf: 'UEFA' },
    { id: 'cuw', name: '库拉索', flag: 'https://flagcdn.com/w80/cw.png', group: 'E', conf: 'CONCACAF' },
    { id: 'civ', name: '科特迪瓦', flag: 'https://flagcdn.com/w80/ci.png', group: 'E', conf: 'CAF' },
    { id: 'ecu', name: '厄瓜多尔', flag: 'https://flagcdn.com/w80/ec.png', group: 'E', conf: 'CONMEBOL' },

    // F组
    { id: 'ned', name: '荷兰', flag: 'https://flagcdn.com/w80/nl.png', group: 'F', conf: 'UEFA' },
    { id: 'jpn', name: '日本', flag: 'https://flagcdn.com/w80/jp.png', group: 'F', conf: 'AFC' },
    { id: 'swe', name: '瑞典', flag: 'https://flagcdn.com/w80/se.png', group: 'F', conf: 'UEFA' },
    { id: 'tun', name: '突尼斯', flag: 'https://flagcdn.com/w80/tn.png', group: 'F', conf: 'CAF' },

    // G组
    { id: 'bel', name: '比利时', flag: 'https://flagcdn.com/w80/be.png', group: 'G', conf: 'UEFA' },
    { id: 'egy', name: '埃及', flag: 'https://flagcdn.com/w80/eg.png', group: 'G', conf: 'CAF' },
    { id: 'irn', name: '伊朗', flag: 'https://flagcdn.com/w80/ir.png', group: 'G', conf: 'AFC' },
    { id: 'nzl', name: '新西兰', flag: 'https://flagcdn.com/w80/nz.png', group: 'G', conf: 'OFC' },

    // H组
    { id: 'esp', name: '西班牙', flag: 'https://flagcdn.com/w80/es.png', group: 'H', conf: 'UEFA' },
    { id: 'cpv', name: '佛得角', flag: 'https://flagcdn.com/w80/cv.png', group: 'H', conf: 'CAF' },
    { id: 'ksa', name: '沙特阿拉伯', flag: 'https://flagcdn.com/w80/sa.png', group: 'H', conf: 'AFC' },
    { id: 'uru', name: '乌拉圭', flag: 'https://flagcdn.com/w80/uy.png', group: 'H', conf: 'CONMEBOL' },

    // I组
    { id: 'fra', name: '法国', flag: 'https://flagcdn.com/w80/fr.png', group: 'I', conf: 'UEFA' },
    { id: 'sen', name: '塞内加尔', flag: 'https://flagcdn.com/w80/sn.png', group: 'I', conf: 'CAF' },
    { id: 'irq', name: '伊拉克', flag: 'https://flagcdn.com/w80/iq.png', group: 'I', conf: 'AFC' },
    { id: 'nor', name: '挪威', flag: 'https://flagcdn.com/w80/no.png', group: 'I', conf: 'UEFA' },

    // J组
    { id: 'arg', name: '阿根廷', flag: 'https://flagcdn.com/w80/ar.png', group: 'J', conf: 'CONMEBOL' },
    { id: 'alg', name: '阿尔及利亚', flag: 'https://flagcdn.com/w80/dz.png', group: 'J', conf: 'CAF' },
    { id: 'aut', name: '奥地利', flag: 'https://flagcdn.com/w80/at.png', group: 'J', conf: 'UEFA' },
    { id: 'jor', name: '约旦', flag: 'https://flagcdn.com/w80/jo.png', group: 'J', conf: 'AFC' },

    // K组
    { id: 'por', name: '葡萄牙', flag: 'https://flagcdn.com/w80/pt.png', group: 'K', conf: 'UEFA' },
    { id: 'cod', name: '刚果(金)', flag: 'https://flagcdn.com/w80/cd.png', group: 'K', conf: 'CAF' },
    { id: 'uzb', name: '乌兹别克斯坦', flag: 'https://flagcdn.com/w80/uz.png', group: 'K', conf: 'AFC' },
    { id: 'col', name: '哥伦比亚', flag: 'https://flagcdn.com/w80/co.png', group: 'K', conf: 'CONMEBOL' },

    // L组
    { id: 'eng', name: '英格兰', flag: 'https://flagcdn.com/w80/gb-eng.png', group: 'L', conf: 'UEFA' },
    { id: 'cro', name: '克罗地亚', flag: 'https://flagcdn.com/w80/hr.png', group: 'L', conf: 'UEFA' },
    { id: 'gha', name: '加纳', flag: 'https://flagcdn.com/w80/gh.png', group: 'L', conf: 'CAF' },
    { id: 'pan', name: '巴拿马', flag: 'https://flagcdn.com/w80/pa.png', group: 'L', conf: 'CONCACAF' }
];

// 比赛数据 - 2026年6月11日-12日开幕日赛程
// 时间已转换为北京时间（UTC+8）
const matchesData = [
    // ========== 2026年6月11日（周四）==========
    {
        id: 1,
        date: '2026-06-12',
        time: '03:00',
        home: 'mex',
        away: 'rsa',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'A组',
        stage: 'group',
        stadium: '阿兹特克体育场',
        city: '墨西哥城',
        important: true,
        note: '开幕式+揭幕战'
    },

    // ========== 2026年6月12日（周五）==========
    {
        id: 2,
        date: '2026-06-12',
        time: '06:00',
        home: 'can',
        away: 'bih',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'B组',
        stage: 'group',
        stadium: 'BC Place',
        city: '温哥华',
        important: false
    },
    {
        id: 3,
        date: '2026-06-12',
        time: '09:00',
        home: 'bra',
        away: 'mar',
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
        id: 4,
        date: '2026-06-13',
        time: '03:00',
        home: 'usa',
        away: 'par',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'D组',
        stage: 'group',
        stadium: 'SoFi体育场',
        city: '洛杉矶',
        important: true
    },
    {
        id: 5,
        date: '2026-06-13',
        time: '06:00',
        home: 'ger',
        away: 'cuw',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'E组',
        stage: 'group',
        stadium: '大都会人寿体育场',
        city: '纽约',
        important: false
    },
    {
        id: 6,
        date: '2026-06-13',
        time: '09:00',
        home: 'ned',
        away: 'jpn',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'F组',
        stage: 'group',
        stadium: '硬石体育场',
        city: '迈阿密',
        important: true
    },

    // ========== 2026年6月14日（周日）==========
    {
        id: 7,
        date: '2026-06-14',
        time: '03:00',
        home: 'bel',
        away: 'egy',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'G组',
        stage: 'group',
        stadium: '吉列体育场',
        city: '波士顿',
        important: true
    },
    {
        id: 8,
        date: '2026-06-14',
        time: '06:00',
        home: 'esp',
        away: 'cpv',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'H组',
        stage: 'group',
        stadium: '流明球场',
        city: '西雅图',
        important: false
    },
    {
        id: 9,
        date: '2026-06-14',
        time: '09:00',
        home: 'fra',
        away: 'sen',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'I组',
        stage: 'group',
        stadium: '索菲体育场',
        city: '洛杉矶',
        important: true
    },

    // ========== 2026年6月15日（周一）==========
    {
        id: 10,
        date: '2026-06-15',
        time: '03:00',
        home: 'arg',
        away: 'alg',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'J组',
        stage: 'group',
        stadium: 'NRG体育场',
        city: '休斯顿',
        important: true
    },
    {
        id: 11,
        date: '2026-06-15',
        time: '06:00',
        home: 'por',
        away: 'cod',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'K组',
        stage: 'group',
        stadium: '梅赛德斯-奔驰体育场',
        city: '亚特兰大',
        important: true
    },
    {
        id: 12,
        date: '2026-06-15',
        time: '09:00',
        home: 'eng',
        away: 'cro',
        homeScore: null,
        awayScore: null,
        status: 'upcoming',
        group: 'L组',
        stage: 'group',
        stadium: '林肯金融球场',
        city: '费城',
        important: true
    }
];

// 小组积分榜 - 初始状态（2026年6月11日，尚未开始）
const groupStandings = {
    'A': [
        { team: 'mex', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'rsa', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'kor', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cze', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'B': [
        { team: 'can', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'bih', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'qat', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'sui', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'C': [
        { team: 'bra', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'mar', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'hai', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'sco', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'D': [
        { team: 'usa', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'par', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'aus', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'tur', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'E': [
        { team: 'ger', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cuw', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'civ', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'ecu', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'F': [
        { team: 'ned', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'jpn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'swe', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'tun', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'G': [
        { team: 'bel', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'egy', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'irn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'nzl', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'H': [
        { team: 'esp', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cpv', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'ksa', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'uru', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'I': [
        { team: 'fra', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'sen', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'irq', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'nor', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'J': [
        { team: 'arg', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'alg', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'aut', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'jor', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'K': [
        { team: 'por', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cod', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'uzb', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'col', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ],
    'L': [
        { team: 'eng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'cro', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'gha', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 },
        { team: 'pan', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0 }
    ]
};

// 总积分榜 - 初始状态
const overallStandings = [
    { rank: 1, team: 'mex', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 2, team: 'rsa', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 3, team: 'kor', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 4, team: 'cze', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 5, team: 'can', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 6, team: 'bih', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 7, team: 'qat', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 8, team: 'sui', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
];

// 比赛详情数据（示例）
const matchDetails = {};

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
