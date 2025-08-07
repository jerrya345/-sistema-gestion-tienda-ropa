# Script para preparar el repositorio para GitHub
# Ejecutar: .\preparar-github.ps1

Write-Host "🚀 Preparando repositorio para GitHub..." -ForegroundColor Green

# Verificar si Git está instalado
try {
    git --version | Out-Null
    Write-Host "✅ Git está instalado" -ForegroundColor Green
} catch {
    Write-Host "❌ Git no está instalado. Por favor instala Git primero." -ForegroundColor Red
    exit 1
}

# Inicializar repositorio Git si no existe
if (-not (Test-Path ".git")) {
    Write-Host "📁 Inicializando repositorio Git..." -ForegroundColor Yellow
    git init
    Write-Host "✅ Repositorio Git inicializado" -ForegroundColor Green
} else {
    Write-Host "✅ Repositorio Git ya existe" -ForegroundColor Green
}

# Configurar Git (si no está configurado)
Write-Host "⚙️ Configurando Git..." -ForegroundColor Yellow
git config --local user.name "Sistema de Gestión Tienda"
git config --local user.email "sistema@gestion-tienda.com"

# Agregar todos los archivos
Write-Host "📦 Agregando archivos al repositorio..." -ForegroundColor Yellow
git add .

# Hacer commit inicial
Write-Host "💾 Creando commit inicial..." -ForegroundColor Yellow
git commit -m "feat: lanzamiento inicial del sistema de gestión de tienda

- Sistema completo de gestión para tienda de ropa
- Interfaz web moderna y responsive
- Base de datos MySQL con Stored Procedures
- API REST completa
- Dashboard en tiempo real
- Gestión de clientes, productos, proveedores y ventas
- Sistema de monitoreo de procesos MySQL"

Write-Host "✅ Commit inicial creado" -ForegroundColor Green

# Crear rama develop
Write-Host "🌿 Creando rama develop..." -ForegroundColor Yellow
git checkout -b develop

# Volver a main
git checkout main

Write-Host ""
Write-Host "🎉 ¡Repositorio preparado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "1. Ve a GitHub.com y crea un nuevo repositorio" -ForegroundColor White
Write-Host "2. Copia la URL del repositorio (ej: https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git)" -ForegroundColor White
Write-Host "3. Ejecuta los siguientes comandos:" -ForegroundColor White
Write-Host ""
Write-Host "   git remote add origin https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git" -ForegroundColor Yellow
Write-Host "   git branch -M main" -ForegroundColor Yellow
Write-Host "   git push -u origin main" -ForegroundColor Yellow
Write-Host "   git push -u origin develop" -ForegroundColor Yellow
Write-Host ""
Write-Host "📚 Archivos creados:" -ForegroundColor Cyan
Write-Host "   ✅ .gitignore - Para excluir archivos innecesarios" -ForegroundColor Green
Write-Host "   ✅ LICENSE - Licencia MIT" -ForegroundColor Green
Write-Host "   ✅ CONTRIBUTING.md - Guía de contribución" -ForegroundColor Green
Write-Host "   ✅ CHANGELOG.md - Registro de cambios" -ForegroundColor Green
Write-Host "   ✅ .github/ISSUE_TEMPLATE/ - Plantillas para issues" -ForegroundColor Green
Write-Host "   ✅ .github/workflows/ci.yml - Pipeline de CI/CD" -ForegroundColor Green
Write-Host ""
Write-Host "🎯 El repositorio está listo para ser subido a GitHub!" -ForegroundColor Green 