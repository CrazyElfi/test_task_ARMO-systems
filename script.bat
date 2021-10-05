@echo off
title This is your first batch script!

echo Installing npm dependencies
call npm i &
@REM
echo cd ./python/
call cd ./python/ &

echo Installing tornado
call pip3 install tornado &

echo Running tornado
START /B python3 index.py &

echo cd ..
cd ..

echo Running electron
npm run start &

pause