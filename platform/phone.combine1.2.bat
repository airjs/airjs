@echo off
set name=%~n0%
set ver=%name:phone.combine=%
copy /b seaOriginal%ver%.js+h5Init.js phone%ver%.js
pause