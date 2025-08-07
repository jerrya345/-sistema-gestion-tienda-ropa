# 📮 Instrucciones para Postman - API Tienda

## 🚀 Cómo importar los archivos en Postman

### **1. Importar el Environment**

1. Abre Postman
2. Ve a **File** → **Import**
3. Selecciona el archivo `postman-environment.json`
4. Haz clic en **Import**
5. En la esquina superior derecha, selecciona el environment **"API Tienda - Environment"**

### **2. Importar la Collection**

1. Ve a **File** → **Import**
2. Selecciona el archivo `postman-collection.json`
3. Haz clic en **Import**
4. Verás la colección **"API Tienda - Collection"** en el panel izquierdo

## 🔧 Configuración del Environment

### **Variables disponibles:**

| Variable | Valor | Descripción |
|----------|-------|-------------|
| `base_url` | `http://localhost:3001` | URL base de la API |
| `api_prefix` | `/api` | Prefijo de la API |
| `content_type` | `application/json` | Tipo de contenido |
| `client_name` | `Juan Pérez` | Nombre de ejemplo para cliente |
| `client_email` | `juan@ejemplo.com` | Email de ejemplo |
| `client_phone` | `123456789` | Teléfono de ejemplo |
| `client_address` | `Calle Principal 123` | Dirección de ejemplo |
| `product_id` | `1` | ID de producto de ejemplo |
| `category_id` | `1` | ID de categoría de ejemplo |
| `brand_id` | `1` | ID de marca de ejemplo |

## 🧪 Cómo probar la API

### **1. Health Check (Primero)**
- Ejecuta **"Health Check"** para verificar que la API esté funcionando
- Deberías recibir: `{"success": true, "message": "API de Tienda funcionando correctamente"}`

### **2. Endpoints GET (Fáciles)**
- **"Obtener todos los productos"** - Lista de productos
- **"Obtener todas las categorías"** - Lista de categorías
- **"Obtener todas las marcas"** - Lista de marcas

### **3. Endpoints POST (Más complejos)**

#### **Registrar Cliente:**
1. Ve a **"Clientes"** → **"Registrar nuevo cliente"**
2. El body ya está configurado con variables
3. Ejecuta el request
4. Si es exitoso, el `customer_id` se guardará automáticamente

#### **Crear Orden:**
1. Ve a **"Órdenes"** → **"Crear nueva orden"**
2. El body usa las variables del environment
3. Ejecuta el request
4. El `order_id` se guardará automáticamente

## 🔄 Flujo de Pruebas Recomendado

### **Paso 1: Verificar API**
```
GET {{base_url}}{{api_prefix}}/health
```

### **Paso 2: Explorar datos**
```
GET {{base_url}}{{api_prefix}}/productos
GET {{base_url}}{{api_prefix}}/categorias
GET {{base_url}}{{api_prefix}}/marcas
```

### **Paso 3: Registrar cliente**
```
POST {{base_url}}{{api_prefix}}/clientes
Body: {
  "nombre": "{{client_name}}",
  "email": "{{client_email}}",
  "telefono": "{{client_phone}}",
  "direccion": "{{client_address}}"
}
```

### **Paso 4: Crear orden**
```
POST {{base_url}}{{api_prefix}}/ordenes
Body: {
  "cliente_id": "{{customer_id}}",
  "productos": [...],
  "total": 59.98,
  "metodo_pago": "tarjeta"
}
```

## 🎯 Características del Environment

### **✅ Variables automáticas:**
- `customer_id` - Se actualiza automáticamente al registrar un cliente
- `order_id` - Se actualiza automáticamente al crear una orden

### **✅ Scripts automáticos:**
- **Pre-request:** Muestra en consola qué request se está ejecutando
- **Test:** Verifica el código de respuesta y guarda IDs automáticamente

### **✅ Organización:**
- Requests organizados por categorías
- Descripciones detalladas de cada endpoint
- Ejemplos de uso incluidos

## 🛠️ Personalización

### **Cambiar URL base:**
1. Ve a **Environments** → **"API Tienda - Environment"**
2. Cambia el valor de `base_url` a tu URL de producción
3. Ejemplo: `https://tu-api-en-render.com`

### **Agregar más variables:**
1. En el environment, haz clic en **"Add"**
2. Agrega nuevas variables según necesites
3. Usa `{{variable_name}}` en tus requests

## 📊 Monitoreo

### **Console de Postman:**
- Ve a **View** → **Show Postman Console**
- Verás logs de todos los requests
- Errores y respuestas detalladas

### **Tests automáticos:**
- Cada request tiene tests básicos
- Verifica códigos de respuesta
- Guarda datos dinámicamente

## 🚨 Solución de Problemas

### **API no responde:**
1. Verifica que el servidor esté corriendo: `node api-tienda.js`
2. Confirma que esté en el puerto correcto: `http://localhost:3001`
3. Prueba el health check primero

### **Variables no funcionan:**
1. Verifica que el environment esté seleccionado
2. Confirma que las variables estén escritas correctamente: `{{variable_name}}`
3. Revisa que no haya espacios extra

### **Errores de CORS:**
- La API ya tiene CORS configurado
- Si persisten, verifica la configuración en `api-tienda.js`

## 🎉 ¡Listo para usar!

Con estos archivos tienes:
- ✅ Environment completo con variables
- ✅ Collection organizada con todos los endpoints
- ✅ Scripts automáticos para facilitar las pruebas
- ✅ Documentación detallada de cada endpoint
- ✅ Flujo de pruebas recomendado

¡Ahora puedes probar tu API de manera profesional y organizada! 