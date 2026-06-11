// 2026世界杯数据 - 自动更新于 2026-06-11T22:03:31.862Z
// 数据来源: FIFA官网 / 各大洲足联 / 公开数据
// 最后更新: 2026/6/12 06:03:31

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥'],
    lastUpdate: '2026-06-11T22:03:31.862Z'
};

// ==================== 球队数据 ====================
const teamsData = [
    {
        "id": "us",
        "name": "美国",
        "nameEn": "USA",
        "flag": "https://flagcdn.com/w80/us.png",
        "conf": "CONCACAF",
        "qualified": true,
        "rank": 16
    },
    {
        "id": "ca",
        "name": "加拿大",
        "nameEn": "Canada",
        "flag": "https://flagcdn.com/w80/ca.png",
        "conf": "CONCACAF",
        "qualified": true,
        "rank": 38
    },
    {
        "id": "mx",
        "name": "墨西哥",
        "nameEn": "Mexico",
        "flag": "https://flagcdn.com/w80/mx.png",
        "conf": "CONCACAF",
        "qualified": true,
        "rank": 17
    },
    {
        "id": "ar",
        "name": "阿根廷",
        "nameEn": "Argentina",
        "flag": "https://flagcdn.com/w80/ar.png",
        "conf": "CONMEBOL",
        "qualified": true,
        "rank": 1
    },
    {
        "id": "br",
        "name": "巴西",
        "nameEn": "Brazil",
        "flag": "https://flagcdn.com/w80/br.png",
        "conf": "CONMEBOL",
        "qualified": true,
        "rank": 5
    },
    {
        "id": "uy",
        "name": "乌拉圭",
        "nameEn": "Uruguay",
        "flag": "https://flagcdn.com/w80/uy.png",
        "conf": "CONMEBOL",
        "qualified": true,
        "rank": 11
    },
    {
        "id": "py",
        "name": "巴拉圭",
        "nameEn": "Paraguay",
        "flag": "https://flagcdn.com/w80/py.png",
        "conf": "CONMEBOL",
        "qualified": true,
        "rank": null
    },
    {
        "id": "co",
        "name": "哥伦比亚",
        "nameEn": "Colombia",
        "flag": "https://flagcdn.com/w80/co.png",
        "conf": "CONMEBOL",
        "qualified": true,
        "rank": null
    },
    {
        "id": "ec",
        "name": "厄瓜多尔",
        "nameEn": "Ecuador",
        "flag": "https://flagcdn.com/w80/ec.png",
        "conf": "CONMEBOL",
        "qualified": true,
        "rank": null
    },
    {
        "id": "jp",
        "name": "日本",
        "nameEn": "Japan",
        "flag": "https://flagcdn.com/w80/jp.png",
        "conf": "AFC",
        "qualified": true,
        "rank": 15
    },
    {
        "id": "ir",
        "name": "伊朗",
        "nameEn": "Iran",
        "flag": "https://flagcdn.com/w80/ir.png",
        "conf": "AFC",
        "qualified": true,
        "rank": 20
    },
    {
        "id": "kr",
        "name": "韩国",
        "nameEn": "South Korea",
        "flag": "https://flagcdn.com/w80/kr.png",
        "conf": "AFC",
        "qualified": true,
        "rank": 23
    },
    {
        "id": "uz",
        "name": "乌兹别克斯坦",
        "nameEn": "Uzbekistan",
        "flag": "https://flagcdn.com/w80/uz.png",
        "conf": "AFC",
        "qualified": true,
        "rank": null
    },
    {
        "id": "fr",
        "name": "法国",
        "nameEn": "France",
        "flag": "https://flagcdn.com/w80/fr.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 2
    },
    {
        "id": "es",
        "name": "西班牙",
        "nameEn": "Spain",
        "flag": "https://flagcdn.com/w80/es.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 3
    },
    {
        "id": "gb-eng",
        "name": "英格兰",
        "nameEn": "England",
        "flag": "https://flagcdn.com/w80/gb-eng.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 4
    },
    {
        "id": "pt",
        "name": "葡萄牙",
        "nameEn": "Portugal",
        "flag": "https://flagcdn.com/w80/pt.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 7
    },
    {
        "id": "nl",
        "name": "荷兰",
        "nameEn": "Netherlands",
        "flag": "https://flagcdn.com/w80/nl.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 6
    },
    {
        "id": "it",
        "name": "意大利",
        "nameEn": "Italy",
        "flag": "https://flagcdn.com/w80/it.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 9
    },
    {
        "id": "de",
        "name": "德国",
        "nameEn": "Germany",
        "flag": "https://flagcdn.com/w80/de.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 10
    },
    {
        "id": "be",
        "name": "比利时",
        "nameEn": "Belgium",
        "flag": "https://flagcdn.com/w80/be.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 8
    },
    {
        "id": "hr",
        "name": "克罗地亚",
        "nameEn": "Croatia",
        "flag": "https://flagcdn.com/w80/hr.png",
        "conf": "UEFA",
        "qualified": false,
        "rank": 12
    },
    {
        "id": "ch",
        "name": "瑞士",
        "nameEn": "Switzerland",
        "flag": "https://flagcdn.com/w80/ch.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "dk",
        "name": "丹麦",
        "nameEn": "Denmark",
        "flag": "https://flagcdn.com/w80/dk.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "ua",
        "name": "乌克兰",
        "nameEn": "Ukraine",
        "flag": "https://flagcdn.com/w80/ua.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "tr",
        "name": "土耳其",
        "nameEn": "Turkey",
        "flag": "https://flagcdn.com/w80/tr.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "pl",
        "name": "波兰",
        "nameEn": "Poland",
        "flag": "https://flagcdn.com/w80/pl.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "se",
        "name": "瑞典",
        "nameEn": "Sweden",
        "flag": "https://flagcdn.com/w80/se.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "cz",
        "name": "捷克",
        "nameEn": "Czech Republic",
        "flag": "https://flagcdn.com/w80/cz.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "rs",
        "name": "塞尔维亚",
        "nameEn": "Serbia",
        "flag": "https://flagcdn.com/w80/rs.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "hu",
        "name": "匈牙利",
        "nameEn": "Hungary",
        "flag": "https://flagcdn.com/w80/hu.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "no",
        "name": "挪威",
        "nameEn": "Norway",
        "flag": "https://flagcdn.com/w80/no.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "at",
        "name": "奥地利",
        "nameEn": "Austria",
        "flag": "https://flagcdn.com/w80/at.png",
        "conf": "UEFA",
        "qualified": false
    },
    {
        "id": "ma",
        "name": "摩洛哥",
        "nameEn": "Morocco",
        "flag": "https://flagcdn.com/w80/ma.png",
        "conf": "CAF",
        "qualified": false,
        "rank": 14
    },
    {
        "id": "sn",
        "name": "塞内加尔",
        "nameEn": "Senegal",
        "flag": "https://flagcdn.com/w80/sn.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "eg",
        "name": "埃及",
        "nameEn": "Egypt",
        "flag": "https://flagcdn.com/w80/eg.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "ng",
        "name": "尼日利亚",
        "nameEn": "Nigeria",
        "flag": "https://flagcdn.com/w80/ng.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "dz",
        "name": "阿尔及利亚",
        "nameEn": "Algeria",
        "flag": "https://flagcdn.com/w80/dz.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "ci",
        "name": "科特迪瓦",
        "nameEn": "Ivory Coast",
        "flag": "https://flagcdn.com/w80/ci.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "cm",
        "name": "喀麦隆",
        "nameEn": "Cameroon",
        "flag": "https://flagcdn.com/w80/cm.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "gh",
        "name": "加纳",
        "nameEn": "Ghana",
        "flag": "https://flagcdn.com/w80/gh.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "tn",
        "name": "突尼斯",
        "nameEn": "Tunisia",
        "flag": "https://flagcdn.com/w80/tn.png",
        "conf": "CAF",
        "qualified": false
    },
    {
        "id": "au",
        "name": "澳大利亚",
        "nameEn": "Australia",
        "flag": "https://flagcdn.com/w80/au.png",
        "conf": "AFC",
        "qualified": false,
        "rank": 24
    },
    {
        "id": "sa",
        "name": "沙特阿拉伯",
        "nameEn": "Saudi Arabia",
        "flag": "https://flagcdn.com/w80/sa.png",
        "conf": "AFC",
        "qualified": false
    },
    {
        "id": "qa",
        "name": "卡塔尔",
        "nameEn": "Qatar",
        "flag": "https://flagcdn.com/w80/qa.png",
        "conf": "AFC",
        "qualified": false
    },
    {
        "id": "iq",
        "name": "伊拉克",
        "nameEn": "Iraq",
        "flag": "https://flagcdn.com/w80/iq.png",
        "conf": "AFC",
        "qualified": false
    },
    {
        "id": "jo",
        "name": "约旦",
        "nameEn": "Jordan",
        "flag": "https://flagcdn.com/w80/jo.png",
        "conf": "AFC",
        "qualified": false
    },
    {
        "id": "pa",
        "name": "巴拿马",
        "nameEn": "Panama",
        "flag": "https://flagcdn.com/w80/pa.png",
        "conf": "CONCACAF",
        "qualified": false
    },
    {
        "id": "cr",
        "name": "哥斯达黎加",
        "nameEn": "Costa Rica",
        "flag": "https://flagcdn.com/w80/cr.png",
        "conf": "CONCACAF",
        "qualified": false
    },
    {
        "id": "jm",
        "name": "牙买加",
        "nameEn": "Jamaica",
        "flag": "https://flagcdn.com/w80/jm.png",
        "conf": "CONCACAF",
        "qualified": false
    },
    {
        "id": "nz",
        "name": "新西兰",
        "nameEn": "New Zealand",
        "flag": "https://flagcdn.com/w80/nz.png",
        "conf": "OFC",
        "qualified": false
    }
];

// ==================== 赛程数据 ====================
const matchesData = [
    {
        "id": "opening1",
        "date": "2026-06-11",
        "time": "12:00",
        "home": "mx",
        "away": "ng",
        "homeScore": null,
        "awayScore": null,
        "status": "upcoming",
        "group": "A组",
        "stage": "group",
        "stadium": "阿兹特克体育场, 墨西哥城",
        "important": true,
        "note": "墨西哥揭幕战"
    },
    {
        "id": "opening2",
        "date": "2026-06-11",
        "time": "15:00",
        "home": "ca",
        "away": "dz",
        "homeScore": null,
        "awayScore": null,
        "status": "upcoming",
        "group": "B组",
        "stage": "group",
        "stadium": "BC Place, 温哥华",
        "important": true,
        "note": "加拿大揭幕战"
    },
    {
        "id": "opening3",
        "date": "2026-06-11",
        "time": "19:00",
        "home": "us",
        "away": "jm",
        "homeScore": null,
        "awayScore": null,
        "status": "upcoming",
        "group": "C组",
        "stage": "group",
        "stadium": "SoFi体育场, 洛杉矶",
        "important": true,
        "note": "美国揭幕战"
    }
];

// ==================== 小组积分榜 ====================
// 根据球队分组生成初始积分榜
const groupStandings = {
    'A': [
        { team: 'mx', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'ng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'de', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'jp', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'B': [
        { team: 'ca', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'dz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'it', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'ir', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'C': [
        { team: 'us', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'jm', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'gb-eng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'sa', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'D': [
        { team: 'ar', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'eg', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'fr', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'uz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'E': [
        { team: 'br', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'qa', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'hr', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'ch', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'F': [
        { team: 'ma', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'pt', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'nl', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'be', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'G': [
        { team: 'es', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'dz', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'it', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'ec', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'H': [
        { team: 'uy', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'kr', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'gb-eng', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
        { team: 'tn', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
    ],
    'I': [], 'J': [], 'K': [], 'L': []
};

// ==================== 总积分榜 ====================
const overallStandings = [
    { rank: 1, team: 'ar', name: '阿根廷', group: 'D', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 2, team: 'fr', name: '法国', group: 'D', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 3, team: 'es', name: '西班牙', group: 'G', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 4, team: 'gb-eng', name: '英格兰', group: 'C', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 5, team: 'br', name: '巴西', group: 'E', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 6, team: 'nl', name: '荷兰', group: 'F', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 7, team: 'pt', name: '葡萄牙', group: 'F', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 8, team: 'be', name: '比利时', group: 'F', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 9, team: 'it', name: '意大利', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 10, team: 'de', name: '德国', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 11, team: 'uy', name: '乌拉圭', group: 'H', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 12, team: 'hr', name: '克罗地亚', group: 'E', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 13, team: 'ma', name: '摩洛哥', group: 'F', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 14, team: 'jp', name: '日本', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 15, team: 'us', name: '美国', group: 'C', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 16, team: 'mx', name: '墨西哥', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
];

// ==================== 比赛详情 ====================
const matchDetails = {};

// ==================== 音乐播放列表 ====================
const musicPlaylist = [
    { id: 1, title: 'The Cup of Life', artist: 'Ricky Martin', year: '1998 法国世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/9/98/Ricky_Martin_The_Cup_of_Life.jpg', url: '' },
    { id: 2, title: 'Waka Waka', artist: 'Shakira', year: '2010 南非世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/7/79/Shakira_Waka_Waka.jpg', url: '' },
    { id: 3, title: 'We Are One', artist: 'Pitbull ft. Jennifer Lopez', year: '2014 巴西世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/9/96/Pitbull_We_Are_One.jpg', url: '' },
    { id: 4, title: 'Live It Up', artist: 'Nicky Jam', year: '2018 俄罗斯世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Nicky_Jam_Live_It_Up.jpg', url: '' },
    { id: 5, title: 'Hayya Hayya', artist: 'Trinidad Cardona', year: '2022 卡塔尔世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Hayya_Hayya_single_cover.jpg', url: '' }
];

// ==================== 辅助函数 ====================
function getTeam(id) {
    return teamsData.find(t => t.id === id) || { id, name: id, flag: '' };
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

function getStatusText(status, minute) {
    switch(status) {
        case 'live': return minute + "' 直播中";
        case 'finished': return '已结束';
        default: return '未开始';
    }
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}

function getQualifiedCount() {
    return teamsData.filter(t => t.qualified).length;
}

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        worldCupData,
        teamsData,
        matchesData,
        groupStandings,
        overallStandings,
        matchDetails,
        musicPlaylist,
        getTeam,
        getQualifiedCount
    };
}
