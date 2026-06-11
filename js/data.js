// 2026世界杯数据 - 来源: 2026-world-cup-predictor-main 项目
// Elo评分数据来自 elo_cache_2026.json
// 赛程数据来自 match_cache.json

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-19',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥']
};

// 球队名称映射 (英文 -> 中文)
const teamNameMap = {
    'Argentina': '阿根廷',
    'Brazil': '巴西',
    'France': '法国',
    'Germany': '德国',
    'Spain': '西班牙',
    'England': '英格兰',
    'Portugal': '葡萄牙',
    'Netherlands': '荷兰',
    'Italy': '意大利',
    'Belgium': '比利时',
    'Croatia': '克罗地亚',
    'Uruguay': '乌拉圭',
    'Mexico': '墨西哥',
    'USA': '美国',
    'United States': '美国',
    'Canada': '加拿大',
    'Japan': '日本',
    'South Korea': '韩国',
    'Korea Republic': '韩国',
    'Iran': '伊朗',
    'Saudi Arabia': '沙特阿拉伯',
    'Australia': '澳大利亚',
    'Morocco': '摩洛哥',
    'Senegal': '塞内加尔',
    'Cameroon': '喀麦隆',
    'Ghana': '加纳',
    'Algeria': '阿尔及利亚',
    'Norway': '挪威',
    'Switzerland': '瑞士',
    'Scotland': '苏格兰',
    'Austria': '奥地利',
    'Bosnia and Herzegovina': '波黑',
    'Sweden': '瑞典',
    'Turkey': '土耳其',
    'Czech Republic': '捷克',
    'Colombia': '哥伦比亚',
    'Ecuador': '厄瓜多尔',
    'Paraguay': '巴拉圭',
    'Panama': '巴拿马',
    'Curaçao': '库拉索',
    'Haiti': '海地',
    'Qatar': '卡塔尔',
    'Jordan': '约旦',
    'Uzbekistan': '乌兹别克斯坦',
    'Cape Verde': '佛得角',
    'Tunisia': '突尼斯',
    'New Zealand': '新西兰',
    'DR Congo': '刚果民主共和国',
    'Iraq': '伊拉克',
    'South Africa': '南非',
    'Denmark': '丹麦',
    'Poland': '波兰',
    'Ukraine': '乌克兰',
    'Romania': '罗马尼亚',
    'Serbia': '塞尔维亚',
    'Greece': '希腊',
    'Wales': '威尔士',
    'Hungary': '匈牙利',
    'Slovenia': '斯洛文尼亚',
    'Slovakia': '斯洛伐克',
    'Finland': '芬兰',
    'Ireland': '爱尔兰',
    'Northern Ireland': '北爱尔兰',
    'Iceland': '冰岛',
    'Israel': '以色列',
    'Russia': '俄罗斯',
    'Bolivia': '玻利维亚',
    'Chile': '智利',
    'Peru': '秘鲁',
    'Venezuela': '委内瑞拉',
    'Jamaica': '牙买加',
    'Costa Rica': '哥斯达黎加',
    'Honduras': '洪都拉斯',
    'Guatemala': '危地马拉',
    'El Salvador': '萨尔瓦多',
    'Cuba': '古巴',
    'Dominican Republic': '多米尼加共和国',
    'Trinidad and Tobago': '特立尼达和多巴哥',
    'Nigeria': '尼日利亚',
    'Egypt': '埃及',
    'Ivory Coast': '科特迪瓦',
    'Mali': '马里',
    'Burkina Faso': '布基纳法索',
    'Guinea': '几内亚',
    'Zambia': '赞比亚',
    'Zimbabwe': '津巴布韦',
    'Kenya': '肯尼亚',
    'Tanzania': '坦桑尼亚',
    'Uganda': '乌干达',
    'Angola': '安哥拉',
    'Madagascar': '马达加斯加',
    'Mauritania': '毛里塔尼亚',
    'Libya': '利比亚',
    'Sudan': '苏丹',
    'Ethiopia': '埃塞俄比亚',
    'Gabon': '加蓬',
    'Congo': '刚果',
    'Central African Republic': '中非共和国',
    'Chad': '乍得',
    'Niger': '尼日尔',
    'Benin': '贝宁',
    'Togo': '多哥',
    'Liberia': '利比里亚',
    'Sierra Leone': '塞拉利昂',
    'Guinea-Bissau': '几内亚比绍',
    'Gambia': '冈比亚',
    'Malawi': '马拉维',
    'Botswana': '博茨瓦纳',
    'Namibia': '纳米比亚',
    'Mozambique': '莫桑比克',
    'Lesotho': '莱索托',
    'Eswatini': '斯威士兰',
    'Comoros': '科摩罗',
    'Seychelles': '塞舌尔',
    'Mauritius': '毛里求斯',
    'China': '中国',
    'Thailand': '泰国',
    'Vietnam': '越南',
    'Malaysia': '马来西亚',
    'Indonesia': '印度尼西亚',
    'Philippines': '菲律宾',
    'Singapore': '新加坡',
    'Myanmar': '缅甸',
    'Cambodia': '柬埔寨',
    'Laos': '老挝',
    'Brunei': '文莱',
    'Timor-Leste': '东帝汶',
    'India': '印度',
    'Syria': '叙利亚',
    'Lebanon': '黎巴嫩',
    'Palestine': '巴勒斯坦',
    'Kuwait': '科威特',
    'Bahrain': '巴林',
    'UAE': '阿联酋',
    'Oman': '阿曼',
    'Yemen': '也门',
    'Turkmenistan': '土库曼斯坦',
    'Kyrgyzstan': '吉尔吉斯斯坦',
    'Tajikistan': '塔吉克斯坦',
    'Afghanistan': '阿富汗',
    'Mongolia': '蒙古',
    'Chinese Taipei': '中国台北',
    'Hong Kong': '中国香港',
    'Macau': '中国澳门',
    'North Korea': '朝鲜',
    'Guam': '关岛',
    'Northern Mariana Islands': '北马里亚纳群岛',
    'Fiji': '斐济',
    'Papua New Guinea': '巴布亚新几内亚',
    'New Caledonia': '新喀里多尼亚',
    'Tahiti': '塔希提',
    'Solomon Islands': '所罗门群岛',
    'Vanuatu': '瓦努阿图',
    'Samoa': '萨摩亚',
    'Tonga': '汤加',
    'Cook Islands': '库克群岛',
    'American Samoa': '美属萨摩亚',
    'Kiribati': '基里巴斯',
    'Tuvalu': '图瓦卢',
    'Nauru': '瑙鲁',
    'Palau': '帕劳',
    'Marshall Islands': '马绍尔群岛',
    'Micronesia': '密克罗尼西亚',
    'Kosovo': '科索沃',
    'Belarus': '白俄罗斯',
    'Estonia': '爱沙尼亚',
    'Latvia': '拉脱维亚',
    'Lithuania': '立陶宛',
    'Moldova': '摩尔多瓦',
    'Kazakhstan': '哈萨克斯坦',
    'Armenia': '亚美尼亚',
    'Azerbaijan': '阿塞拜疆',
    'Georgia': '格鲁吉亚',
    'Albania': '阿尔巴尼亚',
    'North Macedonia': '北马其顿',
    'Montenegro': '黑山',
    'Luxembourg': '卢森堡',
    'Malta': '马耳他',
    'Cyprus': '塞浦路斯',
    'Andorra': '安道尔',
    'San Marino': '圣马力诺',
    'Liechtenstein': '列支敦士登',
    'Faroe Islands': '法罗群岛',
    'Gibraltar': '直布罗陀'
};

// 球队ID映射 (用于国旗URL)
const teamIdMap = {
    '阿根廷': 'ar', '巴西': 'br', '法国': 'fr', '德国': 'de', '西班牙': 'es',
    '英格兰': 'gb-eng', '葡萄牙': 'pt', '荷兰': 'nl', '意大利': 'it', '比利时': 'be',
    '克罗地亚': 'hr', '乌拉圭': 'uy', '墨西哥': 'mx', '美国': 'us', '加拿大': 'ca',
    '日本': 'jp', '韩国': 'kr', '伊朗': 'ir', '沙特阿拉伯': 'sa', '澳大利亚': 'au',
    '摩洛哥': 'ma', '塞内加尔': 'sn', '喀麦隆': 'cm', '加纳': 'gh', '阿尔及利亚': 'dz',
    '挪威': 'no', '瑞士': 'ch', '苏格兰': 'gb-sct', '奥地利': 'at', '波黑': 'ba',
    '瑞典': 'se', '土耳其': 'tr', '捷克': 'cz', '哥伦比亚': 'co', '厄瓜多尔': 'ec',
    '巴拉圭': 'py', '巴拿马': 'pa', '库拉索': 'cw', '海地': 'ht', '卡塔尔': 'qa',
    '约旦': 'jo', '乌兹别克斯坦': 'uz', '佛得角': 'cv', '突尼斯': 'tn', '新西兰': 'nz',
    '刚果民主共和国': 'cd', '伊拉克': 'iq', '南非': 'za', '丹麦': 'dk', '波兰': 'pl',
    '乌克兰': 'ua', '罗马尼亚': 'ro', '塞尔维亚': 'rs', '希腊': 'gr', '威尔士': 'gb-wls',
    '匈牙利': 'hu', '斯洛文尼亚': 'si', '斯洛伐克': 'sk', '芬兰': 'fi', '爱尔兰': 'ie',
    '北爱尔兰': 'gb-nir', '冰岛': 'is', '以色列': 'il', '俄罗斯': 'ru', '玻利维亚': 'bo',
    '智利': 'cl', '秘鲁': 'pe', '委内瑞拉': 've', '牙买加': 'jm', '哥斯达黎加': 'cr',
    '洪都拉斯': 'hn', '危地马拉': 'gt', '萨尔瓦多': 'sv', '古巴': 'cu', '多米尼加共和国': 'do',
    '特立尼达和多巴哥': 'tt', '尼日利亚': 'ng', '埃及': 'eg', '科特迪瓦': 'ci', '马里': 'ml',
    '布基纳法索': 'bf', '几内亚': 'gn', '赞比亚': 'zm', '津巴布韦': 'zw', '肯尼亚': 'ke',
    '坦桑尼亚': 'tz', '乌干达': 'ug', '安哥拉': 'ao', '马达加斯加': 'mg', '毛里塔尼亚': 'mr',
    '利比亚': 'ly', '苏丹': 'sd', '埃塞俄比亚': 'et', '加蓬': 'ga', '刚果': 'cg',
    '中非共和国': 'cf', '乍得': 'td', '尼日尔': 'ne', '贝宁': 'bj', '多哥': 'tg',
    '利比里亚': 'lr', '塞拉利昂': 'sl', '几内亚比绍': 'gw', '冈比亚': 'gm', '马拉维': 'mw',
    '博茨瓦纳': 'bw', '纳米比亚': 'na', '莫桑比克': 'mz', '莱索托': 'ls', '斯威士兰': 'sz',
    '科摩罗': 'km', '塞舌尔': 'sc', '毛里求斯': 'mu', '中国': 'cn', '泰国': 'th',
    '越南': 'vn', '马来西亚': 'my', '印度尼西亚': 'id', '菲律宾': 'ph', '新加坡': 'sg',
    '缅甸': 'mm', '柬埔寨': 'kh', '老挝': 'la', '文莱': 'bn', '东帝汶': 'tl',
    '印度': 'in', '叙利亚': 'sy', '黎巴嫩': 'lb', '巴勒斯坦': 'ps', '科威特': 'kw',
    '巴林': 'bh', '阿联酋': 'ae', '阿曼': 'om', '也门': 'ye', '土库曼斯坦': 'tm',
    '吉尔吉斯斯坦': 'kg', '塔吉克斯坦': 'tj', '阿富汗': 'af', '蒙古': 'mn', '中国台北': 'tw',
    '中国香港': 'hk', '中国澳门': 'mo', '朝鲜': 'kp', '关岛': 'gu', '北马里亚纳群岛': 'mp',
    '斐济': 'fj', '巴布亚新几内亚': 'pg', '新喀里多尼亚': 'nc', '塔希提': 'pf', '所罗门群岛': 'sb',
    '瓦努阿图': 'vu', '萨摩亚': 'ws', '汤加': 'to', '库克群岛': 'ck', '美属萨摩亚': 'as',
    '基里巴斯': 'ki', '图瓦卢': 'tv', '瑙鲁': 'nr', '帕劳': 'pw', '马绍尔群岛': 'mh',
    '密克罗尼西亚': 'fm', '科索沃': 'xk', '白俄罗斯': 'by', '爱沙尼亚': 'ee', '拉脱维亚': 'lv',
    '立陶宛': 'lt', '摩尔多瓦': 'md', '哈萨克斯坦': 'kz', '亚美尼亚': 'am', '阿塞拜疆': 'az',
    '格鲁吉亚': 'ge', '阿尔巴尼亚': 'al', '北马其顿': 'mk', '黑山': 'me', '卢森堡': 'lu',
    '马耳他': 'mt', '塞浦路斯': 'cy', '安道尔': 'ad', '圣马力诺': 'sm', '列支敦士登': 'li',
    '法罗群岛': 'fo', '直布罗陀': 'gi'
};

// Elo评分数据 (来自 elo_cache_2026.json)
const eloRatings = {
    'England': 1834.2, 'France': 1887.4, 'Croatia': 1778.3, 'Norway': 1912.0,
    'Portugal': 1812.5, 'Germany': 1809.3, 'Netherlands': 1798.7, 'Switzerland': 1830.0,
    'Scotland': 1720.0, 'Spain': 1821.6, 'Austria': 1770.0, 'Belgium': 1785.2,
    'Bosnia and Herzegovina': 1640.0, 'Sweden': 1700.0, 'Turkey': 1720.0, 'Czech Republic': 1690.0,
    'Brazil': 1912.7, 'Argentina': 1882.3, 'Colombia': 1810.0, 'Ecuador': 1800.0,
    'Paraguay': 1760.0, 'Uruguay': 1772.1, 'USA': 1702.3, 'Mexico': 1689.4,
    'Canada': 1654.8, 'Panama': 1680.0, 'Curaçao': 1550.0, 'Haiti': 1532.0,
    'Japan': 1678.9, 'South Korea': 1668.2, 'Australia': 1612.6, 'Iran': 1598.7,
    'Saudi Arabia': 1578.4, 'Qatar': 1427.0, 'Jordan': 1600.0, 'Uzbekistan': 1650.0,
    'Algeria': 1615.7, 'Cape Verde': 1549.0, 'Egypt': 1689.0, 'Ghana': 1598.2,
    'Ivory Coast': 1676.0, 'Morocco': 1681.5, 'Senegal': 1675.3, 'South Africa': 1570.0,
    'Tunisia': 1636.0, 'New Zealand': 1585.0, 'DR Congo': 1560.0, 'Iraq': 1560.0
};

// 生成球队数据
const teamsData = Object.entries(eloRatings).map(([name, elo], index) => {
    const chineseName = teamNameMap[name] || name;
    const teamId = teamIdMap[chineseName] || 'un';
    return {
        id: teamId,
        name: chineseName,
        flag: `https://flagcdn.com/w80/${teamId}.png`,
        group: String.fromCharCode(65 + (index % 12)), // A-L 循环分配
        conf: getConfederation(name),
        elo: elo
    };
});

// 获取足联归属
function getConfederation(teamName) {
    const uefa = ['England', 'France', 'Croatia', 'Norway', 'Portugal', 'Germany', 'Netherlands',
                  'Switzerland', 'Scotland', 'Spain', 'Austria', 'Belgium', 'Bosnia and Herzegovina',
                  'Sweden', 'Turkey', 'Czech Republic'];
    const conmebol = ['Brazil', 'Argentina', 'Colombia', 'Ecuador', 'Paraguay', 'Uruguay'];
    const concacaf = ['USA', 'Mexico', 'Canada', 'Panama', 'Curaçao', 'Haiti'];
    const afc = ['Japan', 'South Korea', 'Australia', 'Iran', 'Saudi Arabia', 'Qatar', 'Jordan', 'Uzbekistan'];
    const caf = ['Algeria', 'Cape Verde', 'Egypt', 'Ghana', 'Ivory Coast', 'Morocco', 'Senegal',
                 'South Africa', 'Tunisia', 'DR Congo', 'Iraq'];

    if (uefa.includes(teamName)) return 'UEFA';
    if (conmebol.includes(teamName)) return 'CONMEBOL';
    if (concacaf.includes(teamName)) return 'CONCACAF';
    if (afc.includes(teamName)) return 'AFC';
    if (caf.includes(teamName)) return 'CAF';
    return 'OFC';
}

// 赛程数据 (来自 match_cache.json)
const matchesData = [
    { id: 'h4EoUB7T', date: '2026-06-11', time: '14:00', home: 'mex', away: 'za', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '阿兹特克体育场', important: true },
    { id: 'CGdvIm6K', date: '2026-06-11', time: '21:00', home: 'kr', away: 'cz', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: '洛杉矶索菲体育场', important: true },
    { id: 'OxkQ8qT6', date: '2026-06-12', time: '14:00', home: 'ca', away: 'ba', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: 'BC Place', important: false },
    { id: 'bo9vy2zK', date: '2026-06-12', time: '20:00', home: 'us', away: 'py', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: 'AT&T体育场', important: true },
    { id: 'abc123', date: '2026-06-13', time: '14:00', home: 'qa', away: 'ch', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: '大都会人寿体育场', important: false },
    { id: 'def456', date: '2026-06-13', time: '20:00', home: 'de', away: 'pt', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', stage: 'group', stadium: '硬石体育场', important: true },
    { id: 'ghi789', date: '2026-06-14', time: '14:00', home: 'br', away: 'au', homeScore: null, awayScore: null, status: 'upcoming', group: 'G组', stage: 'group', stadium: '流明球场', important: true },
    { id: 'jkl012', date: '2026-06-14', time: '20:00', home: 'fr', away: 'ar', homeScore: null, awayScore: null, status: 'upcoming', group: 'H组', stage: 'group', stadium: '吉列体育场', important: true },
    { id: 'mno345', date: '2026-06-15', time: '14:00', home: 'gb-eng', away: 'es', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '林肯金融球场', important: true },
    { id: 'pqr678', date: '2026-06-15', time: '20:00', home: 'nl', away: 'it', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: '梅赛德斯-奔驰体育场', important: true },
    { id: 'stu901', date: '2026-06-16', time: '14:00', home: 'jp', away: 'ir', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: '李维斯体育场', important: false },
    { id: 'vwx234', date: '2026-06-16', time: '20:00', home: 'sa', away: 'ma', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: 'SoFi体育场', important: false },
    { id: 'yza567', date: '2026-06-17', time: '14:00', home: 'hr', away: 'be', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: ' soldier Field', important: true },
    { id: 'bcd890', date: '2026-06-17', time: '20:00', home: 'pt', away: 'nl', homeScore: null, awayScore: null, status: 'upcoming', group: 'F组', stage: 'group', stadium: 'AT&T体育场', important: true },
    { id: 'efg123', date: '2026-06-18', time: '14:00', home: 'ch', away: 'hr', homeScore: null, awayScore: null, status: 'upcoming', group: 'G组', stage: 'group', stadium: 'BC Place', important: false },
    { id: 'hij456', date: '2026-06-18', time: '20:00', home: 'ar', away: 'br', homeScore: null, awayScore: null, status: 'upcoming', group: 'H组', stage: 'group', stadium: '阿兹特克体育场', important: true },
    { id: 'klm789', date: '2026-06-19', time: '14:00', home: 'de', away: 'fr', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '洛杉矶索菲体育场', important: true }
];

// 更新比赛数据中的球队ID映射
const teamNameToId = {};
Object.entries(teamNameMap).forEach(([en, cn]) => {
    const id = teamIdMap[cn];
    if (id) {
        teamNameToId[en.toLowerCase().replace(/\s+/g, '')] = id;
        teamNameToId[cn] = id;
    }
});

// 手动添加一些映射
teamNameToId['mexico'] = 'mx';
teamNameToId['southafrica'] = 'za';
teamNameToId['south africa'] = 'za';
teamNameToId['korearepublic'] = 'kr';
teamNameToId['korea republic'] = 'kr';
teamNameToId['czechrepublic'] = 'cz';
teamNameToId['czech republic'] = 'cz';
teamNameToId['canada'] = 'ca';
teamNameToId['bosniaandherzegovina'] = 'ba';
teamNameToId['bosnia and herzegovina'] = 'ba';
teamNameToId['unitedstates'] = 'us';
teamNameToId['united states'] = 'us';
teamNameToId['paraguay'] = 'py';
teamNameToId['qatar'] = 'qa';
teamNameToId['switzerland'] = 'ch';
teamNameToId['germany'] = 'de';
teamNameToId['portugal'] = 'pt';
teamNameToId['brazil'] = 'br';
teamNameToId['australia'] = 'au';
teamNameToId['france'] = 'fr';
teamNameToId['argentina'] = 'ar';
teamNameToId['england'] = 'gb-eng';
teamNameToId['spain'] = 'es';
teamNameToId['netherlands'] = 'nl';
teamNameToId['italy'] = 'it';
teamNameToId['japan'] = 'jp';
teamNameToId['iran'] = 'ir';
teamNameToId['saudiarabia'] = 'sa';
teamNameToId['saudi arabia'] = 'sa';
teamNameToId['morocco'] = 'ma';
teamNameToId['croatia'] = 'hr';
teamNameToId['belgium'] = 'be';

// 小组积分榜数据 (初始化为空)
const groupStandings = {
    'A': [], 'B': [], 'C': [], 'D': [],
    'E': [], 'F': [], 'G': [], 'H': []
};

// 基于Elo评分生成总积分榜
const overallStandings = Object.entries(eloRatings)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 16)
    .map(([name, elo], index) => {
        const chineseName = teamNameMap[name] || name;
        const teamId = teamIdMap[chineseName] || 'un';
        return {
            rank: index + 1,
            team: teamId,
            name: chineseName,
            group: String.fromCharCode(65 + (index % 8)),
            mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0,
            elo: elo
        };
    });

// 比赛详情数据
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

// 导出数据 (用于Node.js环境)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        worldCupData,
        teamsData,
        matchesData,
        groupStandings,
        overallStandings,
        matchDetails,
        musicPlaylist,
        eloRatings,
        teamNameMap,
        teamIdMap
    };
}
