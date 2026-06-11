# 🌐 GitHub Pages 部署指南

## 快速部署步骤

### 1. 创建 GitHub 仓库

在 GitHub 上创建一个新仓库，将代码推送上去：

```bash
# 初始化仓库（如果还没做）
git init
git add .
git commit -m "Initial commit: 2026世界杯观赛指南"

# 关联远程仓库并推送
git remote add origin https://github.com/你的用户名/仓库名.git
git branch -M main
git push -u origin main
```

### 2. 启用 GitHub Pages

**方法一：自动部署（推荐）**

项目已包含 `.github/workflows/deploy.yml`，推送后会自动部署。

**方法二：手动启用**

1. 进入仓库的 **Settings** → **Pages**
2. 在 **Source** 部分选择 **Deploy from a branch**
3. 选择 **main** 分支和 **/(root)** 文件夹
4. 点击 **Save**

### 3. 访问网站

部署完成后，访问地址：
```
https://你的用户名.github.io/仓库名/
```

## 📁 项目结构说明

```
├── index.html          # 主页面入口
├── preview.html        # 项目预览/介绍页
├── css/                # 样式文件
│   ├── style.css
│   └── music-player.css
├── js/                 # JavaScript 文件
│   ├── data.js
│   └── app.js
└── .github/workflows/  # 自动部署配置
    └── deploy.yml
```

## 🔧 自定义域名（可选）

1. 在仓库根目录创建 `CNAME` 文件：
   ```
   www.yourdomain.com
   ```

2. 在你的域名 DNS 设置中添加 CNAME 记录：
   - 主机记录：`www`
   - 记录值：`你的用户名.github.io`

3. 在仓库 Settings → Pages 中配置 Custom domain

## ⚠️ 注意事项

1. **资源路径**：所有资源使用相对路径（`./css/`、`./js/`），确保在子目录部署时正常
2. **CDN 资源**：项目使用外部 CDN（Font Awesome、Google Fonts），确保网络通畅
3. **数据更新**：编辑 `js/data.js` 更新比赛数据、比分等信息

## 🚀 更新网站

每次推送代码到 main 分支，GitHub Actions 会自动重新部署：

```bash
git add .
git commit -m "更新比赛数据"
git push origin main
```

约 1-2 分钟后网站会自动更新。

## 📱 预览页面

项目包含 `preview.html` 作为展示页面，可以在 GitHub Pages 访问：
```
https://你的用户名.github.io/仓库名/preview.html
```

建议将 `index.html` 作为主应用，`preview.html` 作为项目介绍页。

## 🛠️ 故障排除

### 页面显示 404
- 检查仓库是否公开（Settings → General → Visibility）
- 确认 Pages 设置中的分支正确
- 等待 1-2 分钟让部署完成

### 样式或脚本未加载
- 检查浏览器控制台是否有 404 错误
- 确认资源路径是相对路径（以 `./` 或没有斜杠开头）

### 中文显示异常
- 确认 HTML 文件有 `<meta charset="UTF-8">`
- 检查文件编码为 UTF-8
