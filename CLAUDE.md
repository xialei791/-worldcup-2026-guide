# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Language Requirement

**All responses must be in Chinese (中文)**. This includes all explanations, comments, and user communications. Technical terms and code identifiers should remain in their original form (e.g., variable names, function names, file paths).

Maintain full orthographic correctness for Chinese, including all required diacritical marks, accents, and special characters.

## Project Overview

This is a **2026 FIFA World Cup Viewing Guide** (世界杯观赛指南) - a responsive web application for tracking matches, standings, teams, and schedules for the 2026 World Cup hosted across USA, Canada, and Mexico.

The codebase contains multiple deployment targets:
- **Web version** (`index.html`, `js/`, `css/`) - Main responsive web application
- **Enhanced web version** (`web/` folder) - Includes match prediction features (predict.css)
- **WeChat Mini Program** (`app.json`, `app.js`) - Mini program configuration
- **Electron app** (`main.js`) - Desktop Pomodoro timer (legacy, unrelated to World Cup)
- **Static server** (`server.js`) - Simple Node.js HTTP server

## Common Commands

### Run the Static Web Server
```bash
node server.js
# Serves on http://localhost:8080
# Serves index-browser.html as the default page
```

### Run the Electron App (Pomodoro Timer)
```bash
npm start        # Production mode
npm run dev      # Development mode with --dev flag
```

### Package Management
```bash
npm install      # Install Electron dependencies only
```

**Note:** The web version is pure HTML/CSS/JS and requires no build step. Simply open `index.html` in a browser or use the Node.js server.

## Architecture

### Data Flow

All match data flows from `js/data.js` → `js/app.js` → DOM:

1. **Data Source** (`js/data.js`):
   - `matchesData` - Array of all 104 matches with IDs, dates, scores, status
   - `teamsData` - 48 team objects generated from Elo ratings
   - `groupStandings` - Group tables (A-L, 12 groups total)
   - `overallStandings` - Combined ranking across all teams
   - `musicPlaylist` - World Cup theme songs (1998-2022)
   - `headToHeadData` - Historical match records between teams
   - `tacticalData` - Team playing styles and tactical analysis

2. **Data Structures**:
   ```javascript
   // Match object
   { id, date, time, home, away, homeScore, awayScore, status, group, stage, stadium, important }

   // Team object (generated)
   { id, name, flag, group, conf, elo }

   // Standing entry
   { team, mp, w, d, l, gf, ga, gd, pts }
   ```

3. **Team ID System**: Teams use 2-letter country codes (ISO 3166-1 alpha-2) as IDs for flag URLs via flagcdn.com (e.g., `br` for Brazil, `gb-eng` for England).

### Module Organization (`js/app.js`)

Initialization order (all triggered on DOMContentLoaded):
1. `initCountdown()` - World Cup start date countdown timer
2. `initCalendar()` - Monthly calendar with match indicators
3. `initStandings()` - Group tables and overall rankings
4. `initMatches()` - Full match list with stage filtering
5. `initTeams()` - 48-team grid display
6. `initMusicPlayer()` - Theme song player with mini/full modes
7. `initNavigation()` - Mobile hamburger menu, smooth scroll
8. `initTodayMatches()` - "Today's featured matches" section
9. `initModal()` - Match detail modal

### External Dependencies

- **Font Awesome 6.4.0** - Icons (loaded from CDN)
- **Google Fonts** - Noto Sans SC for Chinese text (loaded from CDN)
- **flagcdn.com** - Country flag images (80px width)

### File Structure

```
├── index.html              # Main web app entry point
├── index-browser.html      # Browser-specific version (server default)
├── server.js               # Node.js static file server (port 8080)
├── app.js                  # WeChat Mini Program app entry
├── app.json                # Mini Program page configuration
├── main.js                 # Electron main process (Pomodoro timer)
├── js/
│   ├── data.js             # All World Cup data (teams, matches, standings)
│   └── app.js              # Main application logic
├── css/
│   ├── style.css           # Main stylesheet
│   └── music-player.css    # Music player component styles
└── web/                    # Enhanced version with prediction features
    ├── index.html
    └── css/predict.css
```

### WeChat Mini Program

Configuration in `app.json`:
- Pages: index, schedule, teams, matches, stadiums, news, detail, calendar, day-matches, match-detail
- Tab bar with 4 tabs: 首页 (Home), 日历 (Calendar), 赛程 (Schedule), 球队 (Teams)
- Brand color: `#1a5f2a` (World Cup green)

## Key Implementation Notes

- **Simulated "Today"**: The web app uses `2026-06-13` as a hardcoded "today" date for demo purposes (see `initTodayMatches()` in `js/app.js:42`)
- **Date Format**: All dates use ISO format `YYYY-MM-DD`
- **Match Status**: `upcoming`, `live`, `finished` - controls score display (VS vs actual scores)
- **Responsive Breakpoints**: Mobile navigation activates via hamburger menu; CSS handles layout changes
- **No Framework**: Pure vanilla JavaScript with no build tools or bundlers required
