# 2026世界杯观赛指南 - 网页版

这是一个响应式的网页版本 2026 FIFA 世界杯观赛指南，支持桌面和移动端访问。

## 功能特性

### 🏠 首页
- **倒计时**: 实时显示距离世界杯开幕的时间
- **快捷入口**: 快速跳转到各功能页面
- **今日焦点战**: 展示当天重要比赛
- **高级动画**: 背景动画、数字脉冲、卡片悬浮等

### 📅 日历
- **月历视图**: 查看整个赛事期间的比赛分布
- **日期标记**: 
  - 🔴 今天
  - 🟢 有比赛
  - 🟠 焦点战
- **点击跳转**: 点击日期查看当日比赛

### 🏆 积分榜
- **小组积分榜**: 12个小组的实时排名
  - 金银铜牌标识前三名
  - 晋级队伍高亮显示
- **总积分榜**: 所有球队综合排名
- **动画切换**: 平滑的排名切换动画

### ⚽ 赛程
- **全部赛程**: 按时间顺序排列的所有比赛
- **阶段筛选**: 按小组赛/淘汰赛筛选
- **比分显示**: 实时比分和状态

### 👥 球队
- **48支球队**: 展示所有参赛球队
- **国旗展示**: 使用 CDN 国旗图片
- **分组信息**: 显示球队所在小组

### 🎵 音乐播放器
- **历年主题曲**: 1998-2022年世界杯主题曲
- **播放控制**: 播放/暂停/上一首/下一首
- **播放模式**: 顺序/随机/单曲循环
- **迷你/全屏**: 两种显示模式
- **黑胶唱片动画**: 旋转效果

### 📱 响应式设计
- 完美适配桌面、平板、手机
- 移动端优化导航和布局

## 部署方式

### 方式一：静态托管（推荐）

#### 1. GitHub Pages
```bash
# 1. 创建 GitHub 仓库
# 2. 上传 web 文件夹内容到仓库
# 3. 在仓库 Settings -> Pages 中启用 GitHub Pages
# 4. 选择 main 分支作为源
```

#### 2. Vercel
```bash
# 1. 注册 Vercel 账号
# 2. 导入 GitHub 仓库
# 3. 框架预设选择 "Other"
# 4. 输出目录设置为 web
# 5. 自动部署完成
```

#### 3. Netlify
```bash
# 1. 拖拽 web 文件夹到 Netlify 上传区域
# 2. 自动部署，获得 .netlify.app 域名
```

#### 4. 腾讯云/阿里云 OSS
```bash
# 1. 购买对象存储服务
# 2. 创建存储桶，开启静态网站托管
# 3. 上传 web 文件夹内所有文件
# 4. 配置 CDN 加速（可选）
```

### 方式二：服务器部署

#### Nginx 配置
```nginx
server {
    listen 80;
    server_name worldcup2026.yourdomain.com;
    root /var/www/worldcup2026;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }

    # 开启 gzip 压缩
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
}
```

#### Apache 配置
```apache
<VirtualHost *:80>
    ServerName worldcup2026.yourdomain.com
    DocumentRoot /var/www/worldcup2026
    
    <Directory /var/www/worldcup2026>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

## 文件结构

```
web/
├── index.html          # 主页面
├── css/
│   ├── style.css       # 主样式文件
│   └── music-player.css # 音乐播放器样式
├── js/
│   ├── data.js         # 数据文件
│   └── app.js          # 应用逻辑
└── README.md           # 说明文档
```

## 自定义配置

### 修改数据源
编辑 `js/data.js` 文件：
- `matchesData`: 比赛数据
- `teamsData`: 球队数据
- `groupStandings`: 小组积分榜
- `musicPlaylist`: 音乐播放列表

### 更换国旗图片
当前使用 flagcdn.com 的国旗图片，可以在 `data.js` 中替换为：
```javascript
{ id: 'chn', name: '中国', flag: 'https://你的CDN链接/chn.png', group: 'A' }
```

### 添加音乐链接
在 `data.js` 的 `musicPlaylist` 中添加真实的音频 URL：
```javascript
{
    id: 1,
    title: '歌曲名',
    artist: '歌手',
    year: '年份',
    cover: '封面图片链接',
    url: '音频文件链接.mp3'
}
```

## 浏览器兼容性

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+
- 移动端 iOS Safari / Chrome

## 技术栈

- **HTML5**: 语义化标签
- **CSS3**: Flexbox/Grid、动画、响应式设计
- **JavaScript**: ES6+、原生 DOM 操作
- **Font Awesome**: 图标库
- **Google Fonts**: Noto Sans SC 中文字体

## 性能优化

- 图片懒加载（可扩展）
- CSS/JS 压缩（生产环境）
- CDN 资源加速
- 动画性能优化（使用 transform/opacity）

## 许可证

仅供学习交流使用，世界杯相关商标归 FIFA 所有。

## 更新日志

### v1.0.0 (2026-06-11)
- ✨ 初始版本发布
- ✨ 完整实现所有功能模块
- ✨ 响应式设计适配
