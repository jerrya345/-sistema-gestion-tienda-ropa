# 🚀 Guía de Despliegue en Render - API Tienda

## 📋 Requisitos Previos

1. ✅ Cuenta en Render.com
2. ✅ Repositorio en GitHub (ya tienes: https://github.com/jerrya345/-sistema-gestion-tienda-ropa.git)
3. ✅ Base de datos MySQL (puedes usar PlanetScale, Railway, o cualquier proveedor)

## 🎯 Paso 1: Crear Base de Datos

### **Opción A: PlanetScale (Recomendado)**
1. Ve a [planetscale.com](https://planetscale.com)
2. Crea una cuenta gratuita
3. Crea una nueva base de datos
4. Copia las credenciales de conexión

### **Opción B: Railway**
1. Ve a [railway.app](https://railway.app)
2. Crea una cuenta
3. Crea un nuevo proyecto
4. Agrega un servicio MySQL
5. Copia las credenciales

### **Opción C: Clever Cloud**
1. Ve a [clever-cloud.com](https://clever-cloud.com)
2. Crea una cuenta
3. Crea una base de datos MySQL
4. Copia las credenciales

## 🎯 Paso 2: Configurar Render

### **1. Crear cuenta en Render**
1. Ve a [render.com](https://render.com)
2. Regístrate con tu cuenta de GitHub
3. Autoriza el acceso a tu repositorio

### **2. Crear nuevo Web Service**
1. Haz clic en **"New +"**
2. Selecciona **"Web Service"**
3. Conecta tu repositorio de GitHub
4. Selecciona: `jerrya345/-sistema-gestion-tienda-ropa`

### **3. Configurar el servicio**

**Nombre:** `api-tienda-boutique`
**Environment:** `Node`
**Region:** `Oregon (US West)`
**Branch:** `main`
**Root Directory:** (dejar vacío)
**Build Command:** `npm install`
**Start Command:** `node api-tienda.js`

## 🎯 Paso 3: Configurar Variables de Entorno

En Render, ve a **Environment** y agrega estas variables:

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `NODE_ENV` | `production` | Entorno de producción |
| `PORT` | `10000` | Puerto de Render |
| `DB_HOST` | `tu-host-mysql` | Host de tu base de datos |
| `DB_USER` | `tu-usuario-mysql` | Usuario de MySQL |
| `DB_PASSWORD` | `tu-password-mysql` | Contraseña de MySQL |
| `DB_NAME` | `tu-nombre-db` | Nombre de la base de datos |
| `DB_PORT` | `3306` | Puerto de MySQL |

## 🎯 Paso 4: Desplegar

1. Haz clic en **"Create Web Service"**
2. Render comenzará a construir tu aplicación
3. Espera a que termine el build (puede tomar 5-10 minutos)
4. Tu API estará disponible en: `https://api-tienda-boutique.onrender.com`

## 🎯 Paso 5: Verificar el Despliegue

### **1. Health Check**
```
GET https://api-tienda-boutique.onrender.com/api/health
```

### **2. Probar endpoints**
```
GET https://api-tienda-boutique.onrender.com/api/productos
GET https://api-tienda-boutique.onrender.com/api/categorias
GET https://api-tienda-boutique.onrender.com/api/marcas
```

## 🔧 Configuración de Base de Datos

### **1. Ejecutar Stored Procedures**
Necesitas ejecutar los stored procedures en tu base de datos MySQL. Puedes usar:

- **MySQL Workbench**
- **phpMyAdmin**
- **Línea de comandos**

### **2. Archivos SQL necesarios:**
- `boutiqueavilescruz.sql` (estructura de la base de datos)
- `crear-stored-procedures.js` (procedimientos almacenados)

## 🚨 Solución de Problemas

### **Error: "Cannot find module"**
- Verifica que `api-tienda.js` esté en el directorio raíz
- Confirma que `package.json` tenga las dependencias correctas

### **Error: "Connection refused"**
- Verifica las credenciales de la base de datos
- Confirma que la base de datos esté accesible desde internet

### **Error: "Build failed"**
- Revisa los logs de build en Render
- Verifica que todas las dependencias estén en `package.json`

### **API no responde**
- Verifica que el servicio esté "Live" en Render
- Revisa los logs de la aplicación

## 📊 Monitoreo

### **Logs en Render:**
1. Ve a tu servicio en Render
2. Haz clic en **"Logs"**
3. Revisa los logs en tiempo real

### **Health Check:**
```bash
curl https://api-tienda-boutique.onrender.com/api/health
```

## 🔄 Actualizaciones

### **Para actualizar la API:**
1. Haz cambios en tu código local
2. Haz commit y push a GitHub
3. Render automáticamente redeployará

### **Para cambiar variables de entorno:**
1. Ve a tu servicio en Render
2. **Environment** → **Environment Variables**
3. Modifica las variables necesarias
4. **Save Changes**

## 🎉 ¡Listo!

Una vez desplegado, tendrás:
- ✅ API funcionando en la nube
- ✅ URL pública para acceder
- ✅ Despliegue automático desde GitHub
- ✅ Logs y monitoreo
- ✅ Escalabilidad automática

### **URL de tu API:**
```
https://api-tienda-boutique.onrender.com
```

### **Endpoints disponibles:**
- `GET /api/health` - Health check
- `GET /api/productos` - Lista de productos
- `GET /api/categorias` - Lista de categorías
- `GET /api/marcas` - Lista de marcas
- `POST /api/clientes` - Registrar cliente
- `POST /api/ordenes` - Crear orden

¡Tu API estará lista para usar en producción! 🚀 