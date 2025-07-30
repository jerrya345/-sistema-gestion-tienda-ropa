# Script para iniciar el sistema de vista de solo lectura
Write-Host "🚀 Iniciando Sistema de Vista de Solo Lectura..." -ForegroundColor Green

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Navegar al directorio backend
Set-Location "backend"

# Verificar si las dependencias están instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Iniciar el servidor backend
Write-Host "🔧 Iniciando servidor backend en http://localhost:3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node index.js"

# Esperar un momento para que el servidor se inicie
Start-Sleep -Seconds 3

# Abrir la página de vista de solo lectura en el navegador
Write-Host "🌐 Abriendo vista de solo lectura..." -ForegroundColor Green
Start-Process "http://localhost:3000/../vista-solo-lectura.html"

Write-Host ""
Write-Host "✅ Sistema iniciado correctamente!" -ForegroundColor Green
Write-Host "📊 Dashboard: http://localhost:3000/../vista-solo-lectura.html" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Para detener el servidor, cierra la ventana de PowerShell del backend" -ForegroundColor Yellow 