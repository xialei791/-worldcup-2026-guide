// 2026世界杯数据 - 由 data-loader.js 从 data/data.json 加载
// 本文件作为兼容层，为 app.js 提供所需的全局变量

const teamsData = window.teamsData || [];
const matchesData = window.matchesData || [];
const groupStandings = window.groupStandings || {};
const overallStandings = window.overallStandings || [];
const topScorers = window.topScorers || [];
const matchDetails = {};

// ==================== 辅助函数 ====================

// 渲染球队头像（淘汰赛未定球队显示大力神杯）
function renderTeamImg(team) {
    if (!team || team.id === '__trophy__') {
        return '<span class="trophy-icon"><i class="fas fa-trophy"></i></span>';
    }
    return '<img src="' + team.flag + '" alt="' + team.name + '" class="team-flag">';
}

function renderTeamName(team) {
    if (!team || team.id === '__trophy__') return '🏆';
    return team.name;
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return (date.getMonth() + 1) + '月' + date.getDate() + '日';
}

function getStatusText(status, minute) {
    switch(status) {
        case 'live': return (minute || '') + "' 直播中";
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