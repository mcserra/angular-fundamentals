SET DIRECTORY_NAME="C:\Users\mcserra\Documents\Angular\Fundamentals\ng-fundamentals\node_modules"
TAKEOWN /f %DIRECTORY_NAME% /r /d y
ICACLS %DIRECTORY_NAME% /grant administrators:F /t
PAUSE