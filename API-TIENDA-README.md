# 🛍️ API de Tienda - Boutique Avilés Cruz

API pública para la tienda web de Boutique Avilés Cruz. Esta API proporciona endpoints para que los clientes puedan ver productos, registrarse y realizar compras.

## 🚀 Características

- **Endpoints públicos** para clientes
- **Búsqueda de productos** por categoría, precio y nombre
- **Registro de clientes** para compras
- **Creación de órdenes** de compra
- **Información de la tienda** y contacto
- **Productos destacados** y por temporada
- **Health check** para monitoreo

## 📋 Endpoints Disponibles

### 🔍 Productos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/productos` | Obtener todos los productos disponibles |
| GET | `/api/productos/:id` | Obtener detalles de un producto específico |
| GET | `/api/productos/categoria/:categoria` | Buscar productos por categoría |
| GET | `/api/productos/precio/:min/:max` | Buscar productos por rango de precio |
| GET | `/api/productos/buscar/:termino` | Buscar productos por nombre |
| GET | `/api/productos/destacados` | Obtener productos destacados |
| GET | `/api/productos/temporada/:temporada` | Obtener productos por temporada |

### 📂 Categorías y Marcas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/categorias` | Obtener categorías disponibles |
| GET | `/api/marcas` | Obtener marcas disponibles |

### 👥 Clientes y Órdenes

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/clientes` | Registrar un nuevo cliente |
| POST | `/api/ordenes` | Crear una orden de compra |

### ℹ️ Información de la Tienda

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/tienda/info` | Obtener información de la tienda |
| GET | `/api/health` | Verificar estado de la API |
| GET | `/api/docs` | Documentación de la API |

## 🧪 Pruebas con Postman

### 1. Obtener todos los productos
```
GET http://localhost:3001/api/productos
```

### 2. Obtener un producto específico
```
GET http://localhost:3001/api/productos/1
```

### 3. Buscar productos por categoría
```
GET http://localhost:3001/api/productos/categoria/Camisa
```

### 4. Buscar productos por precio
```
GET http://localhost:3001/api/productos/precio/10/50
```

### 5. Buscar productos por nombre
```
GET http://localhost:3001/api/productos/buscar/jean
```

### 6. Registrar un cliente
```
POST http://localhost:3001/api/clientes
Content-Type: application/json

{
  "Nombre": "Juan Pérez",
  "Telefono": "123456789",
  "Correo": "juan@email.com"
}
```

### 7. Crear una orden
```
POST http://localhost:3001/api/ordenes
Content-Type: application/json

{
  "ID_Cliente": 1,
  "productos": [
    {
      "ID_Producto": 1,
      "cantidad": 2,
      "precio": 25.99
    }
  ],
  "total": 51.98
}
```

## 🚀 Despliegue en Render

### 1. Conectar con GitHub
1. Ve a [Render.com](https://render.com)
2. Conecta tu cuenta de GitHub
3. Selecciona el repositorio `sistema-gestion-tienda-ropa`

### 2. Configurar el servicio
- **Name**: `api-tienda-boutique`
- **Environment**: `Node`
- **Build Command**: `cd backend && npm install`
- **Start Command**: `cd backend && node api-tienda.js`

### 3. Variables de entorno
Configura estas variables en Render:

| Variable | Valor |
|----------|-------|
| `NODE_ENV` | `production` |
| `PORT` | `10000` |
| `DB_HOST` | Tu host de base de datos |
| `DB_USER` | Tu usuario de base de datos |
| `DB_PASSWORD` | Tu contraseña de base de datos |
| `DB_NAME` | `TiendaRopa` |
| `DB_PORT` | `3306` |

### 4. Desplegar
1. Haz clic en "Create Web Service"
2. Render construirá y desplegará tu API
3. Obtendrás una URL como: `https://api-tienda-boutique.onrender.com`

## 🔧 Desarrollo Local

### 1. Instalar dependencias
```bash
cd backend
npm install
```

### 2. Configurar base de datos
Asegúrate de que MySQL esté ejecutándose y la base de datos esté configurada.

### 3. Iniciar servidor
```bash
cd backend
node api-tienda.js
```

O usar el script:
```bash
.\probar-api-tienda.bat
```

### 4. Probar endpoints
- **Health check**: http://localhost:3001/api/health
- **Documentación**: http://localhost:3001/api/docs
- **Productos**: http://localhost:3001/api/productos

## 📊 Respuestas de la API

### Respuesta exitosa
```json
{
  "success": true,
  "data": [...],
  "total": 10
}
```

### Respuesta de error
```json
{
  "error": "Error al obtener productos",
  "message": "No se pudieron cargar los productos"
}
```

## 🔒 Seguridad

- **CORS habilitado** para desarrollo
- **Validación de datos** en endpoints POST
- **Manejo de errores** robusto
- **Solo productos con stock** disponibles
- **Sin información sensible** expuesta

## 📞 Soporte

Si tienes problemas:
1. Verifica que MySQL esté ejecutándose
2. Revisa los logs del servidor
3. Prueba el endpoint `/api/health`
4. Verifica la conexión a la base de datos

---

**¡API lista para conectar con tu tienda web!** 🛍️ 