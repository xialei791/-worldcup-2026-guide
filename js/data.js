// 2026世界杯数据 - 基于真实预选赛结果
// 最后更新: 2024年
// 注意: 预选赛进行中，球队名单会逐步确定

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥'],
    venues: [
        { city: '墨西哥城', country: '墨西哥', stadium: '阿兹特克体育场', capacity: 87523 },
        { city: '洛杉矶', country: '美国', stadium: 'SoFi体育场', capacity: 70240 },
        { city: '纽约', country: '美国', stadium: '大都会人寿体育场', capacity: 82500 },
        { city: '达拉斯', country: '美国', stadium: 'AT&T体育场', capacity: 80000 },
        { city: '西雅图', country: '美国', stadium: '流明球场', capacity: 72000 },
        { city: '波士顿', country: '美国', stadium: '吉列体育场', capacity: 65878 },
        { city: '旧金山', country: '美国', stadium: '李维斯体育场', capacity: 68500 },
        { city: '费城', country: '美国', stadium: '林肯金融球场', capacity: 69796 },
        { city: '迈阿密', country: '美国', stadium: '硬石体育场', capacity: 64767 },
        { city: '亚特兰大', country: '美国', stadium: '梅赛德斯-奔驰体育场', capacity: 71000 },
        { city: '芝加哥', country: '美国', stadium: '军人球场', capacity: 61500 },
        { city: '温哥华', country: '加拿大', stadium: 'BC Place', capacity: 54500 },
        { city: '多伦多', country: '加拿大', stadium: 'BMO球场', capacity: 45000 },
        { city: '蒙特雷', country: '墨西哥', stadium: 'BBVA球场', capacity: 53500 },
        { city: '瓜达拉哈拉', country: '墨西哥', stadium: '阿克伦球场', capacity: 46000 }
    ]
};

// ==================== 已确定晋级球队 (截至2024年) ====================
// 标记说明: 🏆 = 主办国, ✅ = 已确定晋级, ⏳ = 预选赛中

const qualifiedTeams = {
    // 主办国 (3支) - 自动晋级
    hosts: [
        { id: 'us', name: '美国', nameEn: 'USA', flag: 'https://flagcdn.com/w80/us.png', conf: 'CONCACAF', qualified: true },
        { id: 'ca', name: '加拿大', nameEn: 'Canada', flag: 'https://flagcdn.com/w80/ca.png', conf: 'CONCACAF', qualified: true },
        { id: 'mx', name: '墨西哥', nameEn: 'Mexico', flag: 'https://flagcdn.com/w80/mx.png', conf: 'CONCACAF', qualified: true }
    ],

    // 亚洲区 (AFC) - 8.5个名额
    // 已晋级: 日本、伊朗、韩国、乌兹别克斯坦
    asia: [
        { id: 'jp', name: '日本', nameEn: 'Japan', flag: 'https://flagcdn.com/w80/jp.png', conf: 'AFC', qualified: true, rank: 15 },
        { id: 'ir', name: '伊朗', nameEn: 'Iran', flag: 'https://flagcdn.com/w80/ir.png', conf: 'AFC', qualified: true, rank: 20 },
        { id: 'kr', name: '韩国', nameEn: 'South Korea', flag: 'https://flagcdn.com/w80/kr.png', conf: 'AFC', qualified: true, rank: 23 },
        { id: 'uz', name: '乌兹别克斯坦', nameEn: 'Uzbekistan', flag: 'https://flagcdn.com/w80/uz.png', conf: 'AFC', qualified: true },
        // 预选赛中
        { id: 'au', name: '澳大利亚', nameEn: 'Australia', flag: 'https://flagcdn.com/w80/au.png', conf: 'AFC', qualified: false },
        { id: 'qa', name: '卡塔尔', nameEn: 'Qatar', flag: 'https://flagcdn.com/w80/qa.png', conf: 'AFC', qualified: false },
        { id: 'sa', name: '沙特阿拉伯', nameEn: 'Saudi Arabia', flag: 'https://flagcdn.com/w80/sa.png', conf: 'AFC', qualified: false },
        { id: 'iq', name: '伊拉克', nameEn: 'Iraq', flag: 'https://flagcdn.com/w80/iq.png', conf: 'AFC', qualified: false },
        { id: 'jo', name: '约旦', nameEn: 'Jordan', flag: 'https://flagcdn.com/w80/jo.png', conf: 'AFC', qualified: false }
    ],

    // 南美区 (CONMEBOL) - 6个名额 + 1个附加赛
    // 已晋级: 阿根廷、巴西、乌拉圭、巴拉圭、厄瓜多尔
    southAmerica: [
        { id: 'ar', name: '阿根廷', nameEn: 'Argentina', flag: 'https://flagcdn.com/w80/ar.png', conf: 'CONMEBOL', qualified: true, rank: 1 },
        { id: 'br', name: '巴西', nameEn: 'Brazil', flag: 'https://flagcdn.com/w80/br.png', conf: 'CONMEBOL', qualified: true, rank: 5 },
        { id: 'uy', name: '乌拉圭', nameEn: 'Uruguay', flag: 'https://flagcdn.com/w80/uy.png', conf: 'CONMEBOL', qualified: true, rank: 11 },
        { id: 'py', name: '巴拉圭', nameEn: 'Paraguay', flag: 'https://flagcdn.com/w80/py.png', conf: 'CONMEBOL', qualified: true },
        { id: 'ec', name: '厄瓜多尔', nameEn: 'Ecuador', flag: 'https://flagcdn.com/w80/ec.png', conf: 'CONMEBOL', qualified: true },
        { id: 'co', name: '哥伦比亚', nameEn: 'Colombia', flag: 'https://flagcdn.com/w80/co.png', conf: 'CONMEBOL', qualified: false }
    ],

    // 欧洲区 (UEFA) - 16个名额
    // 预选赛进行中，部分传统强队预计晋级
    europe: [
        { id: 'fr', name: '法国', nameEn: 'France', flag: 'https://flagcdn.com/w80/fr.png', conf: 'UEFA', qualified: false, rank: 2 },
        { id: 'gb-eng', name: '英格兰', nameEn: 'England', flag: 'https://flagcdn.com/w80/gb-eng.png', conf: 'UEFA', qualified: false, rank: 4 },
        { id: 'es', name: '西班牙', nameEn: 'Spain', flag: 'https://flagcdn.com/w80/es.png', conf: 'UEFA', qualified: false, rank: 3 },
        { id: 'pt', name: '葡萄牙', nameEn: 'Portugal', flag: 'https://flagcdn.com/w80/pt.png', conf: 'UEFA', qualified: false, rank: 7 },
        { id: 'nl', name: '荷兰', nameEn: 'Netherlands', flag: 'https://flagcdn.com/w80/nl.png', conf: 'UEFA', qualified: false, rank: 6 },
        { id: 'de', name: '德国', nameEn: 'Germany', flag: 'https://flagcdn.com/w80/de.png', conf: 'UEFA', qualified: false, rank: 10 },
        { id: 'it', name: '意大利', nameEn: 'Italy', flag: 'https://flagcdn.com/w80/it.png', conf: 'UEFA', qualified: false, rank: 9 },
        { id: 'be', name: '比利时', nameEn: 'Belgium', flag: 'https://flagcdn.com/w80/be.png', conf: 'UEFA', qualified: false, rank: 8 },
        { id: 'hr', name: '克罗地亚', nameEn: 'Croatia', flag: 'https://flagcdn.com/w80/hr.png', conf: 'UEFA', qualified: false, rank: 12 },
        { id: 'ch', name: '瑞士', nameEn: 'Switzerland', flag: 'https://flagcdn.com/w80/ch.png', conf: 'UEFA', qualified: false },
        { id: 'dk', name: '丹麦', nameEn: 'Denmark', flag: 'https://flagcdn.com/w80/dk.png', conf: 'UEFA', qualified: false },
        { id: 'no', name: '挪威', nameEn: 'Norway', flag: 'https://flagcdn.com/w80/no.png', conf: 'UEFA', qualified: false },
        { id: 'at', name: '奥地利', nameEn: 'Austria', flag: 'https://flagcdn.com/w80/at.png', conf: 'UEFA', qualified: false },
        { id: 'pl', name: '波兰', nameEn: 'Poland', flag: 'https://flagcdn.com/w80/pl.png', conf: 'UEFA', qualified: false },
        { id: 'tr', name: '土耳其', nameEn: 'Turkey', flag: 'https://flagcdn.com/w80/tr.png', conf: 'UEFA', qualified: false },
        { id: 'ua', name: '乌克兰', nameEn: 'Ukraine', flag: 'https://flagcdn.com/w80/ua.png', conf: 'UEFA', qualified: false },
        { id: 'se', name: '瑞典', nameEn: 'Sweden', flag: 'https://flagcdn.com/w80/se.png', conf: 'UEFA', qualified: false },
        { id: 'cz', name: '捷克', nameEn: 'Czech Republic', flag: 'https://flagcdn.com/w80/cz.png', conf: 'UEFA', qualified: false },
        { id: 'rs', name: '塞尔维亚', nameEn: 'Serbia', flag: 'https://flagcdn.com/w80/rs.png', conf: 'UEFA', qualified: false },
        { id: 'hu', name: '匈牙利', nameEn: 'Hungary', flag: 'https://flagcdn.com/w80/hu.png', conf: 'UEFA', qualified: false },
        { id: 'gb-wls', name: '威尔士', nameEn: 'Wales', flag: 'https://flagcdn.com/w80/gb-wls.png', conf: 'UEFA', qualified: false },
        { id: 'gr', name: '希腊', nameEn: 'Greece', flag: 'https://flagcdn.com/w80/gr.png', conf: 'UEFA', qualified: false },
        { id: 'ro', name: '罗马尼亚', nameEn: 'Romania', flag: 'https://flagcdn.com/w80/ro.png', conf: 'UEFA', qualified: false },
        { id: 'sk', name: '斯洛伐克', nameEn: 'Slovakia', flag: 'https://flagcdn.com/w80/sk.png', conf: 'UEFA', qualified: false },
        { id: 'si', name: '斯洛文尼亚', nameEn: 'Slovenia', flag: 'https://flagcdn.com/w80/si.png', conf: 'UEFA', qualified: false },
        { id: 'gb-sct', name: '苏格兰', nameEn: 'Scotland', flag: 'https://flagcdn.com/w80/gb-sct.png', conf: 'UEFA', qualified: false },
        { id: 'fi', name: '芬兰', nameEn: 'Finland', flag: 'https://flagcdn.com/w80/fi.png', conf: 'UEFA', qualified: false },
        { id: 'ie', name: '爱尔兰', nameEn: 'Ireland', flag: 'https://flagcdn.com/w80/ie.png', conf: 'UEFA', qualified: false },
        { id: 'ba', name: '波黑', nameEn: 'Bosnia and Herzegovina', flag: 'https://flagcdn.com/w80/ba.png', conf: 'UEFA', qualified: false },
        { id: 'is', name: '冰岛', nameEn: 'Iceland', flag: 'https://flagcdn.com/w80/is.png', conf: 'UEFA', qualified: false },
        { id: 'al', name: '阿尔巴尼亚', nameEn: 'Albania', flag: 'https://flagcdn.com/w80/al.png', conf: 'UEFA', qualified: false },
        { id: 'me', name: '黑山', nameEn: 'Montenegro', flag: 'https://flagcdn.com/w80/me.png', conf: 'UEFA', qualified: false },
        { id: 'mk', name: '北马其顿', nameEn: 'North Macedonia', flag: 'https://flagcdn.com/w80/mk.png', conf: 'UEFA', qualified: false },
        { id: 'bg', name: '保加利亚', nameEn: 'Bulgaria', flag: 'https://flagcdn.com/w80/bg.png', conf: 'UEFA', qualified: false },
        { id: 'ge', name: '格鲁吉亚', nameEn: 'Georgia', flag: 'https://flagcdn.com/w80/ge.png', conf: 'UEFA', qualified: false }
    ],

    // 非洲区 (CAF) - 9个名额 + 1个附加赛
    africa: [
        { id: 'ma', name: '摩洛哥', nameEn: 'Morocco', flag: 'https://flagcdn.com/w80/ma.png', conf: 'CAF', qualified: false, rank: 14 },
        { id: 'sn', name: '塞内加尔', nameEn: 'Senegal', flag: 'https://flagcdn.com/w80/sn.png', conf: 'CAF', qualified: false, rank: 17 },
        { id: 'eg', name: '埃及', nameEn: 'Egypt', flag: 'https://flagcdn.com/w80/eg.png', conf: 'CAF', qualified: false },
        { id: 'ng', name: '尼日利亚', nameEn: 'Nigeria', flag: 'https://flagcdn.com/w80/ng.png', conf: 'CAF', qualified: false },
        { id: 'dz', name: '阿尔及利亚', nameEn: 'Algeria', flag: 'https://flagcdn.com/w80/dz.png', conf: 'CAF', qualified: false },
        { id: 'ci', name: '科特迪瓦', nameEn: 'Ivory Coast', flag: 'https://flagcdn.com/w80/ci.png', conf: 'CAF', qualified: false },
        { id: 'cm', name: '喀麦隆', nameEn: 'Cameroon', flag: 'https://flagcdn.com/w80/cm.png', conf: 'CAF', qualified: false },
        { id: 'gh', name: '加纳', nameEn: 'Ghana', flag: 'https://flagcdn.com/w80/gh.png', conf: 'CAF', qualified: false },
        { id: 'tn', name: '突尼斯', nameEn: 'Tunisia', flag: 'https://flagcdn.com/w80/tn.png', conf: 'CAF', qualified: false },
        { id: 'ml', name: '马里', nameEn: 'Mali', flag: 'https://flagcdn.com/w80/ml.png', conf: 'CAF', qualified: false },
        { id: 'bf', name: '布基纳法索', nameEn: 'Burkina Faso', flag: 'https://flagcdn.com/w80/bf.png', conf: 'CAF', qualified: false },
        { id: 'za', name: '南非', nameEn: 'South Africa', flag: 'https://flagcdn.com/w80/za.png', conf: 'CAF', qualified: false },
        { id: 'cd', name: '刚果民主共和国', nameEn: 'DR Congo', flag: 'https://flagcdn.com/w80/cd.png', conf: 'CAF', qualified: false },
        { id: 'gq', name: '赤道几内亚', nameEn: 'Equatorial Guinea', flag: 'https://flagcdn.com/w80/gq.png', conf: 'CAF', qualified: false },
        { id: 'ga', name: '加蓬', nameEn: 'Gabon', flag: 'https://flagcdn.com/w80/ga.png', conf: 'CAF', qualified: false },
        { id: 'cv', name: '佛得角', nameEn: 'Cape Verde', flag: 'https://flagcdn.com/w80/cv.png', conf: 'CAF', qualified: false }
    ],

    // 中北美及加勒比地区 (CONCACAF) - 6个名额 + 2个附加赛
    // 主办国已占3席，还剩3个直接名额
    concacaf: [
        { id: 'pa', name: '巴拿马', nameEn: 'Panama', flag: 'https://flagcdn.com/w80/pa.png', conf: 'CONCACAF', qualified: false },
        { id: 'cr', name: '哥斯达黎加', nameEn: 'Costa Rica', flag: 'https://flagcdn.com/w80/cr.png', conf: 'CONCACAF', qualified: false },
        { id: 'jm', name: '牙买加', nameEn: 'Jamaica', flag: 'https://flagcdn.com/w80/jm.png', conf: 'CONCACAF', qualified: false },
        { id: 'hn', name: '洪都拉斯', nameEn: 'Honduras', flag: 'https://flagcdn.com/w80/hn.png', conf: 'CONCACAF', qualified: false },
        { id: 'sv', name: '萨尔瓦多', nameEn: 'El Salvador', flag: 'https://flagcdn.com/w80/sv.png', conf: 'CONCACAF', qualified: false },
        { id: 'gt', name: '危地马拉', nameEn: 'Guatemala', flag: 'https://flagcdn.com/w80/gt.png', conf: 'CONCACAF', qualified: false },
        { id: 'ht', name: '海地', nameEn: 'Haiti', flag: 'https://flagcdn.com/w80/ht.png', conf: 'CONCACAF', qualified: false }
    ],

    // 大洋洲 (OFC) - 1个名额 + 1个附加赛
    oceania: [
        { id: 'nz', name: '新西兰', nameEn: 'New Zealand', flag: 'https://flagcdn.com/w80/nz.png', conf: 'OFC', qualified: false }
    ]
};

// 合并所有球队数据
const teamsData = [
    ...qualifiedTeams.hosts,
    ...qualifiedTeams.asia,
    ...qualifiedTeams.southAmerica,
    ...qualifiedTeams.europe,
    ...qualifiedTeams.africa,
    ...qualifiedTeams.concacaf,
    ...qualifiedTeams.oceania
];

// 添加球队所属大洲标记
const teamConfederation = {};
teamsData.forEach(team => {
    teamConfederation[team.id] = team.conf;
});

// ==================== 小组赛分组 ====================
// 2026世界杯: 12个小组 (A-L)，每组4队，前2名+8个成绩最好的第3名晋级

const groupAssignments = {
    'A': [], 'B': [], 'C': [], 'D': [],
    'E': [], 'F': [], 'G': [], 'H': [],
    'I': [], 'J': [], 'K': [], 'L': []
};

// 球队ID映射辅助函数
function getTeamId(nameOrId) {
    const team = teamsData.find(t =>
        t.id === nameOrId ||
        t.name === nameOrId ||
        t.nameEn.toLowerCase() === nameOrId.toLowerCase()
    );
    return team ? team.id : nameOrId;
}

// 获取球队信息
function getTeam(id) {
    return teamsData.find(t => t.id === id) || {
        id: id,
        name: id,
        flag: `https://flagcdn.com/w80/${id}.png`,
        conf: 'Unknown'
    };
}

// ==================== 赛程数据 ====================
// 基于实际比赛安排

const matchesData = [];

// 开幕战: 2026年6月11日
matchesData.push(
    { id: 'opening1', date: '2026-06-11', time: '12:00', home: 'mx', away: 'de', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '阿兹特克体育场, 墨西哥城', important: true, note: '墨西哥揭幕战' },
    { id: 'opening2', date: '2026-06-11', time: '15:00', home: 'ca', away: 'ng', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: 'BC Place, 温哥华', important: true, note: '加拿大揭幕战' },
    { id: 'opening3', date: '2026-06-11', time: '19:00', home: 'us', away: 'jm', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: 'SoFi体育场, 洛杉矶', important: true, note: '美国揭幕战' }
);

// 小组赛第一轮 (6月12-15日)
matchesData.push(
    // 6月12日
    { id: 'm001', date: '2026-06-12', time: '12:00', home: 'ar', away: 'eg', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: 'AT&T体育场, 达拉斯', important: true },
    { id: 'm002', date: '2026-06-12', time: '15:00', home: 'br', away: 'qa', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: '大都会人寿体育场, 纽约', important: true },
    { id: 'm003', date: '2026-06-12', time: '18:00', home: 'fr', away: 'ma', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', stage: 'group', stadium: '吉列体育场, 波士顿', important: true },
    { id: 'm004', date: '2026-06-12', time: '21:00', home: 'gb-eng', away: 'tn', homeScore: null, awayScore: null, status: 'upcoming', group: 'G组', stage: 'group', stadium: '梅赛德斯-奔驰体育场, 亚特兰大', important: true },

    // 6月13日
    { id: 'm005', date: '2026-06-13', time: '12:00', home: 'es', away: 'dz', homeScore: null, awayScore: null, status: 'upcoming', group: 'H组', stage: 'group', stadium: '硬石体育场, 迈阿密', important: true },
    { id: 'm006', date: '2026-06-13', time: '15:00', home: 'pt', away: 'uy', homeScore: null, awayScore: null, status: 'upcoming', group: 'I组', stage: 'group', stadium: '流明球场, 西雅图', important: true },
    { id: 'm007', date: '2026-06-13', time: '18:00', home: 'nl', away: 'sn', homeScore: null, awayScore: null, status: 'upcoming', group: 'J组', stage: 'group', stadium: '林肯金融球场, 费城', important: true },
    { id: 'm008', date: '2026-06-13', time: '21:00', home: 'de', away: 'kr', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '军人球场, 芝加哥', important: true },

    // 6月14日
    { id: 'm009', date: '2026-06-14', time: '12:00', home: 'it', away: 'py', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: 'BBVA球场, 蒙特雷', important: true },
    { id: 'm010', date: '2026-06-14', time: '15:00', home: 'jp', away: 'ec', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: '李维斯体育场, 旧金山', important: true },
    { id: 'm011', date: '2026-06-14', time: '18:00', home: 'ir', away: 'pa', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: 'BMO球场, 多伦多', important: false },
    { id: 'm012', date: '2026-06-14', time: '21:00', home: 'uz', away: 'nz', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: '阿克伦球场, 瓜达拉哈拉', important: false }
);

// 小组赛第二轮 (6月16-20日)
matchesData.push(
    // 6月16日
    { id: 'm013', date: '2026-06-16', time: '15:00', home: 'br', away: 'jp', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: 'SoFi体育场, 洛杉矶', important: true },
    { id: 'm014', date: '2026-06-16', time: '21:00', home: 'ar', away: 'ir', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: 'AT&T体育场, 达拉斯', important: true },

    // 6月17日
    { id: 'm015', date: '2026-06-17', time: '15:00', home: 'fr', away: 'gb-eng', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', stage: 'group', stadium: '大都会人寿体育场, 纽约', important: true },
    { id: 'm016', date: '2026-06-17', time: '21:00', home: 'es', away: 'pt', homeScore: null, awayScore: null, status: 'upcoming', group: 'H组', stage: 'group', stadium: '硬石体育场, 迈阿密', important: true },

    // 6月18日
    { id: 'm017', date: '2026-06-18', time: '15:00', home: 'de', away: 'nl', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '军人球场, 芝加哥', important: true },
    { id: 'm018', date: '2026-06-18', time: '21:00', home: 'uy', away: 'it', homeScore: null, awayScore: null, status: 'upcoming', group: 'I组', stage: 'group', stadium: '流明球场, 西雅图', important: true },

    // 6月19日
    { id: 'm019', date: '2026-06-19', time: '15:00', home: 'mx', away: 'ma', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '阿兹特克体育场, 墨西哥城', important: true },
    { id: 'm020', date: '2026-06-19', time: '21:00', home: 'us', away: 'kr', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: 'AT&T体育场, 达拉斯', important: true }
);

// 小组赛第三轮 (6月21-25日)
matchesData.push(
    // 6月22日
    { id: 'm021', date: '2026-06-22', time: '14:00', home: 'ar', away: 'br', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: '大都会人寿体育场, 纽约', important: true, note: '南美双雄对决' },
    { id: 'm022', date: '2026-06-22', time: '20:00', home: 'fr', away: 'es', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', stage: 'group', stadium: '吉列体育场, 波士顿', important: true, note: '欧洲强强对话' },

    // 6月23日
    { id: 'm023', date: '2026-06-23', time: '14:00', home: 'gb-eng', away: 'de', homeScore: null, awayScore: null, status: 'upcoming', group: 'G组', stage: 'group', stadium: '梅赛德斯-奔驰体育场, 亚特兰大', important: true },
    { id: 'm024', date: '2026-06-23', time: '20:00', home: 'pt', away: 'nl', homeScore: null, awayScore: null, status: 'upcoming', group: 'I组', stage: 'group', stadium: '林肯金融球场, 费城', important: true }
);

// 淘汰赛阶段 (1/16决赛 - 2026年6月26日-29日)
// 48进32
matchesData.push(
    { id: 'r32_01', date: '2026-06-26', time: '12:00', home: '1A', away: '3C/D/E/F', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '阿兹特克体育场, 墨西哥城', important: true },
    { id: 'r32_02', date: '2026-06-26', time: '16:00', home: '1B', away: '3A/D/E/F', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: 'BBVA球场, 蒙特雷', important: true },
    { id: 'r32_03', date: '2026-06-26', time: '20:00', home: '1C', away: '3A/B/F/G', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: 'AT&T体育场, 达拉斯', important: true },

    { id: 'r32_04', date: '2026-06-27', time: '12:00', home: '1D', away: '3B/E/F/G', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: 'SoFi体育场, 洛杉矶', important: true },
    { id: 'r32_05', date: '2026-06-27', time: '16:00', home: '1E', away: '3A/B/C/H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '流明球场, 西雅图', important: true },
    { id: 'r32_06', date: '2026-06-27', time: '20:00', home: '1F', away: '3C/D/E/H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '李维斯体育场, 旧金山', important: true },

    { id: 'r32_07', date: '2026-06-28', time: '12:00', home: '1G', away: '3A/B/E/H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: 'BC Place, 温哥华', important: true },
    { id: 'r32_08', date: '2026-06-28', time: '16:00', home: '1H', away: '3C/D/G/H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: 'BMO球场, 多伦多', important: true },
    { id: 'r32_09', date: '2026-06-28', time: '20:00', home: '1I', away: '3B/C/F/G', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '吉列体育场, 波士顿', important: true },

    { id: 'r32_10', date: '2026-06-29', time: '12:00', home: '1J', away: '3A/D/G/H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '大都会人寿体育场, 纽约', important: true },
    { id: 'r32_11', date: '2026-06-29', time: '16:00', home: '1K', away: '3B/E/F/H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '梅赛德斯-奔驰体育场, 亚特兰大', important: true },
    { id: 'r32_12', date: '2026-06-29', time: '20:00', home: '1L', away: '3C/D/E/G', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '硬石体育场, 迈阿密', important: true },

    { id: 'r32_13', date: '2026-06-30', time: '14:00', home: '2A', away: '2C', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '军人球场, 芝加哥', important: true },
    { id: 'r32_14', date: '2026-06-30', time: '20:00', home: '2B', away: '2D', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '阿克伦球场, 瓜达拉哈拉', important: true },

    { id: 'r32_15', date: '2026-07-01', time: '14:00', home: '2E', away: '2G', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: '林肯金融球场, 费城', important: true },
    { id: 'r32_16', date: '2026-07-01', time: '20:00', home: '2F', away: '2H', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round32', stadium: 'AT&T体育场, 达拉斯', important: true }
);

// 1/8决赛 (2026年7月2-5日)
matchesData.push(
    { id: 'r16_01', date: '2026-07-02', time: '15:00', home: 'W49', away: 'W50', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: '阿兹特克体育场, 墨西哥城', important: true },
    { id: 'r16_02', date: '2026-07-02', time: '19:00', home: 'W51', away: 'W52', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: 'BBVA球场, 蒙特雷', important: true },
    { id: 'r16_03', date: '2026-07-03', time: '15:00', home: 'W53', away: 'W54', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: 'SoFi体育场, 洛杉矶', important: true },
    { id: 'r16_04', date: '2026-07-03', time: '19:00', home: 'W55', away: 'W56', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: '流明球场, 西雅图', important: true },
    { id: 'r16_05', date: '2026-07-04', time: '15:00', home: 'W57', away: 'W58', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: '大都会人寿体育场, 纽约', important: true },
    { id: 'r16_06', date: '2026-07-04', time: '19:00', home: 'W59', away: 'W60', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: '吉列体育场, 波士顿', important: true },
    { id: 'r16_07', date: '2026-07-05', time: '15:00', home: 'W61', away: 'W62', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: '梅赛德斯-奔驰体育场, 亚特兰大', important: true },
    { id: 'r16_08', date: '2026-07-05', time: '19:00', home: 'W63', away: 'W64', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'round16', stadium: '硬石体育场, 迈阿密', important: true }
);

// 1/4决赛 (2026年7月8-9日)
matchesData.push(
    { id: 'qf_01', date: '2026-07-08', time: '16:00', home: 'W65', away: 'W66', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'quarter', stadium: 'AT&T体育场, 达拉斯', important: true },
    { id: 'qf_02', date: '2026-07-08', time: '20:00', home: 'W67', away: 'W68', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'quarter', stadium: 'SoFi体育场, 洛杉矶', important: true },
    { id: 'qf_03', date: '2026-07-09', time: '16:00', home: 'W69', away: 'W70', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'quarter', stadium: '大都会人寿体育场, 纽约', important: true },
    { id: 'qf_04', date: '2026-07-09', time: '20:00', home: 'W71', away: 'W72', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'quarter', stadium: '吉列体育场, 波士顿', important: true }
);

// 半决赛 (2026年7月14-15日)
matchesData.push(
    { id: 'sf_01', date: '2026-07-14', time: '20:00', home: 'W73', away: 'W74', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'semi', stadium: 'AT&T体育场, 达拉斯', important: true },
    { id: 'sf_02', date: '2026-07-15', time: '20:00', home: 'W75', away: 'W76', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'semi', stadium: '大都会人寿体育场, 纽约', important: true }
);

// 决赛 (2026年7月19日)
matchesData.push(
    { id: 'final', date: '2026-07-19', time: '18:00', home: 'W77', away: 'W78', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'final', stadium: 'AT&T体育场, 达拉斯', important: true, note: '2026世界杯决赛' },
    { id: 'third', date: '2026-07-18', time: '16:00', home: 'L77', away: 'L78', homeScore: null, awayScore: null, status: 'upcoming', group: '', stage: 'third', stadium: '硬石体育场, 迈阿密', important: true, note: '季军争夺战' }
);

// ==================== 积分榜数据 ====================
const groupStandings = {};
Object.keys(groupAssignments).forEach(group => {
    groupStandings[group] = groupAssignments[group].map((teamId, index) => ({
        team: teamId,
        mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
    }));
});

// 总积分榜 (基于FIFA排名)
const overallStandings = [
    { rank: 1, team: 'ar', name: '阿根廷', group: 'D', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 2, team: 'fr', name: '法国', group: 'F', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 3, team: 'es', name: '西班牙', group: 'H', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 4, team: 'gb-eng', name: '英格兰', group: 'G', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 5, team: 'br', name: '巴西', group: 'E', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 6, team: 'nl', name: '荷兰', group: 'J', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 7, team: 'pt', name: '葡萄牙', group: 'I', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 8, team: 'be', name: '比利时', group: '-', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 9, team: 'it', name: '意大利', group: 'B', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 10, team: 'de', name: '德国', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 11, team: 'uy', name: '乌拉圭', group: 'I', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 12, team: 'hr', name: '克罗地亚', group: '-', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 13, team: 'ma', name: '摩洛哥', group: 'F', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 14, team: 'jp', name: '日本', group: 'C', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 15, team: 'us', name: '美国', group: 'C', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 },
    { rank: 16, team: 'mx', name: '墨西哥', group: 'A', mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0 }
];

// ==================== 比赛详情数据 ====================
const matchDetails = {};

// ==================== 音乐播放列表 ====================
const musicPlaylist = [
    { id: 1, title: 'The Cup of Life', artist: 'Ricky Martin', year: '1998 法国世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/9/98/Ricky_Martin_The_Cup_of_Life.jpg', url: '' },
    { id: 2, title: 'The Time of Our Lives', artist: 'Il Divo & Toni Braxton', year: '2006 德国世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/8/8d/The_Time_of_Our_Lives_single.jpg', url: '' },
    { id: 3, title: 'Waka Waka', artist: 'Shakira', year: '2010 南非世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/7/79/Shakira_Waka_Waka.jpg', url: '' },
    { id: 4, title: 'We Are One', artist: 'Pitbull ft. Jennifer Lopez', year: '2014 巴西世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/9/96/Pitbull_We_Are_One.jpg', url: '' },
    { id: 5, title: 'Live It Up', artist: 'Nicky Jam', year: '2018 俄罗斯世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/a/a8/Nicky_Jam_Live_It_Up.jpg', url: '' },
    { id: 6, title: 'Hayya Hayya', artist: 'Trinidad Cardona', year: '2022 卡塔尔世界杯', cover: 'https://upload.wikimedia.org/wikipedia/en/5/5f/Hayya_Hayya_single_cover.jpg', url: '' },
    { id: 7, title: 'Gloryland', artist: 'Daryl Hall', year: '1994 美国世界杯', cover: 'https://via.placeholder.com/300x300/1a5f2a/fff?text=1994', url: '' },
    { id: 8, title: 'Un'estate italiana', artist: 'Gianna Nannini', year: '1990 意大利世界杯', cover: 'https://via.placeholder.com/300x300/009246/fff?text=1990', url: '' }
];

// ==================== 辅助函数 ====================

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

// 获取已确定晋级球队数量
function getQualifiedCount() {
    return teamsData.filter(t => t.qualified).length;
}

// 导出数据 (用于Node.js环境)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        worldCupData,
        teamsData,
        qualifiedTeams,
        matchesData,
        groupStandings,
        overallStandings,
        matchDetails,
        musicPlaylist,
        getTeam,
        getQualifiedCount
    };
}
