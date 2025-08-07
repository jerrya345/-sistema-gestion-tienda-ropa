Write-Host "🏪 Sistema de Gestión - Tienda de Ropa" -ForegroundColor Cyan
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host ""

# Verificar si Node.js está instalado
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js detectado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Error: Node.js no está instalado" -ForegroundColor Red
    Write-Host "Por favor instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# Verificar si MySQL está ejecutándose
Write-Host "🔍 Verificando conexión a MySQL..." -ForegroundColor Yellow
try {
    $mysqlTest = mysql -u root -pPreventa1 -e "SELECT 1;" 2>$null
    Write-Host "✅ MySQL conectado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️  Advertencia: No se pudo conectar a MySQL" -ForegroundColor Yellow
    Write-Host "Asegúrate de que MySQL esté ejecutándose" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Iniciando servicios..." -ForegroundColor Cyan

# 1. Iniciar el backend
Write-Host "1. Iniciando servidor backend (puerto 3000)..." -ForegroundColor Yellow
Set-Location "backend"
Start-Process -FilePath "node" -ArgumentList "index.js" -WindowStyle Minimized
Set-Location ".."

# 2. Esperar que el backend se inicie
Write-Host "2. Esperando que el backend se inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 3

# 3. Iniciar el servidor web
Write-Host "3. Iniciando servidor web (puerto 8080)..." -ForegroundColor Yellow
Start-Process -FilePath "node" -ArgumentList "servidor-web.js" -WindowStyle Minimized

# 4. Esperar que el servidor web se inicie
Write-Host "4. Esperando que el servidor web se inicie..." -ForegroundColor Yellow
Start-Sleep -Seconds 2

# 5. Abrir el navegador
Write-Host "5. Abriendo navegador..." -ForegroundColor Yellow
Start-Process "http://localhost:8080"

Write-Host ""
Write-Host "=========================================" -ForegroundColor Green
Write-Host "✅ SISTEMA INICIADO CORRECTAMENTE" -ForegroundColor Green
Write-Host "=========================================" -ForegroundColor Green
Write-Host ""
Write-Host "🌐 Interfaz principal: http://localhost:8080" -ForegroundColor White
Write-Host "⚙️  API Backend: http://localhost:3000" -ForegroundColor White
Write-Host "📊 Dashboard: http://localhost:8080/tienda" -ForegroundColor White
Write-Host ""
Write-Host "💡 Para detener el sistema, cierra las ventanas de terminal" -ForegroundColor Gray
Write-Host "Presiona cualquier tecla para continuar..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown") 