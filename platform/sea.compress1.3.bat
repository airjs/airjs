::SIMPLEOPTIMIZATIONS | ADVANCEDOPTIMIZATIONS
@echo off
set name=%~n0%
set ver=%name:sea.compress=%
call sea.combine%ver%.bat compressedLibWithOutSea.js
java -jar "./compilerTools/compiler.jar" --js sea%ver%.js --js_output_file sea%ver%
del /F/Q sea%ver%.js
move sea%ver% sea%ver%.js