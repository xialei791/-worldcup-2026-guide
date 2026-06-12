@echo off
REM 每天13点自动更新世界杯数据脚本
REM 使用 Windows 任务计划程序设置定时执行

echo ================================================
echo   2026 世界杯数据自动更新脚本
echo ================================================
echo.

cd /d "%~dp0"
echo 当前目录: %CD%
echo.

python update_data.py
if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 数据更新成功！
) else (
    echo.
    echo ❌ 数据更新失败！
    echo 请检查网络连接或 API 是否可用。
)

echo.
echo ================================================
echo   按任意键关闭窗口...
echo ================================================
pause > nul