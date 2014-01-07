@echo off
set name=%~n0%
set ver=%name:sea.combine=%
copy /b repeatTestStart+seaOriginal%ver%.js+pluginInit.js+repeatTestEnd sea%ver%.js