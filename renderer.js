const { ipcRenderer } = require('electron');

// DOM 元素
const timeDisplay = document.querySelector('.time');
const statusDisplay = document.querySelector('.status');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const modeBtns = document.querySelectorAll('.mode-btn');
const progressRing = document.querySelector('.progress-ring-fill');
const completedCountEl = document.getElementById('completedCount');
const totalFocusTimeEl = document.getElementById('totalFocusTime');
const currentTaskInput = document.getElementById('currentTask');
const timerSound = document.getElementById('timerSound');

// 设置输入
const pomodoroInput = document.getElementById('pomodoroTime');
const shortBreakInput = document.getElementById('shortBreakTime');
const longBreakInput = document.getElementById('longBreakTime');

// 状态
let timer = null;
let timeLeft = 25 * 60;
let totalTime = 25 * 60;
let isRunning = false;
let currentMode = 'pomodoro';
let completedPomodoros = 0;
let totalFocusMinutes = 0;

// 配置
const modeConfig = {
  pomodoro: { time: 25, label: '专注中...', status: '准备开始专注' },
  shortBreak: { time: 5, label: '短休息中...', status: '准备短休息' },
  longBreak: { time: 15, label: '长休息中...', status: '准备长休息' }
};

// 进度环周长
const CIRCUMFERENCE = 2 * Math.PI * 90;
progressRing.style.strokeDasharray = `${CIRCUMFERENCE} ${CIRCUMFERENCE}`;

// 格式化时间
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

// 更新显示
function updateDisplay() {
  timeDisplay.textContent = formatTime(timeLeft);
  updateProgress();
  updateTrayTooltip();
}

// 更新进度环
function updateProgress() {
  const progress = timeLeft / totalTime;
  const offset = CIRCUMFERENCE - (progress * CIRCUMFERENCE);
  progressRing.style.strokeDashoffset = offset;
}

// 更新托盘提示
function updateTrayTooltip() {
  const modeLabels = {
    pomodoro: '专注',
    shortBreak: '短休息',
    longBreak: '长休息'
  };
  ipcRenderer.send('update-tray-tooltip', `番茄钟 - ${modeLabels[currentMode]} ${formatTime(timeLeft)}`);
}

// 切换模式
function switchMode(mode) {
  currentMode = mode;
  const config = modeConfig[mode];
  totalTime = config.time * 60;
  timeLeft = totalTime;

  // 更新 UI
  modeBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.mode === mode);
  });

  // 更新背景色
  document.body.className = `mode-${mode}`;

  // 更新状态文本
  statusDisplay.textContent = isRunning ? config.label : config.status;

  updateDisplay();
  resetTimer();
}

// 开始计时
function startTimer() {
  if (isRunning) return;

  isRunning = true;
  document.querySelector('.timer-display').classList.add('running');
  startBtn.style.display = 'none';
  pauseBtn.style.display = 'block';
  statusDisplay.textContent = modeConfig[currentMode].label;

  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      onTimerComplete();
    }
  }, 1000);
}

// 暂停计时
function pauseTimer() {
  if (!isRunning) return;

  isRunning = false;
  clearInterval(timer);
  document.querySelector('.timer-display').classList.remove('running');
  startBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
  startBtn.textContent = '继续';
  statusDisplay.textContent = '已暂停';
}

// 重置计时
function resetTimer() {
  isRunning = false;
  clearInterval(timer);
  document.querySelector('.timer-display').classList.remove('running');
  startBtn.style.display = 'block';
  pauseBtn.style.display = 'none';
  startBtn.textContent = '开始';

  const config = modeConfig[currentMode];
  statusDisplay.textContent = config.status;

  timeLeft = totalTime;
  updateDisplay();
}

// 计时完成
function onTimerComplete() {
  pauseTimer();
  playSound();

  // 发送通知
  const taskName = currentTaskInput.value || '番茄钟';
  let title, body;

  if (currentMode === 'pomodoro') {
    completedPomodoros++;
    totalFocusMinutes += modeConfig.pomodoro.time;
    completedCountEl.textContent = completedPomodoros;
    totalFocusTimeEl.textContent = totalFocusMinutes;

    title = '🎉 专注完成！';
    body = `任务"${taskName}"已完成，休息一下吧！`;

    // 自动切换到短休息
    if (completedPomodoros % 4 === 0) {
      switchMode('longBreak');
    } else {
      switchMode('shortBreak');
    }
  } else {
    title = '⏰ 休息结束！';
    body = '休息结束，准备开始新的专注吧！';
    switchMode('pomodoro');
  }

  ipcRenderer.send('show-notification', { title, body });
  statusDisplay.textContent = '已完成';
}

// 播放提示音
function playSound() {
  // 使用 Web Audio API 生成提示音
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // 设置音调
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    // 设置音量渐变
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    // 播放
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);

    // 第二声
    const oscillator2 = audioContext.createOscillator();
    const gainNode2 = audioContext.createGain();
    oscillator2.connect(gainNode2);
    gainNode2.connect(audioContext.destination);
    oscillator2.frequency.value = 600;
    oscillator2.type = 'sine';
    gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime + 0.3);
    gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
    oscillator2.start(audioContext.currentTime + 0.3);
    oscillator2.stop(audioContext.currentTime + 0.8);
  } catch (e) {
    // 如果 Web Audio 失败，尝试播放音频文件
    timerSound.currentTime = 0;
    timerSound.play().catch(() => {
      // 静音失败也没关系
    });
  }
}

// 更新设置
function updateSettings() {
  modeConfig.pomodoro.time = parseInt(pomodoroInput.value) || 25;
  modeConfig.shortBreak.time = parseInt(shortBreakInput.value) || 5;
  modeConfig.longBreak.time = parseInt(longBreakInput.value) || 15;

  // 如果当前没在运行，更新当前模式的时长
  if (!isRunning) {
    const config = modeConfig[currentMode];
    totalTime = config.time * 60;
    timeLeft = totalTime;
    updateDisplay();
  }
}

// 事件监听
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

modeBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    switchMode(btn.dataset.mode);
  });
});

[pomodoroInput, shortBreakInput, longBreakInput].forEach(input => {
  input.addEventListener('change', updateSettings);
});

// 键盘快捷键
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    if (isRunning) {
      pauseTimer();
    } else {
      startTimer();
    }
  } else if (e.code === 'KeyR' && e.ctrlKey) {
    e.preventDefault();
    resetTimer();
  }
});

// 初始化
updateDisplay();

// 从本地存储加载数据
const savedStats = localStorage.getItem('pomodoroStats');
if (savedStats) {
  const stats = JSON.parse(savedStats);
  completedPomodoros = stats.completedPomodoros || 0;
  totalFocusMinutes = stats.totalFocusMinutes || 0;
  completedCountEl.textContent = completedPomodoros;
  totalFocusTimeEl.textContent = totalFocusMinutes;
}

// 保存统计数据
window.addEventListener('beforeunload', () => {
  localStorage.setItem('pomodoroStats', JSON.stringify({
    completedPomodoros,
    totalFocusMinutes
  }));
});
