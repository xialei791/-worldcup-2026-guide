// 主应用逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initCountdown();
    initCalendar();
    initStandings();
    initMatches();
    initTeams();
    initNavigation();
    initTodayMatches();
    initScorers();
    initModal();
    initFloatNav();
});

// ==================== 倒计时 ====================
function initCountdown() {
    const targetDate = new Date('2026-06-11T00:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance > 0) {
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            document.getElementById('days').textContent = days.toString().padStart(3, '0');
            document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
            document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
            document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// ==================== 今日赛事 ====================
function initTodayMatches() {
    const today = '2026-06-13'; // 模拟今天
    const todayMatches = matchesData.filter(m => m.date === today);
    const container = document.getElementById('todayMatches');

    if (todayMatches.length === 0) {
        container.innerHTML = '<div class="no-match">今日暂无比赛</div>';
        return;
    }

    container.innerHTML = todayMatches.map((match, index) => {
        const home = getTeam(match.home);
        const away = getTeam(match.away);
        const statusClass = match.status;
        const scoreDisplay = match.status === 'upcoming'
            ? '<span class="vs-text">VS</span>'
            : `<span class="score ${match.status === 'live' ? 'live-score' : ''}">${match.homeScore} - ${match.awayScore}</span>`;

        return `
            <div class="match-card ${statusClass}" onclick="openMatchModal(${match.id})" style="animation-delay: ${index * 0.1}s">
                <div class="match-status-bar ${statusClass}">
                    ${match.status === 'live' ? '<span class="live-dot">●</span>' : ''}
                    ${getStatusText(match.status, match.minute)}
                </div>
                <div class="match-teams">
                    <div class="team-info">
                        <img src="${home.flag}" alt="${home.name}" class="team-flag">
                        <span class="team-name">${home.name}</span>
                    </div>
                    <div class="vs-center">
                        ${scoreDisplay}
                    </div>
                    <div class="team-info">
                        <img src="${away.flag}" alt="${away.name}" class="team-flag">
                        <span class="team-name">${away.name}</span>
                    </div>
                </div>
                <div class="match-venue">
                    <i class="fas fa-map-marker-alt"></i> ${match.stadium}
                </div>
            </div>
        `;
    }).join('');
}

// ==================== 日历 ====================
let currentMonth = 5; // 6月 (0-based)
let currentYear = 2026;

function initCalendar() {
    renderCalendar(currentYear, currentMonth);

    document.getElementById('prevMonth').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentYear, currentMonth);
    });

    document.getElementById('nextMonth').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentYear, currentMonth);
    });
}

function renderCalendar(year, month) {
    const monthNames = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    document.getElementById('currentMonth').textContent = `${year}年${monthNames[month]}`;

    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const container = document.getElementById('calendarBody');

    let html = '';

    // 空白填充
    for (let i = 0; i < firstDay; i++) {
        html += '<div class="calendar-day other-month"></div>';
    }

    // 日期
    for (let day = 1; day <= daysInMonth; day++) {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const dayMatches = matchesData.filter(m => m.date === dateStr);
        const hasMatch = dayMatches.length > 0;
        const hasImportant = dayMatches.some(m => m.important);
        const isToday = dateStr === '2026-06-13'; // 模拟今天

        let classes = 'calendar-day';
        if (isToday) classes += ' today';
        if (hasMatch) classes += ' has-match';
        if (hasImportant) classes += ' important';

        const dots = dayMatches.slice(0, 3).map(() =>
            `<span class="match-dot ${hasImportant ? 'important' : ''}"></span>`
        ).join('');

        html += `
            <div class="${classes}" onclick="showDayMatches('${dateStr}')">
                <span class="day-number">${day}</span>
                ${hasMatch ? `<div class="match-dots">${dots}</div>` : ''}
            </div>
        `;
    }

    container.innerHTML = html;
}

function showDayMatches(date) {
    const matches = matchesData.filter(m => m.date === date);
    if (matches.length > 0) {
        // 滚动到赛程区域
        document.getElementById('matches').scrollIntoView({ behavior: 'smooth' });
        // 可以添加筛选逻辑
    }
}

// ==================== 积分榜 ====================
function initStandings() {
    // 默认显示A组
    renderGroupTable('A');
    renderOverallTable();

    // 小组按钮事件
    document.querySelectorAll('.group-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.group-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderGroupTable(this.dataset.group);
        });
    });

    // 标签切换
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const tab = this.dataset.tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            if (tab === 'groups') {
                document.getElementById('groupsStandings').classList.remove('hidden');
                document.getElementById('overallStandings').classList.add('hidden');
            } else {
                document.getElementById('groupsStandings').classList.add('hidden');
                document.getElementById('overallStandings').classList.remove('hidden');
            }
        });
    });
}

function renderGroupTable(group) {
    const data = groupStandings[group] || [];
    const container = document.getElementById('groupTable');

    let html = `
        <div class="table-header">
            <div>排名</div>
            <div>球队</div>
            <div>赛</div>
            <div>胜</div>
            <div>平</div>
            <div>负</div>
            <div>积分</div>
        </div>
    `;

    html += data.map((team, index) => {
        const teamInfo = getTeam(team.team);
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'normal';
        const qualifiedClass = index < 2 ? 'qualified' : '';

        return `
            <div class="table-row ${qualifiedClass}" style="animation-delay: ${index * 0.1}s">
                <div><span class="rank ${rankClass}">${index + 1}</span></div>
                <div class="team-cell">
                    <img src="${teamInfo.flag}" alt="${teamInfo.name}">
                    <span>${teamInfo.name}</span>
                </div>
                <div class="cell">${team.mp}</div>
                <div class="cell">${team.w}</div>
                <div class="cell">${team.d}</div>
                <div class="cell">${team.l}</div>
                <div class="cell points">${team.pts}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

function renderOverallTable() {
    const container = document.getElementById('overallTable');

    let html = `
        <div class="table-header">
            <div>排名</div>
            <div>球队</div>
            <div>组</div>
            <div>赛</div>
            <div>胜</div>
            <div>平</div>
            <div>积分</div>
        </div>
    `;

    html += overallStandings.map((team, index) => {
        const teamInfo = getTeam(team.team);
        const rankClass = index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : 'normal';
        const qualifiedClass = index < 8 ? 'qualified' : '';

        return `
            <div class="table-row ${qualifiedClass}" style="animation-delay: ${index * 0.05}s">
                <div><span class="rank ${rankClass}">${team.rank}</span></div>
                <div class="team-cell">
                    <img src="${teamInfo.flag}" alt="${teamInfo.name}">
                    <span>${teamInfo.name}</span>
                </div>
                <div class="cell">${team.group}</div>
                <div class="cell">${team.mp}</div>
                <div class="cell">${team.w}</div>
                <div class="cell">${team.d}</div>
                <div class="cell points">${team.pts}</div>
            </div>
        `;
    }).join('');

    container.innerHTML = html;
}

// ==================== 射手榜 ====================
function initScorers() {
    const scorers = window.topScorers || [];
    const container = document.getElementById('scorersList');
    if (!container) return;

    if (!scorers || scorers.length === 0) {
        container.innerHTML = '<div class="no-match">暂无进球数据</div>';
        return;
    }

    // Medal colors for top 3
    const medals = ['#ffd700', '#c0c0c0', '#cd7f32'];

    container.innerHTML = scorers.map((s, index) => {
        const team = getTeam(s.team);
        const medal = index < 3 ? `<span class="scorer-medal" style="color:${medals[index]}">${index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}</span>` : '';
        const rankDisplay = medal || `<span class="scorer-rank">${s.rank}</span>`;

        return `
            <div class="scorer-item ${index < 3 ? 'top-three' : ''}">
                <div class="scorer-rank-col">${rankDisplay}</div>
                <img src="${s.photo || team.flag}" alt="${s.player}" class="scorer-photo">
                <div class="scorer-info">
                    <span class="scorer-name">${s.player}</span>
                    <span class="scorer-team">
                        <img src="${team.flag}" alt="${team.name}" class="scorer-team-flag">
                        ${team.name}
                    </span>
                </div>
                <div class="scorer-stats">
                    <div class="scorer-goals">
                        <span class="scorer-goals-num">${s.goals}</span>
                        <span class="scorer-goals-label">进球</span>
                    </div>
                    <div class="scorer-assists">
                        <span class="scorer-assists-num">${s.assists || 0}</span>
                        <span class="scorer-assists-label">助攻</span>
                    </div>
                    <div class="scorer-matches">
                        <span class="scorer-matches-num">${s.matches || 0}</span>
                        <span class="scorer-matches-label">场次</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== 赛程 ====================
function initMatches() {
    renderMatchesList('all');

    document.getElementById('stageFilter').addEventListener('change', function() {
        renderMatchesList(this.value);
    });
}

function renderMatchesList(stage) {
    const container = document.getElementById('matchesList');
    const filtered = stage === 'all' ? matchesData : matchesData.filter(m => m.stage === stage);

    container.innerHTML = filtered.map((match, index) => {
        const home = getTeam(match.home);
        const away = getTeam(match.away);
        const scoreDisplay = match.status === 'upcoming'
            ? '<span class="vs-text">VS</span>'
            : `<span class="score ${match.status === 'live' ? 'live-score' : ''}">${match.homeScore} - ${match.awayScore}</span>`;

        return `
            <div class="match-item" onclick="openMatchModal(${match.id})" style="animation-delay: ${index * 0.05}s">
                <div class="match-time">
                    <div class="time">${match.beijingTime || match.time}</div>
                    <div class="date">${formatDate(match.beijingDate || match.date)}<span class="bj-label">北京时间</span></div>
                </div>
                <div class="match-teams-row">
                    <div class="team-side">
                        <img src="${home.flag}" alt="${home.name}">
                        <span>${home.name}</span>
                    </div>
                    <div class="match-center">
                        ${scoreDisplay}
                        <span class="match-stage">${match.group}</span>
                    </div>
                    <div class="team-side away">
                        <img src="${away.flag}" alt="${away.name}">
                        <span>${away.name}</span>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

// ==================== 球队 ====================
function initTeams() {
    const container = document.getElementById('teamsGrid');

    container.innerHTML = teamsData.map((team, index) => `
        <div class="team-card" onclick="openTeamModal('${team.id}')" style="animation-delay: ${index * 0.05}s">
            <img src="${team.flag}" alt="${team.name}">
            <h4>${team.name}</h4>
            <span class="group">${team.group}组 · ${team.conf}</span>
        </div>
    `).join('');
}

// ==================== 球队详情 ====================
function openTeamModal(teamId) {
    const team = teamsData.find(t => t.id === teamId);
    if (!team) return;

    document.getElementById('teamModalTitle').textContent = team.name + ' - 球队详情';

    const players = team.players || [];
    const formation = team.formation || '4-3-3';
    const coach = team.coach || '待定';

    // 生成阵型图
    const formationHTML = renderFormation(formation, players);

    // 生成球员名单
    const playerHTML = players.map(p => {
        const posClass = p.position.toLowerCase();
        return `
            <div class="player-item">
                <img src="${p.photo}" alt="${p.name}" class="player-photo">
                <span class="player-number">${p.number}</span>
                <div class="player-info">
                    <span class="player-name">${p.name}</span>
                    <span class="player-meta">
                        <span class="player-pos ${posClass}">${p.position}</span>
                        <span class="player-age">${p.age}岁</span>
                    </span>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('teamModalBody').innerHTML = `
        <div class="team-detail-header">
            <img src="${team.flag}" alt="${team.name}" class="team-detail-flag">
            <div class="team-detail-info">
                <h2>${team.name}</h2>
                <span class="team-detail-group">${team.group}组 · ${team.conf}</span>
                <span class="team-detail-coach"><i class="fas fa-user-tie"></i> 主教练: ${coach}</span>
                <span class="team-detail-formation"><i class="fas fa-th"></i> 阵型: ${formation}</span>
            </div>
        </div>

        <div class="team-section-title"><i class="fas fa-sitemap"></i> 阵型图</div>
        <div class="formation-container">
            ${formationHTML}
        </div>

        <div class="team-section-title"><i class="fas fa-users"></i> 球员名单 (${players.length}人)</div>
        <div class="player-list">
            ${playerHTML}
        </div>
    `;

    document.getElementById('teamModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTeamModal() {
    document.getElementById('teamModal').classList.remove('active');
    document.body.style.overflow = '';
}

function renderFormation(formation, players) {
    const parts = formation.split('-').map(Number);
    // Filter out GK from field players
    const gk = players.filter(p => p.position === 'GK').slice(0, 1);
    const fieldPlayers = players.filter(p => p.position !== 'GK');

    // Build rows based on formation
    let rows = [];
    let idx = 0;
    for (let i = parts.length - 1; i >= 0; i--) {
        const count = parts[i];
        const rowPlayers = fieldPlayers.slice(idx, idx + count);
        idx += count;
        rows.push(rowPlayers);
    }

    return `
        <div class="formation-field">
            <div class="formation-label">${formation}</div>
            ${rows.map((row, ri) => `
                <div class="formation-row" style="grid-template-columns: repeat(${row.length}, 1fr)">
                    ${row.map(p => `
                        <div class="formation-player">
                            <div class="formation-circle ${p.position.toLowerCase()}">
                                <span class="formation-num">${p.number || ''}</span>
                            </div>
                            <span class="formation-name">${p.name.split(' ').pop()}</span>
                        </div>
                    `).join('')}
                </div>
            `).join('')}
            <div class="formation-row single">
                ${gk.map(p => `
                    <div class="formation-player">
                        <div class="formation-circle gk">
                            <span class="formation-num">${p.number || ''}</span>
                        </div>
                        <span class="formation-name">${p.name.split(' ').pop()}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// ==================== 浮动导航 ====================
function initFloatNav() {
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.float-nav-item');

    function updateActiveSection() {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 150) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            const section = item.getAttribute('data-section');
            if (section === current) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    // 监听滚动
    window.addEventListener('scroll', updateActiveSection, { passive: true });
    updateActiveSection(); // 初始状态
}

// ==================== 模态框（比赛）====================
function initModal() {
    // 比赛模态框
    document.getElementById('closeModal').addEventListener('click', closeMatchModal);
    document.getElementById('matchModal').addEventListener('click', function(e) {
        if (e.target === this) closeMatchModal();
    });

    // 球队模态框
    document.getElementById('closeTeamModal').addEventListener('click', closeTeamModal);
    document.getElementById('teamModal').addEventListener('click', function(e) {
        if (e.target === this) closeTeamModal();
    });
}

function openMatchModal(matchId) {
    const match = matchesData.find(m => m.id === matchId);
    if (!match) return;

    const home = getTeam(match.home);
    const away = getTeam(match.away);
    const detail = matchDetails[matchId] || {};

    const modalBody = document.getElementById('modalBody');
    modalBody.innerHTML = `
        <div class="modal-match-header">
            <div class="modal-teams">
                <div class="modal-team">
                    <img src="${home.flag}" alt="${home.name}">
                    <h3>${home.name}</h3>
                </div>
                <div class="modal-score">
                    ${match.status === 'upcoming' ? '<span class="vs-big">VS</span>' :
                      `<span class="score-big">${match.homeScore} - ${match.awayScore}</span>`}
                    <span class="modal-status">${getStatusText(match.status, match.minute)}</span>
                </div>
                <div class="modal-team">
                    <img src="${away.flag}" alt="${away.name}">
                    <h3>${away.name}</h3>
                </div>
            </div>
            <div class="modal-info">
                <span><i class="fas fa-calendar"></i> ${match.beijingDate || match.date} ${match.beijingTime || match.time} <small>北京时间</small></span>
                <span><i class="fas fa-map-marker-alt"></i> ${match.stadium}</span>
            </div>
        </div>

        ${detail.statistics ? `
        <div class="modal-stats">
            <h4>比赛统计</h4>
            <div class="stats-row">
                <span>${detail.statistics.possession.home}%</span>
                <span>控球率</span>
                <span>${detail.statistics.possession.away}%</span>
            </div>
            <div class="stats-row">
                <span>${detail.statistics.shots.home}</span>
                <span>射门</span>
                <span>${detail.statistics.shots.away}</span>
            </div>
            <div class="stats-row">
                <span>${detail.statistics.shotsOnTarget.home}</span>
                <span>射正</span>
                <span>${detail.statistics.shotsOnTarget.away}</span>
            </div>
        </div>
        ` : '<p style="text-align:center;color:#999;padding:40px;">详细数据加载中...</p>'}
    `;

    document.getElementById('matchModal').classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeMatchModal() {
    document.getElementById('matchModal').classList.remove('active');
    document.body.style.overflow = '';
}

// ==================== 导航 ====================
function initNavigation() {
    // 移动端菜单
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                navLinks.classList.remove('active');

                // 更新激活状态
                document.querySelectorAll('.nav-links a').forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // 滚动时更新导航
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
                document.querySelectorAll('.nav-links a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${section.id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });
}
