# Script de inicio para el Sistema TiendaRopa
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "    SISTEMA TIENDAROPA" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "Node.js encontrado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "ERROR: Node.js no está instalado." -ForegroundColor Red
    Write-Host "Por favor, instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    Read-Host "Presiona Enter para salir"
    exit 1
}

# Verificar conexión a MySQL
Write-Host "Verificando conexión a MySQL..." -ForegroundColor Yellow
try {
    mysql -u root -pPreventa1 -e "SELECT 1;" | Out-Null
    Write-Host "Conexión a MySQL exitosa" -ForegroundColor Green
} catch {
    Write-Host "ADVERTENCIA: No se puede conectar a MySQL." -ForegroundColor Yellow
    Write-Host "Asegúrate de que MySQL esté ejecutándose y las credenciales sean correctas." -ForegroundColor Yellow
    Write-Host ""
}

# Navegar al directorio backend
Set-Location "backend"

# Verificar si node_modules existe
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
    Write-Host ""
}

# Iniciar el servidor
Write-Host "Iniciando servidor backend..." -ForegroundColor Green
Write-Host "El servidor estará disponible en: http://localhost:3000" -ForegroundColor Cyan
Write-Host ""
Write-Host "Para acceder a las páginas:" -ForegroundColor White
Write-Host "- Administración: !DOCTYPE html.html" -ForegroundColor White
Write-Host "- Clientes: cliente.html" -ForegroundColor White
Write-Host ""
Write-Host "Presiona Ctrl+C para detener el servidor" -ForegroundColor Yellow
Write-Host ""

node index.js 