::SIMPLEOPTIMIZATIONS | ADVANCEDOPTIMIZATIONS
@echo off
set name=%~n0%
set ver=%name:sea.compress_lib=%
node getCompressedLibWithOutSea.nodejs %ver%
@echo compressing sea.js(ver:%ver%)
java -jar "./compilerTools/compiler.jar" --js sea%ver%.js --js_output_file sea%ver%
@echo compress success!(ver:%ver%)
del /F/Q sea%ver%.js
move sea%ver% sea%ver%.js
pause