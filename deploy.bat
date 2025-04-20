@echo off
echo Preparing for Vercel deployment...
echo.
echo This script will:
echo 1. Check if WordPress is running
echo 2. Build your Next.js application
echo 3. Add the 'out' directory to Git
echo 4. Commit and push the changes
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause > nul

REM Check if WordPress is running
echo Checking if WordPress is running locally...
powershell -Command "try { $response = Invoke-WebRequest -Uri 'http://localhost:8080' -UseBasicParsing -TimeoutSec 5; Write-Host 'WordPress is running at http://localhost:8080' -ForegroundColor Green } catch { Write-Host 'Warning: Could not connect to WordPress at http://localhost:8080' -ForegroundColor Yellow; Write-Host 'This might be because:' -ForegroundColor Yellow; Write-Host '1. WordPress is not running' -ForegroundColor Yellow; Write-Host '2. WordPress is running on a different port' -ForegroundColor Yellow; Write-Host '3. There might be network/firewall issues' -ForegroundColor Yellow; Write-Host ''; $continue = Read-Host 'Do you want to continue anyway? (y/n)'; if ($continue -ne 'y') { exit 1 } else { Write-Host 'Continuing with deployment...' -ForegroundColor Cyan } }"

if %ERRORLEVEL% NEQ 0 (
    echo WordPress check failed. Do you want to continue anyway? (y/n)
    set /p CONTINUE=
    if /i "%CONTINUE%" NEQ "y" (
        echo Deployment aborted.
        exit /b 1
    )
    echo Continuing with deployment...
)

REM Build the Next.js application
echo Building Next.js application...
call npm run build

if %ERRORLEVEL% NEQ 0 (
    echo Build failed. Please check the errors above.
    exit /b 1
)

REM Check if 'out' directory exists
echo Checking if 'out' directory exists...
if not exist out (
    echo ERROR: 'out' directory was not created.
    echo Please check your build process.
    exit /b 1
)

REM Add 'out' directory to Git
echo Adding 'out' directory to Git...
git add out
git status

echo.
echo Do you want to commit and push these changes? (y/n)
set /p COMMIT=
if /i "%COMMIT%" NEQ "y" (
    echo Changes staged but not committed. You can commit manually later.
    exit /b 0
)

echo Enter commit message (or press Enter for default):
set /p MESSAGE=
if "%MESSAGE%"=="" set MESSAGE=Add static export for Vercel deployment

echo Committing changes...
git commit -m "%MESSAGE%"

echo Pushing to GitHub...
git push

echo.
echo Deployment preparation complete!
echo.
echo Next steps:
echo 1. Go to https://vercel.com/
echo 2. Sign up or log in
echo 3. Import your GitHub repository
echo 4. Configure the project:
echo    - Set the framework preset to Next.js
echo    - Set the output directory to 'out'
echo    - Set the build command to 'npm run build'
echo 5. Deploy
echo.
echo Your site will be live in minutes with a URL like https://your-project.vercel.app 