@echo off
set name=%~n0%
set ver=%name:phone.compress=%
copy /b seaOriginal%ver%.js+h5Init.js phone%ver%.js
@echo compressing phone.js(ver:%ver%)
java -jar "./compilerTools/compiler.jar" --js phone%ver%.js --js_output_file phone%ver%
@echo compress success!(ver:%ver%)
del /F/Q phone%ver%.js
move phone%ver% phone%ver%.js
pause