@echo off
set name=%~n0%
set ver=%name:phone.combine=%
copy /b seaOriginal%ver%.js+pluginInit.js phone%ver%.js