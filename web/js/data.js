// 2026世界杯数据 - 基于 mikobinbin 项目数据
// 数据来源：https://github.com/mikobinbin/2026-world-cup-predictor

const worldCupData = {
    startDate: '2026-06-11',
    endDate: '2026-07-20',
    teams: 48,
    matches: 104,
    hostCountries: ['美国', '加拿大', '墨西哥']
};

// 球队数据 - 包含Elo评分（来自 mikobinbin 项目）
const teamsData = [
    { id: 'bra', name: '巴西', flag: 'https://flagcdn.com/w80/br.png', group: 'A', conf: 'CONMEBOL', elo: 1912.7 },
    { id: 'arg', name: '阿根廷', flag: 'https://flagcdn.com/w80/ar.png', group: 'B', conf: 'CONMEBOL', elo: 1882.3 },
    { id: 'fra', name: '法国', flag: 'https://flagcdn.com/w80/fr.png', group: 'C', conf: 'UEFA', elo: 1887.4 },
    { id: 'eng', name: '英格兰', flag: 'https://flagcdn.com/w80/gb-eng.png', group: 'D', conf: 'UEFA', elo: 1834.2 },
    { id: 'esp', name: '西班牙', flag: 'https://flagcdn.com/w80/es.png', group: 'E', conf: 'UEFA', elo: 1821.6 },
    { id: 'por', name: '葡萄牙', flag: 'https://flagcdn.com/w80/pt.png', group: 'F', conf: 'UEFA', elo: 1812.5 },
    { id: 'ger', name: '德国', flag: 'https://flagcdn.com/w80/de.png', group: 'G', conf: 'UEFA', elo: 1809.3 },
    { id: 'ned', name: '荷兰', flag: 'https://flagcdn.com/w80/nl.png', group: 'H', conf: 'UEFA', elo: 1798.7 },
    { id: 'bel', name: '比利时', flag: 'https://flagcdn.com/w80/be.png', group: 'I', conf: 'UEFA', elo: 1785.2 },
    { id: 'cro', name: '克罗地亚', flag: 'https://flagcdn.com/w80/hr.png', group: 'J', conf: 'UEFA', elo: 1778.3 },
    { id: 'sui', name: '瑞士', flag: 'https://flagcdn.com/w80/ch.png', group: 'K', conf: 'UEFA', elo: 1830.0 },
    { id: 'usa', name: '美国', flag: 'https://flagcdn.com/w80/us.png', group: 'L', conf: 'CONCACAF', elo: 1702.3 },
    { id: 'mex', name: '墨西哥', flag: 'https://flagcdn.com/w80/mx.png', group: 'A', conf: 'CONCACAF', elo: 1689.4 },
    { id: 'can', name: '加拿大', flag: 'https://flagcdn.com/w80/ca.png', group: 'B', conf: 'CONCACAF', elo: 1654.8 },
    { id: 'jpn', name: '日本', flag: 'https://flagcdn.com/w80/jp.png', group: 'C', conf: 'AFC', elo: 1678.9 },
    { id: 'kor', name: '韩国', flag: 'https://flagcdn.com/w80/kr.png', group: 'D', conf: 'AFC', elo: 1668.2 },
    { id: 'aus', name: '澳大利亚', flag: 'https://flagcdn.com/w80/au.png', group: 'E', conf: 'AFC', elo: 1612.6 },
    { id: 'irn', name: '伊朗', flag: 'https://flagcdn.com/w80/ir.png', group: 'F', conf: 'AFC', elo: 1598.7 },
    { id: 'mar', name: '摩洛哥', flag: 'https://flagcdn.com/w80/ma.png', group: 'G', conf: 'CAF', elo: 1681.5 },
    { id: 'sen', name: '塞内加尔', flag: 'https://flagcdn.com/w80/sn.png', group: 'H', conf: 'CAF', elo: 1675.3 },
    { id: 'gha', name: '加纳', flag: 'https://flagcdn.com/w80/gh.png', group: 'I', conf: 'CAF', elo: 1598.2 },
    { id: 'civ', name: '科特迪瓦', flag: 'https://flagcdn.com/w80/ci.png', group: 'J', conf: 'CAF', elo: 1676.0 },
    { id: 'tun', name: '突尼斯', flag: 'https://flagcdn.com/w80/tn.png', group: 'K', conf: 'CAF', elo: 1636.0 },
    { id: 'egy', name: '埃及', flag: 'https://flagcdn.com/w80/eg.png', group: 'L', conf: 'CAF', elo: 1689.0 },
    { id: 'uru', name: '乌拉圭', flag: 'https://flagcdn.com/w80/uy.png', group: 'A', conf: 'CONMEBOL', elo: 1772.1 },
    { id: 'col', name: '哥伦比亚', flag: 'https://flagcdn.com/w80/co.png', group: 'B', conf: 'CONMEBOL', elo: 1810.0 },
    { id: 'ecu', name: '厄瓜多尔', flag: 'https://flagcdn.com/w80/ec.png', group: 'C', conf: 'CONMEBOL', elo: 1800.0 },
    { id: 'par', name: '巴拉圭', flag: 'https://flagcdn.com/w80/py.png', group: 'D', conf: 'CONMEBOL', elo: 1760.0 },
    { id: 'aut', name: '奥地利', flag: 'https://flagcdn.com/w80/at.png', group: 'E', conf: 'UEFA', elo: 1770.0 },
    { id: 'tur', name: '土耳其', flag: 'https://flagcdn.com/w80/tr.png', group: 'F', conf: 'UEFA', elo: 1720.0 },
    { id: 'swe', name: '瑞典', flag: 'https://flagcdn.com/w80/se.png', group: 'G', conf: 'UEFA', elo: 1700.0 },
    { id: 'cze', name: '捷克', flag: 'https://flagcdn.com/w80/cz.png', group: 'H', conf: 'UEFA', elo: 1690.0 },
    { id: 'sco', name: '苏格兰', flag: 'https://flagcdn.com/w80/gb-sct.png', group: 'I', conf: 'UEFA', elo: 1720.0 },
    { id: 'bih', name: '波黑', flag: 'https://flagcdn.com/w80/ba.png', group: 'J', conf: 'UEFA', elo: 1640.0 },
    { id: 'nor', name: '挪威', flag: 'https://flagcdn.com/w80/no.png', group: 'K', conf: 'UEFA', elo: 1912.0 },
    { id: 'alg', name: '阿尔及利亚', flag: 'https://flagcdn.com/w80/dz.png', group: 'L', conf: 'CAF', elo: 1615.7 },
    { id: 'qat', name: '卡塔尔', flag: 'https://flagcdn.com/w80/qa.png', group: 'A', conf: 'AFC', elo: 1427.0 },
    { id: 'ksa', name: '沙特阿拉伯', flag: 'https://flagcdn.com/w80/sa.png', group: 'B', conf: 'AFC', elo: 1578.4 },
    { id: 'jor', name: '约旦', flag: 'https://flagcdn.com/w80/jo.png', group: 'C', conf: 'AFC', elo: 1600.0 },
    { id: 'uzb', name: '乌兹别克斯坦', flag: 'https://flagcdn.com/w80/uz.png', group: 'D', conf: 'AFC', elo: 1650.0 },
    { id: 'pan', name: '巴拿马', flag: 'https://flagcdn.com/w80/pa.png', group: 'E', conf: 'CONCACAF', elo: 1680.0 },
    { id: 'cuw', name: '库拉索', flag: 'https://flagcdn.com/w80/cw.png', group: 'F', conf: 'CONCACAF', elo: 1550.0 },
    { id: 'hai', name: '海地', flag: 'https://flagcdn.com/w80/ht.png', group: 'G', conf: 'CONCACAF', elo: 1532.0 },
    { id: 'nzl', name: '新西兰', flag: 'https://flagcdn.com/w80/nz.png', group: 'H', conf: 'OFC', elo: 1585.0 },
    { id: 'rsa', name: '南非', flag: 'https://flagcdn.com/w80/za.png', group: 'I', conf: 'CAF', elo: 1570.0 },
    { id: 'cpv', name: '佛得角', flag: 'https://flagcdn.com/w80/cv.png', group: 'J', conf: 'CAF', elo: 1549.0 },
    { id: 'irq', name: '伊拉克', flag: 'https://flagcdn.com/w80/iq.png', group: 'K', conf: 'AFC', elo: 1560.0 },
    { id: 'cod', name: '刚果(金)', flag: 'https://flagcdn.com/w80/cd.png', group: 'L', conf: 'CAF', elo: 1560.0 }
];

// Elo 评分数据（来自 mikobinbin 项目）
const eloRatings = {
    "巴西": 1912.7, "阿根廷": 1882.3, "法国": 1887.4, "英格兰": 1834.2,
    "西班牙": 1821.6, "葡萄牙": 1812.5, "德国": 1809.3, "荷兰": 1798.7,
    "比利时": 1785.2, "克罗地亚": 1778.3, "瑞士": 1830.0, "奥地利": 1770.0,
    "挪威": 1912.0, "瑞典": 1700.0, "土耳其": 1720.0, "捷克": 1690.0,
    "苏格兰": 1720.0, "波黑": 1640.0, "乌拉圭": 1772.1, "哥伦比亚": 1810.0,
    "厄瓜多尔": 1800.0, "巴拉圭": 1760.0, "墨西哥": 1689.4, "美国": 1702.3,
    "加拿大": 1654.8, "巴拿马": 1680.0, "库拉索": 1550.0, "海地": 1532.0,
    "日本": 1678.9, "韩国": 1668.2, "澳大利亚": 1612.6, "伊朗": 1598.7,
    "沙特阿拉伯": 1578.4, "卡塔尔": 1427.0, "约旦": 1600.0, "乌兹别克斯坦": 1650.0,
    "伊拉克": 1560.0, "阿尔及利亚": 1615.7, "佛得角": 1549.0, "埃及": 1689.0,
    "加纳": 1598.2, "科特迪瓦": 1676.0, "摩洛哥": 1681.5, "塞内加尔": 1675.3,
    "南非": 1570.0, "突尼斯": 1636.0, "新西兰": 1585.0, "刚果(金)": 1560.0
};

// 历史交锋数据（来自 mikobinbin 项目）
const h2hRecords = {
    "阿根廷|巴西": { wA: 41, d: 26, wB: 47, note: "南美经典对决，巴西总体占优" },
    "阿根廷|法国": { wA: 5, d: 3, wB: 4, note: "2022决赛重演，阿根廷点球险胜" },
    "巴西|法国": { wA: 6, d: 4, wB: 8, note: "2006决赛，法国加时胜" },
    "法国|德国": { wA: 13, d: 4, wB: 14, note: "欧洲强强对话，大赛多次相遇" },
    "英格兰|德国": { wA: 13, d: 5, wB: 14, note: "经典大战，英格兰点球3战3败" },
    "英格兰|法国": { wA: 7, d: 7, wB: 17, note: "法国近期大赛占优" },
    "德国|西班牙": { wA: 8, d: 6, wB: 11, note: "传控vs力量，各有胜负" },
    "葡萄牙|西班牙": { wA: 18, d: 8, wB: 11, note: "伊比利亚德比，葡萄牙总胜多" },
    "巴西|德国": { wA: 9, d: 5, wB: 9, note: "2014半决赛1-7成为经典" },
    "阿根廷|德国": { wA: 8, d: 4, wB: 8, note: "3次决赛，2022马拉多纳主场夺冠" },
    "克罗地亚|英格兰": { wA: 2, d: 3, wB: 3, note: "2018世界杯半决赛，克罗地亚加时胜" },
    "乌拉圭|巴西": { wA: 31, d: 18, wB: 27, note: "南美最激烈对决之一" },
    "荷兰|德国": { wA: 14, d: 15, wB: 16, note: "欧洲老牌劲旅对抗" },
    "西班牙|法国": { wA: 16, d: 7, wB: 13, note: "2012欧洲杯决赛，西班牙大胜" },
    "比利时|法国": { wA: 5, d: 4, wB: 9, note: "法国近期杯赛表现更佳" },
    "英格兰|巴西": { wA: 9, d: 5, wB: 13, note: "2002小组赛后未在大赛相遇" },
    "葡萄牙|阿根廷": { wA: 2, d: 1, wB: 4, note: "2014世界杯小组赛，最近一次2018" },
    "墨西哥|美国": { wA: 12, d: 8, wB: 6, note: "中北美经典对决，墨西哥占优" },
    "日本|韩国": { wA: 8, d: 5, wB: 9, note: "东亚德比，韩国略占上风" }
};

// 战术风格标签
const tacticalStyles = {
    "巴西": "桑巴艺术", "阿根廷": "潘帕斯激情", "法国": "欧洲铁军",
    "德国": "德国坦克", "西班牙": "传控足球", "英格兰": "边路传中",
    "葡萄牙": "C罗核心", "荷兰": "全攻全守", "比利时": "黄金一代",
    "日本": "亚洲技术流", "韩国": "跑不死", "墨西哥": "中北美王者",
    "乌拉圭": "南美硬汉", "克罗地亚": "格子军", "瑞士": "中立之师"
};

// 比赛数据 - 基于 mikobinbin 项目的赛程（转换为北京时间 UTC+8）
const matchesData = [
    // 2026年6月11日
    { id: 1, date: '2026-06-12', time: '02:00', home: 'mex', away: 'rsa', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '阿兹特克体育场', city: '墨西哥城', important: true, note: '开幕式+揭幕战' },
    { id: 2, date: '2026-06-12', time: '09:00', home: 'kor', away: 'cze', homeScore: null, awayScore: null, status: 'upcoming', group: 'A组', stage: 'group', stadium: '阿克伦体育场', city: '瓜达拉哈拉', important: false },

    // 2026年6月12日
    { id: 3, date: '2026-06-13', time: '02:00', home: 'can', away: 'bih', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: 'BC Place', city: '温哥华', important: false },
    { id: 4, date: '2026-06-13', time: '08:00', home: 'usa', away: 'par', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: 'SoFi体育场', city: '洛杉矶', important: true },

    // 2026年6月13日
    { id: 5, date: '2026-06-14', time: '02:00', home: 'qat', away: 'sui', homeScore: null, awayScore: null, status: 'upcoming', group: 'C组', stage: 'group', stadium: '大都会人寿体育场', city: '新泽西', important: false },
    { id: 6, date: '2026-06-14', time: '08:00', home: 'ger', away: 'por', homeScore: null, awayScore: null, status: 'upcoming', group: 'G组', stage: 'group', stadium: '梅赛德斯-奔驰体育场', city: '亚特兰大', important: true },

    // 2026年6月14日
    { id: 7, date: '2026-06-15', time: '02:00', home: 'bra', away: 'aus', homeScore: null, awayScore: null, status: 'upcoming', group: 'E组', stage: 'group', stadium: '吉列体育场', city: '波士顿', important: true },
    { id: 8, date: '2026-06-15', time: '08:00', home: 'fra', away: 'arg', homeScore: null, awayScore: null, status: 'upcoming', group: 'B组', stage: 'group', stadium: '大都会人寿体育场', city: '纽约', important: true },

    // 2026年6月15日
    { id: 9, date: '2026-06-16', time: '02:00', home: 'eng', away: 'esp', homeScore: null, awayScore: null, status: 'upcoming', group: 'D组', stage: 'group', stadium: '林肯金融球场', city: '费城', important: true },
    { id: 10, date: '2026-06-16', time: '08:00', home: 'ned', away: 'ita', homeScore: null, awayScore: null, status: 'upcoming', group: 'H组', stage: 'group', stadium: 'AT&T体育场', city: '阿灵顿', important: true }
];

// 小组赛积分榜 - 初始状态
const groupStandings = {};
const groups = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

// 初始化各组积分榜
groups.forEach(group => {
    const groupTeams = teamsData.filter(t => t.group === group);
    groupStandings[group] = groupTeams.map(t => ({
        team: t.id,
        mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, pts: 0
    }));
});

// 总积分榜 - 按Elo排序
const overallStandings = teamsData
    .sort((a, b) => b.elo - a.elo)
    .slice(0, 10)
    .map((t, i) => ({
        rank: i + 1,
        team: t.id,
        group: t.group,
        mp: 0, w: 0, d: 0, l: 0, gf: 0, ga: 0, gd: 0, pts: 0
    }));

// 比赛详情数据
const matchDetails = {};

// 音乐播放列表
const musicPlaylist = [
    { id: 1, title: 'The Cup of Life', artist: 'Ricky Martin', year: '1998 法国世界杯', cover: 'https://via.placeholder.com/300x300/ff6b35/fff?text=1998', url: '', duration: '4:27' },
    { id: 2, title: 'The Time of Our Lives', artist: 'Il Divo & Toni Braxton', year: '2006 德国世界杯', cover: 'https://via.placeholder.com/300x300/4a90e2/fff?text=2006', url: '', duration: '3:18' },
    { id: 3, title: 'Waka Waka (This Time for Africa)', artist: 'Shakira', year: '2010 南非世界杯', cover: 'https://via.placeholder.com/300x300/f5a623/fff?text=2010', url: '', duration: '3:22' },
    { id: 4, title: 'We Are One (Ole Ola)', artist: 'Pitbull ft. Jennifer Lopez & Claudia Leitte', year: '2014 巴西世界杯', cover: 'https://via.placeholder.com/300x300/7ed321/fff?text=2014', url: '', duration: '3:42' },
    { id: 5, title: 'Live It Up', artist: 'Nicky Jam ft. Will Smith & Era Istrefi', year: '2018 俄罗斯世界杯', cover: 'https://via.placeholder.com/300x300/9013fe/fff?text=2018', url: '', duration: '3:27' },
    { id: 6, title: 'Hayya Hayya (Better Together)', artist: 'Trinidad Cardona, Davido & Aisha', year: '2022 卡塔尔世界杯', cover: 'https://via.placeholder.com/300x300/1a5f2a/fff?text=2022', url: '', duration: '3:34' }
];

// 辅助函数
function getTeam(id) {
    return teamsData.find(t => t.id === id) || { name: id, flag: '' };
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}月${date.getDate()}日`;
}

function getStatusText(status, minute) {
    switch(status) {
        case 'live': return `${minute}' 直播中`;
        case 'finished': return '已结束';
        default: return '未开始';
    }
}

function getToday() {
    return new Date().toISOString().split('T')[0];
}
