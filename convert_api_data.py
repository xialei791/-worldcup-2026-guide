"""
将 worldcup26.ir API 数据转换成项目所需格式
"""

import json
from datetime import datetime

# FIFA 国家代码映射 (API ISO2 -> 项目 ID)
ISO2_TO_ID = {
    'mx': 'mx', 'za': 'za', 'kr': 'kr', 'cz': 'cz',
    'ca': 'ca', 'ch': 'ch', 'qa': 'qa', 'ba': 'ba',
    'us': 'us', 'au': 'au', 'py': 'py', 'tr': 'tr',
    'br': 'br', 'ma': 'ma', 'ht': 'ht', 'gb-sct': 'gb-sct',
    'de': 'de', 'ci': 'ci', 'ec': 'ec', 'se': 'se',
    'nl': 'nl', 'jp': 'jp', 'tn': 'tn', 'nz': 'nz',
    'be': 'be', 'eg': 'eg', 'ir': 'ir', 'cv': 'cv',
    'es': 'es', 'sa': 'sa', 'uy': 'uy', 'gb-wls': 'gb-wls',
    'fr': 'fr', 'sn': 'sn', 'no': 'no', 'iq': 'iq',
    'ar': 'ar', 'dz': 'dz', 'at': 'at', 'jo': 'jo',
    'pt': 'pt', 'co': 'co', 'uz': 'uz', 'cd': 'cd',
    'gb-eng': 'gb-eng', 'hr': 'hr', 'gh': 'gh', 'pa': 'pa'
}

# 阶段映射
TYPE_TO_STAGE = {
    'group': 'group',
    'r32': 'round16',
    'r16': 'quarter',
    'qf': 'quarter',
    'sf': 'semi',
    'third': 'third',
    'final': 'final'
}

def load_json(filename):
    """加载 JSON 文件"""
    with open(filename, 'r', encoding='utf-8') as f:
        return json.load(f)

def convert_teams(api_teams):
    """转换球队数据"""
    teams = []
    for team in api_teams['teams']:
        iso2 = team.get('iso2', '').lower()
        teams.append({
            'id': ISO2_TO_ID.get(iso2, iso2),
            'name': team.get('name_en', team.get('name_fa', '')),
            'nameEn': team.get('name_en', ''),
            'flag': team.get('flag', ''),
            'conf': get_confederation(iso2),
            'group': team.get('groups', ''),
            'rank': None
        })
    return teams

def convert_matches(api_matches, api_teams, api_stadiums):
    """转换比赛数据"""
    # 创建球队映射 (id -> iso2)
    team_map = {t['id']: t.get('iso2', '') for t in api_teams['teams']}
    # 创建球场映射 (id -> name)
    stadium_map = {s['id']: s.get('name_en', '') for s in api_stadiums['stadiums']}

    matches = []
    for game in api_matches['games']:
        home_iso2 = team_map.get(game.get('home_team_id', ''), '').lower()
        away_iso2 = team_map.get(game.get('away_team_id', ''), '').lower()

        # 解析日期
        local_date = game.get('local_date', '')
        date_part = local_date.split(' ')[0] if ' ' in local_date else local_date
        time_part = local_date.split(' ')[1] if ' ' in local_date else '00:00'

        # 转换日期格式 MM/DD/YYYY -> YYYY-MM-DD
        try:
            month, day, year = date_part.split('/')
            date_iso = f"{year}-{month.zfill(2)}-{day.zfill(2)}"
        except:
            date_iso = '2026-06-11'

        # 状态
        finished = game.get('finished', 'FALSE') == 'TRUE'
        if finished:
            status = 'finished'
        elif game.get('time_elapsed') == 'live':
            status = 'live'
        else:
            status = 'upcoming'

        matches.append({
            'id': f"match_{game.get('id', '')}",
            'date': date_iso,
            'time': time_part,
            'home': ISO2_TO_ID.get(home_iso2, home_iso2),
            'away': ISO2_TO_ID.get(away_iso2, away_iso2),
            'homeScore': int(game.get('home_score', 0)) if game.get('home_score') != 'null' else None,
            'awayScore': int(game.get('away_score', 0)) if game.get('away_score') != 'null' else None,
            'status': status,
            'group': f"{game.get('group', '')}组",
            'stage': TYPE_TO_STAGE.get(game.get('type', ''), game.get('type', '')),
            'stadium': stadium_map.get(game.get('stadium_id', ''), ''),
            'important': False  # 可以根据需要标记焦点战
        })
    return matches

def convert_groups(api_groups, api_teams):
    """转换小组积分榜数据"""
    # 创建球队映射 (id -> iso2)
    team_map = {t['id']: t.get('iso2', '') for t in api_teams['teams']}

    standings = {}
    for group in api_groups.get('groups', []):
        group_name = group.get('group', '')
        team_standings = []

        for team_data in group.get('teams', []):
            team_iso2 = team_map.get(team_data.get('team_id', ''), '').lower()
            team_standings.append({
                'team': ISO2_TO_ID.get(team_iso2, team_iso2),
                'mp': int(team_data.get('mp', 0)),
                'w': int(team_data.get('w', 0)),
                'd': int(team_data.get('d', 0)),
                'l': int(team_data.get('l', 0)),
                'gf': int(team_data.get('gf', 0)),
                'ga': int(team_data.get('ga', 0)),
                'gd': int(team_data.get('gf', 0)) - int(team_data.get('ga', 0)),
                'pts': int(team_data.get('pts', 0))
            })

        # 按积分排序
        team_standings.sort(key=lambda x: (-x['pts'], -x['gd'], -x['gf']))
        standings[group_name] = team_standings

    return standings

def get_confederation(iso2):
    """根据 ISO2 代码获取足联"""
    conf_map = {
        # CONMEBOL (南美)
        'ar': 'CONMEBOL', 'br': 'CONMEBOL', 'uy': 'URUGUAY',
        'py': 'CONMEBOL', 'co': 'CONMEBOL', 'ec': 'CONMEBOL',
        # UEFA (欧洲)
        'de': 'UEFA', 'fr': 'ESPAÑA', 'es': 'UEFA', 'pt': 'UEFA',
        'nl': 'NL', 'be': 'BE', 'it': 'ITALY', 'gb-eng': 'UEFA',
        'gb-sct': 'UEFA', 'gb-wls': 'UEFA', 'hr': 'UEFA',
        'cz': 'UEFA', 'se': 'UEFA', 'no': 'UEFA', 'at': 'UEFA',
        'ua': 'UEFA', 'dk': 'UEFA', 'ch': 'UEFA', 'tr': 'UEFA',
        # AFC (亚洲)
        'jp': 'AFC', 'kr': 'AFC', 'ir': 'AFC', 'sa': 'AFC',
        'qa': 'AFC', 'uz': 'AFC', 'jo': 'AFC', 'iq': 'AFC',
        # CAF (非洲)
        'za': 'CAF', 'eg': 'CAF', 'ma': 'CAF', 'ci': 'CAF',
        'tn': 'CAF', 'dz': 'CAF', 'sn': 'CAF', 'gh': 'AFRICA',
        # CONCACAF (中北美)
        'us': 'CONCACAF', 'mx': 'CONCACAF', 'ca': 'CONCACAF',
        'au': 'OFC', 'nz': 'OFC',
        'panama': 'CONCACAF'
    }
    return conf_map.get(iso2, 'Unknown')

def convert_all():
    """转换所有数据"""
    print("=" * 50)
    print("[START] 开始转换数据")
    print("=" * 50)

    # 加载 API 数据
    print("[LOAD] 加载 API 数据...")
    api_teams = load_json('data/teams.json')
    api_matches = load_json('data/matches.json')
    api_groups = load_json('data/groups.json')
    api_stadiums = load_json('data/stadiums.json')

    # 转换数据
    print("[CONVERT] 转换数据格式...")
    teams = convert_teams(api_teams)
    matches = convert_matches(api_matches, api_teams, api_stadiums)
    groups = convert_groups(api_groups, api_teams)

    # 保存转换后的数据
    print("[SAVE] 保存转换后的数据...")
    output_data = {
        'teamsData': teams,
        'matchesData': matches,
        'groupStandings': groups,
        '_last_updated': datetime.now().isoformat()
    }

    with open('data/data.json', 'w', encoding='utf-8') as f:
        json.dump(output_data, f, ensure_ascii=False, indent=2)

    print("=" * 50)
    print(f"[DONE] 转换完成!")
    print(f"       球队: {len(teams)}")
    print(f"       比赛: {len(matches)}")
    print(f"       小组: {len(groups)}")
    print("=" * 50)

if __name__ == "__main__":
    convert_all()