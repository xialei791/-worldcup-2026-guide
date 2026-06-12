/**
 * 从 API 数据文件加载世界杯数据
 * 优先使用 data/data.json，如果失败则回退到 js/data.js
 */

let worldCupData = null;

// 从外部数据源加载
async function loadExternalData() {
    try {
        const response = await fetch('data/data.json');
        if (!response.ok) throw new Error('无法加载数据');
        const data = await response.json();
        console.log('[Data] 从 API 数据加载:', data._last_updated);
        return data;
    } catch (e) {
        console.log('[Data] 无法加载外部数据，使用默认数据');
        return null;
    }
}

// 获取球队
function getTeam(teamId) {
    if (worldCupData && worldCupData.teamsData) {
        return worldCupData.teamsData.find(t => t.id === teamId);
    }
    // 回退到原 data.js
    if (typeof teamsData !== 'undefined') {
        return teamsData.find(t => t.id === teamId);
    }
    return null;
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

// 初始化数据加载
async function initDataLoader() {
    const externalData = await loadExternalData();
    if (externalData) {
        worldCupData = externalData;

        // 更新全局变量以兼容现有代码
        window.teamsData = externalData.teamsData;
        window.matchesData = externalData.matchesData;
        window.groupStandings = externalData.groupStandings;
    }
}

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', initDataLoader);

// 导出供外部使用
window.worldCupAPI = {
    getTeam,
    getMatches,
    getGroupStandings,
    initDataLoader,
    refreshData: initDataLoader
};