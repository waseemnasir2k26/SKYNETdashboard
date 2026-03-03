@echo off
echo ============================================
echo SKYNETLABS - News to Social Media Generator
echo ============================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python from https://python.org
    pause
    exit /b 1
)

REM Navigate to scripts directory
cd /d "%~dp0"

REM Check if requirements are installed
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
call venv\Scripts\activate.bat

REM Install requirements
echo Installing dependencies...
pip install -r requirements.txt -q

REM Check for .env file
if not exist ".env" (
    echo.
    echo WARNING: .env file not found!
    echo Copy .env.example to .env and add your API keys.
    echo.
    echo Running in TEMPLATE mode (no AI generation)...
    echo.
)

REM Run the generator
echo.
echo Running news to posts generator...
echo.
python news_to_posts.py --preview -n 7

echo.
echo ============================================
echo Done! Check the output in:
echo src\data\generated\latest_posts.json
echo ============================================
echo.
pause
