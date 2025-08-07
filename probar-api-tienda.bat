@echo off
echo 🛍️ Iniciando API de Tienda para pruebas...

echo.
echo 📋 Instrucciones para probar en Postman:
echo.
echo 🔗 URL Base: http://localhost:3001
echo.
echo 📝 Endpoints disponibles:
echo.
echo GET /api/productos
echo GET /api/productos/1
echo GET /api/productos/categoria/Camisa
echo GET /api/productos/precio/10/50
echo GET /api/productos/buscar/jean
echo GET /api/categorias
echo GET /api/marcas
echo GET /api/productos/destacados
echo GET /api/productos/temporada/Verano
echo GET /api/tienda/info
echo GET /api/health
echo GET /api/docs
echo.
echo POST /api/clientes
echo Body: {"Nombre": "Juan Pérez", "Telefono": "123456789", "Correo": "juan@email.com"}
echo.
echo POST /api/ordenes
echo Body: {"ID_Cliente": 1, "productos": [{"ID_Producto": 1, "cantidad": 2, "precio": 25.99}], "total": 51.98}
echo.

cd backend
echo 🚀 Iniciando servidor...
node api-tienda.js 