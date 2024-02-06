@echo off
chcp 65001 > nul
setlocal enabledelayedexpansion

set "inputFile=name.txt"
set "outputFile=name.json"

echo [ > %outputFile%

for /f "tokens=1,* delims=:" %%a in (%inputFile%) do (
    set "value=%%a"
    set "label=%%b"
    rem 移除前导和尾随空格
    for /f "tokens=* delims= " %%c in ("!value!") do set "value=%%c"
    for /f "tokens=* delims= " %%d in ("!label!") do set "label=%%d"
    echo   { >> %outputFile%
    echo     "label": "!label!", >> %outputFile%
    echo     "value": !value! >> %outputFile%
    echo   }, >> %outputFile%
)

echo ] >> %outputFile%

echo 
