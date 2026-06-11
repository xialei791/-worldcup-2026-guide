# 🔄 数据自动更新系统

本项目支持从公开数据源自动更新2026世界杯数据。

## 功能特点

- ✅ **自动每日更新** - 每天北京时间 10:00 自动检查并更新数据
- ✅ **手动触发** - 支持随时手动运行更新
- ✅ **智能检测** - 仅在有数据变化时才提交更新
- ✅ **多数据源** - 支持 FIFA、各大洲足联等公开数据

## 数据来源

当前使用的数据来源：

| 数据类型 | 来源 | 更新频率 |
|---------|------|---------|
| 球队名单 | FIFA官网 + 各大洲足联 | 每日 |
| 赛程安排 | FIFA官方赛程 | 每周 |
| 积分榜 | 预选赛实时结果 | 每日 |
| FIFA排名 | FIFA世界排名 | 每月 |

## 手动运行更新

### 方式一：本地运行

```bash
# 进入项目目录
cd worldcup-2026-guide

# 运行更新脚本
node scripts/update-data.js

# 提交更改
git add js/data.js
git commit -m "更新世界杯数据"
git push origin main
```

### 方式二：GitHub Actions 手动触发

1. 打开 GitHub 仓库页面
2. 点击 **Actions** 标签
3. 选择 **Update World Cup Data** 工作流
4. 点击 **Run workflow** 按钮
5. 输入更新原因（可选）
6. 点击 **Run workflow**

## 自动更新配置

自动更新已配置为每天运行：

```yaml
# .github/workflows/update-data.yml
cron: '0 2 * * *'  # UTC 02:00 = 北京时间 10:00
```

### 修改更新频率

编辑 `.github/workflows/update-data.yml`：

```yaml
# 每小时更新
cron: '0 * * * *'

# 每周一更新
cron: '0 2 * * 1'

# 每月1日更新
cron: '0 2 1 * *'
```

## 数据更新内容

### 已确定晋级球队

目前预选赛进展：

- ✅ **主办国**: 美国、加拿大、墨西哥（3支）
- ✅ **南美区**: 阿根廷、巴西、乌拉圭、巴拉圭、厄瓜多尔（5支已确定）
- ✅ **亚洲区**: 日本、伊朗、韩国、乌兹别克斯坦（4支已确定）
- ⏳ **欧洲区**: 16个名额，预选赛进行中
- ⏳ **非洲区**: 9个名额，预选赛进行中
- ⏳ **北美区**: 3个名额+2个附加赛
- ⏳ **大洋洲**: 1个名额

### 更新日志

查看 `js/data.js` 文件顶部的 `lastUpdate` 字段：

```javascript
const worldCupData = {
    // ...
    lastUpdate: '2024-06-12T10:30:00.000Z'
};
```

## 数据源扩展

### 添加 FIFA API 支持

1. 获取 FIFA API Key (https://www.fifa.com/api)
2. 添加到 GitHub Secrets：
   - 名称: `FIFA_API_KEY`
   - 值: 你的API密钥
3. 修改 `scripts/update-data.js`：

```javascript
const DATA_SOURCES = {
    fifa: {
        url: 'https://api.fifa.com/api/v3/',
        apiKey: process.env.FIFA_API_KEY,
        enabled: true
    }
};
```

### 添加其他数据源

在 `scripts/update-data.js` 中添加新的数据获取函数：

```javascript
async function fetchFromNewSource() {
    try {
        const response = await axios.get('https://api.example.com/worldcup');
        return response.data;
    } catch (error) {
        console.error('数据源获取失败:', error);
        return null;
    }
}
```

## 故障排除

### 更新失败

检查 GitHub Actions 日志：
1. 打开仓库 → Actions 标签
2. 点击失败的 workflow 运行记录
3. 查看错误信息

常见问题：
- **API 限制**: 免费 API 有请求限制，考虑添加延迟
- **网络问题**: 检查 GitHub Actions 网络状态
- **权限问题**: 确保 `GITHUB_TOKEN` 有写入权限

### 数据未更新

1. 检查数据是否有实际变化
2. 手动运行脚本测试：
   ```bash
   node scripts/update-data.js
   ```
3. 查看 `js/data.js` 文件内容是否已更改

## 安全注意事项

- ✅ 不要将 API 密钥提交到代码仓库
- ✅ 使用 GitHub Secrets 存储敏感信息
- ✅ 定期轮换 API 密钥
- ✅ 限制 API 密钥的访问范围

## 贡献

如果你想改进数据更新系统：

1. Fork 本仓库
2. 修改 `scripts/update-data.js`
3. 提交 Pull Request

## 许可证

数据仅供学习交流使用，世界杯相关商标归 FIFA 所有。
