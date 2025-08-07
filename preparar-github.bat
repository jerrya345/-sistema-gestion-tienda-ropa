@echo off
echo 🚀 Preparando repositorio para GitHub...

REM Verificar si Git está instalado
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git no está instalado. Por favor instala Git primero.
    pause
    exit /b 1
)
echo ✅ Git está instalado

REM Inicializar repositorio Git si no existe
if not exist ".git" (
    echo 📁 Inicializando repositorio Git...
    git init
    echo ✅ Repositorio Git inicializado
) else (
    echo ✅ Repositorio Git ya existe
)

REM Configurar Git
echo ⚙️ Configurando Git...
git config --local user.name "Sistema de Gestión Tienda"
git config --local user.email "sistema@gestion-tienda.com"

REM Agregar todos los archivos
echo 📦 Agregando archivos al repositorio...
git add .

REM Hacer commit inicial
echo 💾 Creando commit inicial...
git commit -m "feat: lanzamiento inicial del sistema de gestión de tienda

- Sistema completo de gestión para tienda de ropa
- Interfaz web moderna y responsive
- Base de datos MySQL con Stored Procedures
- API REST completa
- Dashboard en tiempo real
- Gestión de clientes, productos, proveedores y ventas
- Sistema de monitoreo de procesos MySQL"

echo ✅ Commit inicial creado

REM Crear rama develop
echo 🌿 Creando rama develop...
git checkout -b develop

REM Volver a main
git checkout main

echo.
echo 🎉 ¡Repositorio preparado exitosamente!
echo.
echo 📋 Próximos pasos:
echo 1. Ve a GitHub.com y crea un nuevo repositorio
echo 2. Copia la URL del repositorio (ej: https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git)
echo 3. Ejecuta los siguientes comandos:
echo.
echo    git remote add origin https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git
echo    git branch -M main
echo    git push -u origin main
echo    git push -u origin develop
echo.
echo 📚 Archivos creados:
echo    ✅ .gitignore - Para excluir archivos innecesarios
echo    ✅ LICENSE - Licencia MIT
echo    ✅ CONTRIBUTING.md - Guía de contribución
echo    ✅ CHANGELOG.md - Registro de cambios
echo    ✅ .github/ISSUE_TEMPLATE/ - Plantillas para issues
echo    ✅ .github/workflows/ci.yml - Pipeline de CI/CD
echo.
echo 🎯 El repositorio está listo para ser subido a GitHub!
pause 