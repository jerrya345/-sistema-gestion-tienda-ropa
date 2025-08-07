@echo off
echo 🚀 Subiendo proyecto a GitHub...

echo.
echo 📋 Instrucciones:
echo 1. Ve a https://github.com/jerrya345
echo 2. Haz clic en "New" o "Nuevo"
echo 3. Nombre: sistema-gestion-tienda-ropa
echo 4. Descripción: Sistema completo de gestión para tienda de ropa
echo 5. Visibility: Public
echo 6. NO marques "Add README"
echo 7. NO marques "Add .gitignore"
echo 8. NO marques "Choose a license"
echo 9. Haz clic en "Create repository"
echo.

echo 🔧 Configurando repositorio remoto...
git remote add origin https://github.com/jerrya345/sistema-gestion-tienda-ropa.git

echo 📤 Subiendo código a GitHub...
git branch -M main
git push -u origin main
git push -u origin develop

echo.
echo 🎉 ¡Proyecto subido exitosamente!
echo 🌐 Repositorio: https://github.com/jerrya345/sistema-gestion-tienda-ropa
echo.
pause 