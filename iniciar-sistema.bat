@echo off
echo ========================================
echo    SISTEMA TIENDAROPA
echo ========================================
echo.
echo Iniciando el sistema...
echo.

REM Verificar si Node.js está instalado
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no está instalado.
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si MySQL está ejecutándose
echo Verificando conexión a MySQL...
mysql -u root -pPreventa1 -e "SELECT 1;" >nul 2>&1
if %errorlevel% neq 0 (
    echo ADVERTENCIA: No se puede conectar a MySQL.
    echo Asegúrate de que MySQL esté ejecutándose y las credenciales sean correctas.
    echo.
)

REM Navegar al directorio backend
cd backend

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
    echo.
)

REM Iniciar el servidor
echo Iniciando servidor backend...
echo El servidor estará disponible en: http://localhost:3000
echo.
echo Para acceder a las páginas:
echo - Administración: !DOCTYPE html.html
echo - Clientes: cliente.html
echo.
echo Presiona Ctrl+C para detener el servidor
echo.
node index.js

pause 