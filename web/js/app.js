// 主应用逻辑
document.addEventListener('DOMContentLoaded', function() {
    // 初始化
    initCountdown();
    initCalendar();
    initStandings();
    initMatches();
    initTeams();
    initMusicPlayer();
    initNavigation();
    initTodayMatches();
    initModal();
});

// ==================== 倒计时/状态 ====================
function initCountdown() {
    // 2026年世界杯开幕日 - 北京时间6月12日
    const countdownContainer = document.querySelector('.countdown-container');
    if (countdownContainer) {
        countdownContainer.innerHTML = `
            <div class="worldcup-live-status">
                <div class="live-badge">🏆 2026世界杯开幕日</div>
                <div class="today-date">今天是：2026年6月12日（北京时间）</div>
                <div class="today-match-info">
                    <div class="match-status-text">揭幕战今晚开打！</div>
                    <div class="match-countdown">03:00 墨西哥 🇲🇽 vs 🇿🇦 南非</div>
                    <div class="match-note">📍 墨西哥城阿兹特克体育场</div>
                </div>
            </div>
        `;
    }
}

// ==================== 今日赛事 ====================
function initTodayMatches() {
    const today = '2026-06-12'; // 今天：2026年6月12日（北京时间，揭幕战即将开始）
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
        const isToday = dateStr === '2026-06-12'; // 今天：2026年6月12日（北京时间）

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
                    <div class="time">${match.time}</div>
                    <div class="date">${formatDate(match.date)}</div>
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
        <div class="team-card" style="animation-delay: ${index * 0.05}s">
            <img src="${team.flag}" alt="${team.name}">
            <h4>${team.name}</h4>
            <span class="group">${team.group}组 · ${team.conf}</span>
        </div>
    `).join('');
}

// ==================== 模态框 ====================
function initModal() {
    document.getElementById('closeModal').addEventListener('click', closeMatchModal);
    document.getElementById('matchModal').addEventListener('click', function(e) {
        if (e.target === this) closeMatchModal();
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
                <span><i class="fas fa-calendar"></i> ${match.date} ${match.time}</span>
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

// ==================== 音乐播放器 ====================
let currentSongIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

function initMusicPlayer() {
    renderPlaylist();

    // 播放/暂停
    document.getElementById('playBtn').addEventListener('click', togglePlay);
    document.getElementById('playBtnFull').addEventListener('click', togglePlay);

    // 上一首/下一首
    document.getElementById('prevBtn').addEventListener('click', prevSong);
    document.getElementById('nextBtn').addEventListener('click', nextSong);
    document.getElementById('prevBtnFull').addEventListener('click', prevSong);
    document.getElementById('nextBtnFull').addEventListener('click', nextSong);

    // 展开/收起
    document.getElementById('expandBtn').addEventListener('click', () => {
        document.getElementById('playerFull').classList.remove('hidden');
        document.getElementById('playerMini').classList.add('hidden');
    });

    document.getElementById('collapseBtn').addEventListener('click', () => {
        document.getElementById('playerFull').classList.add('hidden');
        document.getElementById('playerMini').classList.remove('hidden');
    });

    // 随机/循环
    document.getElementById('shuffleBtn').addEventListener('click', function() {
        isShuffle = !isShuffle;
        this.classList.toggle('active', isShuffle);
    });

    document.getElementById('repeatBtn').addEventListener('click', function() {
        isRepeat = !isRepeat;
        this.classList.toggle('active', isRepeat);
    });

    // 音乐按钮点击
    document.getElementById('musicToggle').addEventListener('click', function() {
        const player = document.getElementById('musicPlayer');
        player.classList.toggle('hidden');
        if (!player.classList.contains('hidden') && !isPlaying) {
            togglePlay();
        }
    });

    updatePlayerUI();
}

function renderPlaylist() {
    const container = document.getElementById('playlist');
    container.innerHTML = musicPlaylist.map((song, index) => `
        <div class="playlist-item ${index === currentSongIndex ? 'active' : ''}" onclick="selectSong(${index})">
            <span class="song-num">${index + 1}</span>
            <div class="song-info-small">
                <span class="song-name">${song.title}</span>
                <span class="song-year">${song.year}</span>
            </div>
            ${index === currentSongIndex ? '<span class="playing-icon">♪</span>' : ''}
        </div>
    `).join('');
}

function togglePlay() {
    isPlaying = !isPlaying;
    updatePlayerUI();

    const musicToggle = document.getElementById('musicToggle');
    musicToggle.classList.toggle('playing', isPlaying);
}

function prevSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * musicPlaylist.length);
    } else {
        currentSongIndex = currentSongIndex === 0 ? musicPlaylist.length - 1 : currentSongIndex - 1;
    }
    updatePlayerUI();
    renderPlaylist();
}

function nextSong() {
    if (isShuffle) {
        currentSongIndex = Math.floor(Math.random() * musicPlaylist.length);
    } else {
        currentSongIndex = currentSongIndex === musicPlaylist.length - 1 ? 0 : currentSongIndex + 1;
    }
    updatePlayerUI();
    renderPlaylist();
}

function selectSong(index) {
    currentSongIndex = index;
    isPlaying = true;
    updatePlayerUI();
    renderPlaylist();
}

function updatePlayerUI() {
    const song = musicPlaylist[currentSongIndex];

    // 迷你播放器
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songArtist').textContent = song.year;
    document.getElementById('albumArt').src = song.cover;
    document.getElementById('playBtn').innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';

    // 全屏播放器
    document.getElementById('fullTitle').textContent = song.title;
    document.getElementById('fullArtist').textContent = `${song.artist} - ${song.year}`;
    document.getElementById('fullAlbumArt').src = song.cover;
    document.getElementById('playBtnFull').innerHTML = isPlaying ? '<i class="fas fa-pause"></i>' : '<i class="fas fa-play"></i>';
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
