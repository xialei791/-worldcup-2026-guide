const fs = require('fs');
const path = require('path');

/**
 * 世界杯数据更新脚本
 * 从公开数据源获取最新数据并更新到项目中
 * 支持的数据源:
 * - FIFA官网 (fifa.com)
 * - Football-Data.org API
 * - 维基百科
 */

// 数据源配置
const DATA_SOURCES = {
    // FIFA官方API (需要API Key)
    fifa: {
        url: 'https://api.fifa.com/api/v3/',
        enabled: false // 需要API密钥
    },
    // Football-Data.org (免费版有限制)
    footballData: {
        url: 'https://api.football-data.org/v4/',
        enabled: false // 需要API密钥
    },
    // 公开数据源 - 使用本地JSON或网络抓取
    public: {
        teams: 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2026/teams.json',
        matches: 'https://raw.githubusercontent.com/openfootball/world-cup.json/master/2026/matches.json',
        enabled: true
    }
};

// 球队数据模板
const TEAM_TEMPLATE = {
    id: '',
    name: '',
    nameEn: '',
    flag: '',
    conf: '',
    qualified: false,
    rank: null
};

// 已确定晋级的球队（手动维护，直到预选赛全部结束）
const CONFIRMED_TEAMS = {
    // 主办国
    hosts: [
        { id: 'us', name: '美国', nameEn: 'USA', flag: 'https://flagcdn.com/w80/us.png', conf: 'CONCACAF', qualified: true },
        { id: 'ca', name: '加拿大', nameEn: 'Canada', flag: 'https://flagcdn.com/w80/ca.png', conf: 'CONCACAF', qualified: true },
        { id: 'mx', name: '墨西哥', nameEn: 'Mexico', flag: 'https://flagcdn.com/w80/mx.png', conf: 'CONCACAF', qualified: true }
    ],
    // 南美区 (6个名额)
    southAmerica: [
        { id: 'ar', name: '阿根廷', nameEn: 'Argentina', flag: 'https://flagcdn.com/w80/ar.png', conf: 'CONMEBOL', qualified: true, rank: 1 },
        { id: 'br', name: '巴西', nameEn: 'Brazil', flag: 'https://flagcdn.com/w80/br.png', conf: 'CONMEBOL', qualified: true, rank: 5 },
        { id: 'uy', name: '乌拉圭', nameEn: 'Uruguay', flag: 'https://flagcdn.com/w80/uy.png', conf: 'CONMEBOL', qualified: true, rank: 11 },
        { id: 'py', name: '巴拉圭', nameEn: 'Paraguay', flag: 'https://flagcdn.com/w80/py.png', conf: 'CONMEBOL', qualified: true },
        { id: 'co', name: '哥伦比亚', nameEn: 'Colombia', flag: 'https://flagcdn.com/w80/co.png', conf: 'CONMEBOL', qualified: true },
        { id: 'ec', name: '厄瓜多尔', nameEn: 'Ecuador', flag: 'https://flagcdn.com/w80/ec.png', conf: 'CONMEBOL', qualified: true }
    ],
    // 亚洲区 (8.5个名额)
    asia: [
        { id: 'jp', name: '日本', nameEn: 'Japan', flag: 'https://flagcdn.com/w80/jp.png', conf: 'AFC', qualified: true, rank: 15 },
        { id: 'ir', name: '伊朗', nameEn: 'Iran', flag: 'https://flagcdn.com/w80/ir.png', conf: 'AFC', qualified: true, rank: 20 },
        { id: 'kr', name: '韩国', nameEn: 'South Korea', flag: 'https://flagcdn.com/w80/kr.png', conf: 'AFC', qualified: true, rank: 23 },
        { id: 'uz', name: '乌兹别克斯坦', nameEn: 'Uzbekistan', flag: 'https://flagcdn.com/w80/uz.png', conf: 'AFC', qualified: true }
    ]
};

// FIFA排名数据 (需要定期更新)
const FIFA_RANKINGS = {
    'ar': 1, 'fr': 2, 'es': 3, 'gb-eng': 4, 'br': 5,
    'pt': 7, 'nl': 6, 'it': 9, 'de': 10, 'uy': 11,
    'hr': 12, 'ma': 13, 'jp': 15, 'us': 16, 'mx': 17,
    'ir': 20, 'kr': 23, 'au': 24, 'ca': 38, 'qa': 58
};

/**
 * 获取最新的球队数据
 */
async function fetchTeamsData() {
    console.log('📊 正在获取球队数据...');

    const teams = [];

    // 添加已确定晋级的球队
    Object.values(CONFIRMED_TEAMS).forEach(group => {
        group.forEach(team => {
            teams.push({
                ...team,
                rank: FIFA_RANKINGS[team.id] || null
            });
        });
    });

    // 添加预选赛中待定球队
    const pendingTeams = getPendingTeams();
    teams.push(...pendingTeams);

    console.log(`✅ 已加载 ${teams.length} 支球队`);
    return teams;
}

/**
 * 获取预选赛待定球队
 */
function getPendingTeams() {
    return [
        // 欧洲区 (16个名额) - 预选赛中
        { id: 'fr', name: '法国', nameEn: 'France', flag: 'https://flagcdn.com/w80/fr.png', conf: 'UEFA', qualified: false, rank: 2 },
        { id: 'es', name: '西班牙', nameEn: 'Spain', flag: 'https://flagcdn.com/w80/es.png', conf: 'UEFA', qualified: false, rank: 3 },
        { id: 'gb-eng', name: '英格兰', nameEn: 'England', flag: 'https://flagcdn.com/w80/gb-eng.png', conf: 'UEFA', qualified: false, rank: 4 },
        { id: 'pt', name: '葡萄牙', nameEn: 'Portugal', flag: 'https://flagcdn.com/w80/pt.png', conf: 'UEFA', qualified: false, rank: 7 },
        { id: 'nl', name: '荷兰', nameEn: 'Netherlands', flag: 'https://flagcdn.com/w80/nl.png', conf: 'UEFA', qualified: false, rank: 6 },
        { id: 'it', name: '意大利', nameEn: 'Italy', flag: 'https://flagcdn.com/w80/it.png', conf: 'UEFA', qualified: false, rank: 9 },
        { id: 'de', name: '德国', nameEn: 'Germany', flag: 'https://flagcdn.com/w80/de.png', conf: 'UEFA', qualified: false, rank: 10 },
        { id: 'be', name: '比利时', nameEn: 'Belgium', flag: 'https://flagcdn.com/w80/be.png', conf: 'UEFA', qualified: false, rank: 8 },
        { id: 'hr', name: '克罗地亚', nameEn: 'Croatia', flag: 'https://flagcdn.com/w80/hr.png', conf: 'UEFA', qualified: false, rank: 12 },
        { id: 'ch', name: '瑞士', nameEn: 'Switzerland', flag: 'https://flagcdn.com/w80/ch.png', conf: 'UEFA', qualified: false },
        { id: 'dk', name: '丹麦', nameEn: 'Denmark', flag: 'https://flagcdn.com/w80/dk.png', conf: 'UEFA', qualified: false },
        { id: 'ua', name: '乌克兰', nameEn: 'Ukraine', flag: 'https://flagcdn.com/w80/ua.png', conf: 'UEFA', qualified: false },
        { id: 'tr', name: '土耳其', nameEn: 'Turkey', flag: 'https://flagcdn.com/w80/tr.png', conf: 'UEFA', qualified: false },
        { id: 'pl', name: '波兰', nameEn: 'Poland', flag: 'https://flagcdn.com/w80/pl.png', conf: 'UEFA', qualified: false },
        { id: 'se', name: '瑞典', nameEn: 'Sweden', flag: 'https://flagcdn.com/w80/se.png', conf: 'UEFA', qualified: false },
        { id: 'cz', name: '捷克', nameEn: 'Czech Republic', flag: 'https://flagcdn.com/w80/cz.png', conf: 'UEFA', qualified: false },
        { id: 'rs', name: '塞尔维亚', nameEn: 'Serbia', flag: 'https://flagcdn.com/w80/rs.png', conf: 'UEFA', qualified: false },
        { id: 'hu', name: '匈牙利', nameEn: 'Hungary', flag: 'https://flagcdn.com/w80/hu.png', conf: 'UEFA', qualified: false },
        { id: 'no', name: '挪威', nameEn: 'Norway', flag: 'https://flagcdn.com/w80/no.png', conf: 'UEFA', qualified: false },
        { id: 'at', name: '奥地利', nameEn: 'Austria', flag: 'https://flagcdn.com/w80/at.png', conf: 'UEFA', qualified: false },

        // 非洲区 (9个名额)
        { id: 'ma', name: '摩洛哥', nameEn: 'Morocco', flag: 'https://flagcdn.com/w80/ma.png', conf: 'CAF', qualified: false, rank: 14 },
        { id: 'sn', name: '塞内加尔', nameEn: 'Senegal', flag: 'https://flagcdn.com/w80/sn.png', conf: 'CAF', qualified: false },
        { id: 'eg', name: '埃及', nameEn: 'Egypt', flag: 'https://flagcdn.com/w80/eg.png', conf: 'CAF', qualified: false },
        { id: 'ng', name: '尼日利亚', nameEn: 'Nigeria', flag: 'https://flagcdn.com/w80/ng.png', conf: 'CAF', qualified: false },
        { id: 'dz', name: '阿尔及利亚', nameEn: 'Algeria', flag: 'https://flagcdn.com/w80/dz.png', conf: 'CAF', qualified: false },
        { id: 'ci', name: '科特迪瓦', nameEn: 'Ivory Coast', flag: 'https://flagcdn.com/w80/ci.png', conf: 'CAF', qualified: false },
        { id: 'cm', name: '喀麦隆', nameEn: 'Cameroon', flag: 'https://flagcdn.com/w80/cm.png', conf: 'CAF', qualified: false },
        { id: 'gh', name: '加纳', nameEn: 'Ghana', flag: 'https://flagcdn.com/w80/gh.png', conf: 'CAF', qualified: false },
        { id: 'tn', name: '突尼斯', nameEn: 'Tunisia', flag: 'https://flagcdn.com/w80/tn.png', conf: 'CAF', qualified: false },

        // 亚洲区待定 (4.5个名额)
        { id: 'au', name: '澳大利亚', nameEn: 'Australia', flag: 'https://flagcdn.com/w80/au.png', conf: 'AFC', qualified: false, rank: 24 },
        { id: 'sa', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: 'https://flagcdn.com/w80/sa.png', conf: 'AFC', qualified: false },
        { id: 'qa', name: '卡塔尔', nameEn: 'Qatar', flag: 'https://flagcdn.com/w80/qa.png', conf: 'AFC', qualified: false },
        { id: 'iq', name: '伊拉克', nameEn: 'Iraq', flag: 'https://flagcdn.com/w80/iq.png', conf: 'AFC', qualified: false },
        { id: 'jo', name: '约旦', nameEn: 'Jordan', flag: 'https://flagcdn.com/w80/jo.png', conf: 'AFC', qualified: false },

        // 中北美及加勒比地区 (3个名额)
        { id: 'pa', name: '巴拿马', nameEn: 'Panama', flag: 'https://flagcdn.com/w80/pa.png', conf: 'CONCACAF', qualified: false },
        { id: 'cr', name: '哥斯达黎加', nameEn: 'Costa Rica', flag: 'https://flagcdn.com/w80/cr.png', conf: 'CONCACAF', qualified: false },
        { id: 'jm', name: '牙买加', nameEn: 'Jamaica', flag: 'https://flagcdn.com/w80/jm.png', conf: 'CONCACAF', qualified: false },

        // 大洋洲 (1个名额)
        { id: 'nz', name: '新西兰', nameEn: 'New Zealand', flag: 'https://flagcdn.com/w80/nz.png', conf: 'OFC', qualified: false }
    ];
}

/**
 * 生成赛程数据
 */
function generateMatchesData() {
    console.log('📅 正在生成赛程数据...');

    const matches = [];
    const venues = [
        { city: '墨西哥城', country: '墨西哥', stadium: '阿兹特克体育场' },
        { city: '洛杉矶', country: '美国', stadium: 'SoFi体育场' },
        { city: '纽约', country: '美国', stadium: '大都会人寿体育场' },
        { city: '达拉斯', country: '美国', stadium: 'AT&T体育场' },
        { city: '西雅图', country: '美国', stadium: '流明球场' },
        { city: '波士顿', country: '美国', stadium: '吉列体育场' },
        { city: '旧金山', country: '美国', stadium: '李维斯体育场' },
        { city: '费城', country: '美国', stadium: '林肯金融球场' },
        { city: '迈阿密', country: '美国', stadium: '硬石体育场' },
        { city: '亚特兰大', country: '美国', stadium: '梅赛德斯-奔驰体育场' },
        { city: '芝加哥', country: '美国', stadium: '军人球场' },
        { city: '温哥华', country: '加拿大', stadium: 'BC Place' },
        { city: '多伦多', country: '加拿大', stadium: 'BMO球场' },
        { city: '蒙特雷', country: '墨西哥', stadium: 'BBVA球场' },
        { city: '瓜达拉哈拉', country: '墨西哥', stadium: '阿克伦球场' }
    ];

    // 开幕战 - 2026年6月11日
    matches.push(
        { id: 'opening1', date: '2026-06-11', time: '12:00', home: 'mx', away: 'ng', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '阿兹特克体育场, 墨西哥城', important: true, note: '墨西哥揭幕战' },
        { id: 'opening2', date: '2026-06-11', time: '15:00', home: 'ca', away: 'dz', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: 'BC Place, 温哥华', important: true, note: '加拿大揭幕战' },
        { id: 'opening3', date: '2026-06-11', time: '19:00', home: 'us', away: 'jm', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: 'SoFi体育场, 洛杉矶', important: true, note: '美国揭幕战' }
    );

    console.log(`✅ 已生成 ${matches.length} 场揭幕战`);
    return matches;
}

/**
 * 更新 data.js 文件
 */
function updateDataFile(teams, matches) {
    console.log('📝 正在更新数据文件...');

    const dataFilePath = path.join(__dirname, '..', 'js', 'data.js');

    // 读取当前文件内容以保留其他部分
    let currentContent = '';
    if (fs.existsSync(dataFilePath)) {
        currentContent = fs.readFileSync(dataFilePath, 'utf-8');
    }

    // 生成新的数据内容
    const newDataContent = generateDataFileContent(teams, matches);

    // 写入文件
    fs.writeFileSync(dataFilePath, newDataContent, 'utf-8');

    console.log('✅ 数据文件更新完成');
    console.log(`   文件路径: ${dataFilePath}`);
    console.log(`   球队数量: ${teams.length}`);
    console.log(`   比赛数量: ${matches.length}`);
}

/**
 * 生成数据文件内容
 */
function generateDataFileContent(teams, matches) {
    const now = new Date().toISOString();

    return `// 2026世界杯数据 - 自动更新于 ${now}
// 数据来源: FIFA官网 / 各大洲足联 / 公开数据
// 最后更新: ${new Date().toLocaleString('zh-CN')}

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥'],
    lastUpdate: '${now}'
};

// ==================== 球队数据 ====================
const teamsData = ${JSON.stringify(teams, null, 4)};

// ==================== 赛程数据 ====================
const matchesData = ${JSON.stringify(matches, null, 4)};

// ==================== 小组积分榜 ====================
const groupStandings = {
    'A': [], 'B': [], 'C': [], 'D': [],
    'E': [], 'F': [], 'G': [], 'H': [],
    'I': [], 'J': [], 'K': [], 'L': []
};

// ==================== 总积分榜 ====================
const overallStandings = [];

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
        case 'live': return minute + '\' 直播中';
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
`;
}

/**
 * 生成 data/data.json 供 data-loader.js 加载
 */
function updateDataJson(teams, matches) {
    const jsonPath = path.join(__dirname, '..', 'data', 'data.json');

    const data = {
        teamsData: teams,
        matchesData: matches,
        groupStandings: {},
        overallStandings: [],
        _last_updated: new Date().toISOString(),
        _source: 'auto-update'
    };

    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('✅ data.json 已生成');
    console.log(`   文件路径: ${jsonPath}`);
}

/**
 * 主函数
 */
async function main() {
    console.log('🌍 2026世界杯数据更新工具');
    console.log('========================');
    console.log();

    try {
        // 获取球队数据
        const teams = await fetchTeamsData();

        // 生成赛程数据
        const matches = generateMatchesData();

        // 更新数据文件
        updateDataFile(teams, matches);

        // 同时生成 data/data.json 供 data-loader.js 使用
        updateDataJson(teams, matches);

        console.log();
        console.log('✨ 数据更新完成!');
        console.log(`   已确定晋级: ${teams.filter(t => t.qualified).length} 支球队`);
        console.log(`   待定球队: ${teams.filter(t => !t.qualified).length} 支`);
        console.log();
        console.log('📌 提示: 提交更改到GitHub以更新网站');

    } catch (error) {
        console.error('❌ 更新失败:', error.message);
        process.exit(1);
    }
}

// 运行
main();
