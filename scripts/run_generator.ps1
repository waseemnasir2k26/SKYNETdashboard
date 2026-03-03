# SKYNETLABS - News to Social Media Generator
# PowerShell Script

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "SKYNETLABS - News to Social Media Generator" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check Python
try {
    $pythonVersion = python --version 2>&1
    Write-Host "Found: $pythonVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Python not found. Install from https://python.org" -ForegroundColor Red
    exit 1
}

# Navigate to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $scriptPath

# Create venv if needed
if (-not (Test-Path "venv")) {
    Write-Host "Creating virtual environment..." -ForegroundColor Yellow
    python -m venv venv
}

# Activate venv
& ".\venv\Scripts\Activate.ps1"

# Install requirements
Write-Host "Installing dependencies..." -ForegroundColor Yellow
pip install -r requirements.txt -q

# Check .env
if (-not (Test-Path ".env")) {
    Write-Host ""
    Write-Host "WARNING: .env file not found!" -ForegroundColor Yellow
    Write-Host "Copy .env.example to .env and add your API keys."
    Write-Host "Running in TEMPLATE mode..." -ForegroundColor Yellow
    Write-Host ""
}

# Run generator
Write-Host ""
Write-Host "Running news to posts generator..." -ForegroundColor Green
Write-Host ""

python news_to_posts.py --preview -n 7

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Done! Refresh the dashboard to see new posts" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
