# 2026 世界杯数据自动更新系统

## 数据源

- **API**: [worldcup26.ir](https://worldcup26.ir) - GitHub 开源 API
- **更新频率**: 每天 13:00 自动更新
- **数据内容**: 球队、比赛、积分榜、球场

## 文件说明

| 文件 | 说明 |
|------|------|
| `update_data.py` | 从 API 拉取数据并转换 |
| `convert_api_data.py` | 将 API 数据转换为项目格式 |
| `data/data.json` | 转换后的数据（网页读取） |
| `js/data-loader.js` | JavaScript 数据加载器 |
| `update_data.bat` | Windows 批处理脚本 |
| `setup_scheduled_task.bat` | 设置定时任务 |

## 手动更新数据

```bash
py update_data.py
```

或直接运行：
```
update_data.bat
```

## 设置自动更新

### Windows 定时任务

1. 以**管理员身份**运行 `setup_scheduled_task.bat`
2. 脚本会创建名为 `WorldCup2026_DataUpdate` 的定时任务
3. 每天下午 13:00 自动执行更新

### 查看定时任务

```bash
schtasks /query /tn "WorldCup2026_DataUpdate" /fo LIST
```

### 删除定时任务

```bash
schtasks /delete /tn "WorldCup2026_DataUpdate" /f
```

### 修改执行时间

编辑 `setup_scheduled_task.bat` 中的 `/st 13:00` 为所需时间（24小时制）。

## 数据格式

### data/data.json 结构

```json
{
  "teamsData": [
    {
      "id": "br",
      "name": "Brazil",
      "nameEn": "Brazil",
      "flag": "https://flagcdn.com/w80/br.png",
      "conf": "CONMEBOL",
      "group": "C",
      "rank": null
    }
  ],
  "matchesData": [
    {
      "id": "match_1",
      "date": "2026-06-11",
      "time": "13:00",
      "home": "mx",
      "away": "za",
      "homeScore": 2,
      "awayScore": 0,
      "status": "finished",
      "group": "A组",
      "stage": "group",
      "stadium": "Estadio Azteca",
      "important": false
    }
  ],
  "groupStandings": {
    "A": [
      {
        "team": "mx",
        "mp": 1,
        "w": 1,
        "d": 0,
        "l": 0,
        "gf": 2,
        "ga": 0,
        "gd": 2,
        "pts": 3
      }
    ]
  },
  "_last_updated": "2026-06-12T10:00:11.123456"
}
```

## 故障排除

### 错误: 无法连接到 API

- 检查网络连接
- 确认 API 网站可访问: https://worldcup26.ir

### 错误: 编码问题

- Windows 控制台默认使用 GBK 编码，脚本已自动处理

### 网页显示旧数据

1. 清除浏览器缓存
2. 检查 `data/data.json` 文件是否更新
3. 打开浏览器开发者工具查看日志

## API 信息

- **端点**: https://worldcup26.ir
- **文档**: https://worldcup26.ir/api-docs
- **类型**: 免费开源 REST API
- **认证**: 无需认证（读取）