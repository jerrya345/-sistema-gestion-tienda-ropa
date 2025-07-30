# Sistema de Gestión - Vista de Solo Lectura

## 📋 Descripción

Esta es una versión de **solo lectura** del sistema de gestión de tienda de ropa, diseñada para usuarios que necesitan visualizar datos sin tener permisos de modificación.

## 🔄 Diferencias con la Versión Original

### ❌ Funcionalidades Removidas
- **Formularios de registro**: No se pueden agregar nuevos clientes, productos, proveedores o ventas
- **Botones de eliminación**: No se pueden eliminar registros existentes
- **Funcionalidad de edición**: No se pueden modificar datos existentes
- **Alertas de confirmación**: No hay diálogos de confirmación para acciones

### ✅ Funcionalidades Mantenidas
- **Dashboard completo**: Estadísticas en tiempo real
- **Visualización de datos**: Todas las tablas muestran información actualizada
- **Navegación por pestañas**: Interfaz idéntica para navegación
- **Diseño responsivo**: Funciona en dispositivos móviles y desktop
- **Conexión con API**: Mantiene la conexión con el backend

## 🎨 Características Visuales

### Indicadores de Solo Lectura
- **Badge amarillo**: "👁️ Solo Visualización" en el header
- **Alertas informativas**: Notas explicativas en cada sección
- **Títulos descriptivos**: Texto explicativo sobre el propósito de cada vista

### Diseño Mejorado
- **Colores informativos**: Uso de azul para alertas informativas
- **Texto explicativo**: Descripción del propósito de cada sección
- **Interfaz limpia**: Sin elementos interactivos innecesarios

## 🚀 Cómo Usar

### Opción 1: Script Automático
```powershell
.\iniciar-vista-lectura.ps1
```

### Opción 2: Manual
1. Navegar al directorio `backend`
2. Ejecutar `npm install` (si no se han instalado las dependencias)
3. Ejecutar `node index.js`
4. Abrir `vista-solo-lectura.html` en el navegador

## 📊 Secciones Disponibles

### 📊 Dashboard
- Estadísticas de ventas (hoy y mes)
- Total de clientes y productos
- Últimas ventas realizadas

### 👥 Clientes
- Lista completa de clientes registrados
- Información: ID, Nombre, Teléfono, Correo

### 👕 Productos
- Catálogo completo de productos
- Información: ID, Nombre, Talla, Color, Precio, Marca, Tipo, Temporada, Stock

### 🏭 Proveedores
- Lista de todos los proveedores
- Información: ID, Nombre, Teléfono, Correo

### 💰 Ventas
- Historial completo de transacciones
- Información: ID, Fecha, Total, ID Cliente

## 🔧 Requisitos Técnicos

- **Backend**: Node.js con Express
- **Base de datos**: MySQL
- **Navegador**: Cualquier navegador moderno
- **API**: Debe estar ejecutándose en `http://localhost:3000`

## 🛡️ Seguridad

Esta versión es ideal para:
- **Usuarios de consulta**: Que solo necesitan ver datos
- **Auditores**: Que requieren acceso de solo lectura
- **Personal de ventas**: Que necesitan consultar inventario sin modificarlo
- **Gerentes**: Que quieren monitorear sin riesgo de cambios accidentales

## 📝 Notas Importantes

- **Sin persistencia**: Los cambios no se guardan automáticamente
- **Solo visualización**: No hay funcionalidad de exportación
- **Tiempo real**: Los datos se actualizan al cambiar de pestaña
- **Responsive**: Funciona en dispositivos móviles

## 🔗 Archivos Relacionados

- `vista-solo-lectura.html` - Página principal de solo lectura
- `iniciar-vista-lectura.ps1` - Script de inicio automático
- `!DOCTYPE html.html` - Versión original con funcionalidad completa
- `backend/index.js` - API del backend 