// 音乐播放器组件
Component({
  properties: {
    // 是否自动播放
    autoplay: {
      type: Boolean,
      value: false
    },
    // 默认音量
    volume: {
      type: Number,
      value: 0.5
    }
  },

  data: {
    // 播放状态
    isPlaying: false,
    // 当前播放索引
    currentIndex: 0,
    // 播放进度
    progress: 0,
    // 当前时间
    currentTime: '0:00',
    // 总时长
    duration: '0:00',
    // 是否显示播放器
    showPlayer: false,
    // 播放模式: loop-循环, single-单曲, random-随机
    playMode: 'loop',
    // 历年世界杯主题曲列表
    playlist: [
      {
        id: 1,
        title: 'The Cup of Life',
        artist: 'Ricky Martin',
        year: '1998 法国世界杯',
        cover: '/images/music/1998.jpg',
        url: 'https://music.163.com/song/media/outer/url?id=1696743.mp3'
      },
      {
        id: 2,
        title: 'The Time of Our Lives',
        artist: 'Il Divo & Toni Braxton',
        year: '2006 德国世界杯',
        cover: '/images/music/2006.jpg',
        url: 'https://music.163.com/song/media/outer/url?id=1696761.mp3'
      },
      {
        id: 3,
        title: 'Waka Waka',
        artist: 'Shakira',
        year: '2010 南非世界杯',
        cover: '/images/music/2010.jpg',
        url: 'https://music.163.com/song/media/outer/url?id=33211666.mp3'
      },
      {
        id: 4,
        title: 'We Are One',
        artist: 'Pitbull ft. Jennifer Lopez',
        year: '2014 巴西世界杯',
        cover: '/images/music/2014.jpg',
        url: 'https://music.163.com/song/media/outer/url?id=28445722.mp3'
      },
      {
        id: 5,
        title: 'Live It Up',
        artist: 'Nicky Jam',
        year: '2018 俄罗斯世界杯',
        cover: '/images/music/2018.jpg',
        url: 'https://music.163.com/song/media/outer/url?id=571338125.mp3'
      },
      {
        id: 6,
        title: 'Hayya Hayya',
        artist: 'Trinidad Cardona',
        year: '2022 卡塔尔世界杯',
        cover: '/images/music/2022.jpg',
        url: 'https://music.163.com/song/media/outer/url?id=1951069525.mp3'
      },
      {
        id: 7,
        title: 'A Special Kind of Hero',
        artist: 'Stephanie Lawrence',
        year: '1986 墨西哥世界杯',
        cover: '/images/music/1986.jpg',
        url: ''
      },
      {
        id: 8,
        title: 'Gloryland',
        artist: 'Daryl Hall',
        year: '1994 美国世界杯',
        cover: '/images/music/1994.jpg',
        url: ''
      }
    ]
  },

  lifetimes: {
    attached() {
      this.innerAudioContext = wx.createInnerAudioContext()
      this.setupAudioListeners()

      if (this.data.autoplay) {
        this.playMusic()
      }
    },

    detached() {
      if (this.innerAudioContext) {
        this.innerAudioContext.destroy()
      }
    }
  },

  methods: {
    // 设置音频监听器
    setupAudioListeners() {
      const audio = this.innerAudioContext

      audio.onPlay(() => {
        this.setData({ isPlaying: true })
        this.triggerEvent('play', { currentSong: this.data.playlist[this.data.currentIndex] })
      })

      audio.onPause(() => {
        this.setData({ isPlaying: false })
        this.triggerEvent('pause')
      })

      audio.onStop(() => {
        this.setData({ isPlaying: false, progress: 0, currentTime: '0:00' })
      })

      audio.onEnded(() => {
        this.nextSong()
      })

      audio.onTimeUpdate(() => {
        const currentTime = audio.currentTime
        const duration = audio.duration || 0
        const progress = duration > 0 ? (currentTime / duration) * 100 : 0

        this.setData({
          progress: progress.toFixed(1),
          currentTime: this.formatTime(currentTime),
          duration: this.formatTime(duration)
        })
      })

      audio.onError((err) => {
        console.error('音频播放错误:', err)
        wx.showToast({ title: '音频加载失败', icon: 'none' })
      })
    },

    // 格式化时间
    formatTime(seconds) {
      if (!seconds || isNaN(seconds)) return '0:00'
      const mins = Math.floor(seconds / 60)
      const secs = Math.floor(seconds % 60)
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },

    // 播放音乐
    playMusic() {
      const { playlist, currentIndex } = this.data
      const song = playlist[currentIndex]

      if (!song.url) {
        wx.showToast({ title: '该歌曲暂无法播放', icon: 'none' })
        return
      }

      this.innerAudioContext.src = song.url
      this.innerAudioContext.volume = this.data.volume
      this.innerAudioContext.play()
    },

    // 暂停/播放切换
    togglePlay() {
      if (this.data.isPlaying) {
        this.innerAudioContext.pause()
      } else {
        if (!this.innerAudioContext.src) {
          this.playMusic()
        } else {
          this.innerAudioContext.play()
        }
      }
    },

    // 上一首
    prevSong() {
      let { currentIndex, playlist, playMode } = this.data

      if (playMode === 'random') {
        currentIndex = Math.floor(Math.random() * playlist.length)
      } else {
        currentIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
      }

      this.setData({ currentIndex, progress: 0 })
      this.playMusic()
    },

    // 下一首
    nextSong() {
      let { currentIndex, playlist, playMode } = this.data

      if (playMode === 'random') {
        currentIndex = Math.floor(Math.random() * playlist.length)
      } else {
        currentIndex = currentIndex === playlist.length - 1 ? 0 : currentIndex + 1
      }

      this.setData({ currentIndex, progress: 0 })
      this.playMusic()
    },

    // 切换播放模式
    switchPlayMode() {
      const modes = ['loop', 'single', 'random']
      const currentMode = this.data.playMode
      const nextIndex = (modes.indexOf(currentMode) + 1) % modes.length
      const nextMode = modes[nextIndex]

      this.setData({ playMode: nextMode })

      const modeText = {
        loop: '列表循环',
        single: '单曲循环',
        random: '随机播放'
      }
      wx.showToast({ title: modeText[nextMode], icon: 'none' })

      // 更新播放模式
      if (nextMode === 'single') {
        this.innerAudioContext.loop = true
      } else {
        this.innerAudioContext.loop = false
      }
    },

    // 选择歌曲
    selectSong(e) {
      const index = e.currentTarget.dataset.index
      this.setData({ currentIndex: index, progress: 0 })
      this.playMusic()
    },

    // 显示/隐藏播放器
    togglePlayer() {
      this.setData({ showPlayer: !this.data.showPlayer })
    },

    // 进度条拖动
    onProgressChange(e) {
      const progress = e.detail.value
      const duration = this.innerAudioContext.duration || 0
      const currentTime = (progress / 100) * duration

      this.innerAudioContext.seek(currentTime)
      this.setData({ progress: progress.toFixed(1) })
    },

    // 音量调节
    onVolumeChange(e) {
      const volume = e.detail.value / 100
      this.innerAudioContext.volume = volume
      this.setData({ volume })
    }
  }
})
