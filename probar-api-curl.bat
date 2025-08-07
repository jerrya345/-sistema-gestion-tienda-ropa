@echo off
echo 🧪 Probando API de Tienda con curl...
echo.

echo 📡 GET /api/health
curl -X GET http://localhost:3001/api/health
echo.
echo ────────────────────────────────────────────────────────────────
echo.

echo 📡 GET /api/productos
curl -X GET http://localhost:3001/api/productos
echo.
echo ────────────────────────────────────────────────────────────────
echo.

echo 📡 GET /api/categorias
curl -X GET http://localhost:3001/api/categorias
echo.
echo ────────────────────────────────────────────────────────────────
echo.

echo 📡 GET /api/marcas
curl -X GET http://localhost:3001/api/marcas
echo.
echo ────────────────────────────────────────────────────────────────
echo.

echo 📡 POST /api/clientes
curl -X POST http://localhost:3001/api/clientes ^
  -H "Content-Type: application/json" ^
  -d "{\"nombre\":\"Juan Pérez\",\"email\":\"juan@ejemplo.com\",\"telefono\":\"123456789\",\"direccion\":\"Calle Principal 123\"}"
echo.
echo ────────────────────────────────────────────────────────────────
echo.

echo 🎉 ¡Pruebas completadas!
echo.
echo 💡 Si curl no funciona, usa el script de PowerShell o el navegador
pause 