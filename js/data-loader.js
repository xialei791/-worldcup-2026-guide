/**
 * 从 API 数据文件加载世界杯数据
 * 优先使用 data/data.json，如果失败则回退到 js/data.js
 */

let worldCupData = null;

// 同步加载 JSON 数据
function loadExternalData() {
    try {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'data/data.json', false);
        xhr.send();
        if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            console.log('[Data] 从 API 数据加载:', data._last_updated);
            return data;
        }
        return null;
    } catch (e) {
        console.log('[Data] 无法加载外部数据，使用默认数据:', e.message);
        return null;
    }
}

// 立即加载数据
worldCupData = loadExternalData();

// 如果外部数据加载成功，更新全局变量
if (worldCupData) {
    window.teamsData = worldCupData.teamsData;
    window.matchesData = worldCupData.matchesData;
    window.groupStandings = worldCupData.groupStandings;
    window.overallStandings = worldCupData.overallStandings;
}

// 获取球队（带兜底处理，防止淘汰赛空球队导致渲染崩溃）
function getTeam(teamId) {
    if (!teamId) {
        return { id: '', name: '待定', flag: '', conf: '' };
    }
    if (worldCupData && worldCupData.teamsData) {
        return worldCupData.teamsData.find(t => t.id === teamId) || { id: teamId, name: teamId, flag: '' };
    }
    // 回退到原 data.js
    if (typeof teamsData !== 'undefined') {
        return teamsData.find(t => t.id === teamId) || { id: teamId, name: teamId, flag: '' };
    }
    return { id: teamId, name: teamId, flag: '' };
}

// 获取比赛
function getMatches() {
    if (worldCupData && worldCupData.matchesData) {
        return worldCupData.matchesData;
    }
    // 回退到原 data.js
    if (typeof matchesData !== 'undefined') {
        return matchesData;
    }
    return [];
}

// 获取小组积分榜
function getGroupStandings() {
    if (worldCupData && worldCupData.groupStandings) {
        return worldCupData.groupStandings;
    }
    // 回退到原 data.js
    if (typeof groupStandings !== 'undefined') {
        return groupStandings;
    }
    return {};
}

// 刷新数据
async function refreshData() {
    try {
        const response = await fetch('data/data.json?t=' + Date.now());
        if (!response.ok) throw new Error('无法刷新数据');
        const data = await response.json();
        worldCupData = data;
        window.teamsData = data.teamsData;
        window.matchesData = data.matchesData;
        window.groupStandings = data.groupStandings;
        window.overallStandings = data.overallStandings;
        console.log('[Data] 数据已刷新:', data._last_updated);
        location.reload(); // 刷新页面以更新显示
    } catch (e) {
        console.log('[Data] 刷新数据失败:', e);
    }
}

// 导出供外部使用
window.worldCupAPI = {
    getTeam,
    getMatches,
    getGroupStandings,
    refreshData
};