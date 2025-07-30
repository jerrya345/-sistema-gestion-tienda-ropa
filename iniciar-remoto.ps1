# Script para iniciar el sistema con conexión remota a MySQL
Write-Host "🚀 Iniciando Sistema con Conexión Remota..." -ForegroundColor Green

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js no está instalado o no está en el PATH" -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar si existe el archivo de configuración
if (-not (Test-Path "config-remoto.js")) {
    Write-Host "❌ Error: No se encontró config-remoto.js" -ForegroundColor Red
    Write-Host "💡 Por favor, configura la conexión remota en config-remoto.js" -ForegroundColor Yellow
    exit 1
}

# Navegar al directorio backend
Set-Location "backend"

# Verificar si las dependencias están instaladas
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Iniciar el servidor backend remoto
Write-Host "🔧 Iniciando servidor backend remoto en http://localhost:3000..." -ForegroundColor Cyan
Start-Process powershell -ArgumentList "-NoExit", "-Command", "node index-remoto.js"

# Esperar un momento para que el servidor se inicie
Start-Sleep -Seconds 3

# Abrir la página de vista de solo lectura en el navegador
Write-Host "🌐 Abriendo vista de solo lectura..." -ForegroundColor Green
Start-Process "http://localhost:3000/../vista-solo-lectura.html"

Write-Host ""
Write-Host "✅ Sistema remoto iniciado correctamente!" -ForegroundColor Green
Write-Host "📊 Dashboard: http://localhost:3000/../vista-solo-lectura.html" -ForegroundColor Cyan
Write-Host "🔧 Backend API: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "💡 Para detener el servidor, cierra la ventana de PowerShell del backend" -ForegroundColor Yellow
Write-Host "🌐 Los datos se cargan desde la base de datos remota de tu amigo" -ForegroundColor Magenta 