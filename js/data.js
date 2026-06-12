// 2026世界杯数据 - 由 data-loader.js 从 data/data.json 加载
// 本文件作为兼容层，为 app.js 提供所需的全局变量

const teamsData = window.teamsData || [];
const matchesData = window.matchesData || [];
const groupStandings = window.groupStandings || {};
const overallStandings = window.overallStandings || [];
const matchDetails = {};

// ==================== 辅助函数 ====================

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