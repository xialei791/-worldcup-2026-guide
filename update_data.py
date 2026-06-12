"""
从 worldcup26.ir API 拉取世界杯数据并保存到 JSON 文件
每天定时运行：cron 0 13 * * * python update_data.py
"""

import json
import requests
from datetime import datetime
import os
import sys

# Windows 控制台编码修复
if sys.platform == 'win32':
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

# API 配置
API_BASE_URL = "https://worldcup26.ir"
DATA_DIR = "data"

# API 端点
ENDPOINTS = {
    "matches": "/get/games",
    "groups": "/get/groups",
    "teams": "/get/teams",
    "stadiums": "/get/stadiums"
}

def ensure_data_dir():
    """确保 data 目录存在"""
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        print(f"[OK] 创建目录: {DATA_DIR}")

def fetch_data(endpoint_name):
    """从 API 拉取数据"""
    url = f"{API_BASE_URL}{ENDPOINTS[endpoint_name]}"
    print(f"[FETCH] 拉取 {endpoint_name} 数据...")
    print(f"       URL: {url}")

    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        data = response.json()

        # 添加更新时间戳
        data["_last_updated"] = datetime.now().isoformat()
        data["_source"] = "worldcup26.ir"

        print(f"[OK] 成功获取 {endpoint_name} 数据")
        return data
    except requests.exceptions.RequestException as e:
        print(f"[ERROR] 拉取 {endpoint_name} 失败: {e}")
        return None

def save_data(data, filename):
    """保存数据到 JSON 文件"""
    filepath = os.path.join(DATA_DIR, filename)
    try:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"[SAVE] 数据已保存: {filepath}")
        return True
    except Exception as e:
        print(f"[ERROR] 保存 {filename} 失败: {e}")
        return False

def update_all():
    """更新所有数据"""
    print("=" * 50)
    print(f"[START] 开始更新 2026 世界杯数据")
    print(f"[TIME] {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print("=" * 50)

    ensure_data_dir()

    success_count = 0
    total_count = len(ENDPOINTS)

    # 1. 拉取 API 数据
    for endpoint_name in ENDPOINTS.keys():
        data = fetch_data(endpoint_name)
        if data:
            if save_data(data, f"{endpoint_name}.json"):
                success_count += 1

    # 2. 转换数据格式
    if success_count == total_count:
        print("[CONVERT] 开始转换数据格式...")
        try:
            import convert_api_data
            convert_api_data.convert_all()
            print("[OK] 数据转换完成")
        except Exception as e:
            print(f"[ERROR] 数据转换失败: {e}")
    else:
        print("[SKIP] API 数据不完整，跳过转换")

    print("=" * 50)
    print(f"[RESULT] 更新完成: {success_count}/{total_count} 项成功")
    print("=" * 50)

    return success_count == total_count

if __name__ == "__main__":
    success = update_all()
    exit(0 if success else 1)