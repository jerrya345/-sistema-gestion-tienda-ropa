Write-Host "Iniciando servidor backend..." -ForegroundColor Green

# Navegar al directorio backend
Set-Location "backend"

# Verificar que el archivo index.js existe
if (-not (Test-Path "index.js")) {
    Write-Host "ERROR: No se encuentra index.js en el directorio backend" -ForegroundColor Red
    exit 1
}

# Iniciar el servidor
Write-Host "Ejecutando: node index.js" -ForegroundColor Yellow
node index.js 