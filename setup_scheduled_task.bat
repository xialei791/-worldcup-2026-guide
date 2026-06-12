@echo off
REM 设置 Windows 定时任务 - 每天13点更新世界杯数据

echo ================================================
echo   设置 Windows 定时任务
echo   任务名称: WorldCup2026_DataUpdate
echo   执行时间: 每天 13:00
echo ================================================
echo.

REM 获取脚本所在目录的绝对路径
set SCRIPT_DIR=%~dp0
set SCRIPT_DIR=%SCRIPT_DIR:~0,-1%
set BATCH_FILE=%SCRIPT_DIR%\update_data.bat

echo 脚本路径: %BATCH_FILE%
echo.

REM 删除旧任务（如果存在）
schtasks /delete /tn "WorldCup2026_DataUpdate" /f >nul 2>&1

REM 创建新定时任务 - 每天13点执行
schtasks /create /tn "WorldCup2026_DataUpdate" /tr "\"%BATCH_FILE%\"" /sc daily /st 13:00 /f

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ✅ 定时任务设置成功！
    echo.
    echo 任务详情:
    schtasks /query /tn "WorldCup2026_DataUpdate" /fo LIST
    echo.
    echo 💡 提示: 如需修改执行时间，请编辑本文件中的 /st 参数
    echo 💡 格式: HH:MM (24小时制)
) else (
    echo.
    echo ❌ 定时任务设置失败！
    echo 请确保以管理员权限运行此脚本。
)

echo.
echo ================================================
echo   按任意键关闭窗口...
echo ================================================
pause > nul