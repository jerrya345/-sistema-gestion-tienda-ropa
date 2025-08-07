@echo off
echo 🏪 Sistema de Gestión - Tienda de Ropa
echo =========================================
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no está instalado.
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)
echo ✅ Node.js detectado

REM Verificar si MySQL está ejecutándose
echo 🔍 Verificando conexión a MySQL...
mysql -u root -pPreventa1 -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ⚠️  ADVERTENCIA: No se puede conectar a MySQL.
    echo Asegúrate de que MySQL esté ejecutándose.
    echo.
) else (
    echo ✅ MySQL conectado correctamente
)

echo.
echo 🚀 Iniciando servicios...
echo.

REM Verificar dependencias del backend
cd backend
if not exist "node_modules" (
    echo 📦 Instalando dependencias del backend...
    npm install
    echo.
)

REM Verificar dependencias principales
cd ..
if not exist "node_modules" (
    echo 📦 Instalando dependencias principales...
    npm install
    echo.
)

REM Iniciar backend en segundo plano
echo 1. Iniciando servidor backend (puerto 3000)...
start /min cmd /c "cd backend && node index.js"

REM Esperar un momento
timeout /t 3 /nobreak >nul

REM Iniciar servidor web en segundo plano
echo 2. Iniciando servidor web (puerto 8080)...
start /min cmd /c "node servidor-web.js"

REM Esperar un momento
timeout /t 2 /nobreak >nul

REM Abrir navegador
echo 3. Abriendo navegador...
start http://localhost:8080

echo.
echo =========================================
echo ✅ SISTEMA INICIADO CORRECTAMENTE
echo =========================================
echo.
echo 🌐 Interfaz principal: http://localhost:8080
echo ⚙️  API Backend: http://localhost:3000
echo 📊 Dashboard: http://localhost:8080/tienda
echo.
echo 💡 Para detener el sistema, cierra las ventanas de terminal
echo.
pause 