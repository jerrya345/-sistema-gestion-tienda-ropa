# 🏪 Sistema de Gestión - Tienda de Ropa

Sistema completo de gestión para una tienda de ropa con interfaz web moderna y base de datos MySQL.

## 🚀 Características

- **Interfaz Web Moderna**: Panel de administración con diseño responsive
- **Base de Datos MySQL**: Almacenamiento robusto con Stored Procedures
- **API REST**: Endpoints para gestión completa de datos
- **Dashboard en Tiempo Real**: Estadísticas y métricas del negocio
- **Gestión Completa**: Clientes, Productos, Proveedores y Ventas

## 📁 Estructura del Proyecto

```
base de datow/
├── !DOCTYPE html.html          # Interfaz principal del sistema
├── backend/
│   ├── index.js               # Servidor API principal
│   └── package.json           # Dependencias del backend
├── boutiqueavilescruz.sql     # Base de datos MySQL
├── config.js                  # Configuración del sistema
├── crear-stored-procedures.js # Script para crear Stored Procedures
├── iniciar-sistema.ps1       # Script para iniciar el sistema
├── iniciar-sistema.bat       # Script alternativo para iniciar
├── servidor-web.js           # Servidor web simple
└── package.json              # Dependencias principales
```

## 🛠️ Instalación y Configuración

### 1. Requisitos Previos
- Node.js (versión 14 o superior)
- MySQL Server
- PowerShell (para scripts de Windows)

### 2. Configurar Base de Datos
```bash
# Importar la base de datos
mysql -u root -p < boutiqueavilescruz.sql

# Crear Stored Procedures
node crear-stored-procedures.js
```

### 3. Instalar Dependencias
```bash
# Instalar dependencias principales
npm install

# Instalar dependencias del backend
cd backend
npm install
```

### 4. Configurar Variables
Editar `config.js` con tus credenciales de MySQL:
```javascript
database: {
    host: 'localhost',
    user: 'root',
    password: 'TU_PASSWORD',
    database: 'TiendaRopa',
    port: 3306
}
```

## 🚀 Iniciar el Sistema

### Opción 1: Script Automático (Recomendado)
```powershell
# En PowerShell
.\iniciar-sistema.ps1
```

### Opción 2: Script Batch
```cmd
# En CMD
iniciar-sistema.bat
```

### Opción 3: Manual
```bash
# Terminal 1: Iniciar backend
cd backend
npm start

# Terminal 2: Iniciar servidor web
node servidor-web.js
```

## 🌐 Acceso al Sistema

1. **Interfaz Principal**: http://localhost:8080
2. **API Backend**: http://localhost:3000
3. **Documentación API**: http://localhost:3000/api-docs

## 📊 Funcionalidades

### Dashboard
- Estadísticas en tiempo real
- Métricas de ventas
- Resumen de clientes y productos

### Gestión de Clientes
- Registrar nuevos clientes
- Ver lista de clientes
- Eliminar clientes
- Actualizar información

### Gestión de Productos
- Registrar productos con detalles completos
- Control de inventario
- Categorización por tipo y temporada
- Gestión de tallas y colores

### Gestión de Proveedores
- Registro de proveedores
- Información de contacto
- Relación con productos

### Gestión de Ventas
- Registrar ventas
- Historial de transacciones
- Estadísticas de ingresos

## 🗄️ Base de Datos

### Tablas Principales
- **Clientes**: Información de clientes
- **Productos**: Catálogo de productos
- **Proveedores**: Información de proveedores
- **Ventas**: Registro de transacciones

### Stored Procedures
- `sp_AgregarCliente`: Registrar cliente
- `sp_AgregarProducto`: Registrar producto
- `sp_CrearVenta`: Crear venta
- `sp_EliminarCliente`: Eliminar cliente
- `sp_ActualizarCliente`: Actualizar cliente

## 🔧 Configuración Avanzada

### Variables de Entorno
Puedes configurar las variables en `config.js`:
- Puerto del servidor
- Configuración de CORS
- Credenciales de base de datos
- URLs de la API

### Personalización
- Modificar estilos en `!DOCTYPE html.html`
- Agregar nuevas funcionalidades en `backend/index.js`
- Extender la base de datos según necesidades

## 🐛 Solución de Problemas

### Error de Conexión a MySQL
1. Verificar que MySQL esté ejecutándose
2. Confirmar credenciales en `config.js`
3. Verificar que la base de datos exista

### Error de Puerto en Uso
1. Cambiar puerto en `config.js`
2. Verificar que no haya otros servicios usando el puerto

### Error de CORS
1. Verificar configuración en `backend/index.js`
2. Asegurar que las URLs coincidan

## 📝 Notas de Desarrollo

- El sistema usa Stored Procedures para mayor seguridad
- Interfaz responsive para dispositivos móviles
- API RESTful para integración con otros sistemas
- Base de datos optimizada para consultas rápidas

## 🚀 Subir a GitHub

### Preparación del Repositorio
1. Ejecuta el script de preparación:
```powershell
.\preparar-github.ps1
```

2. Ve a [GitHub.com](https://github.com) y crea un nuevo repositorio
3. Copia la URL del repositorio (ej: `https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git`)
4. Ejecuta los siguientes comandos:
```bash
git remote add origin https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git
git branch -M main
git push -u origin main
git push -u origin develop
```

### Archivos de GitHub Creados
- ✅ `.gitignore` - Excluye archivos innecesarios
- ✅ `LICENSE` - Licencia MIT
- ✅ `CONTRIBUTING.md` - Guía de contribución
- ✅ `CHANGELOG.md` - Registro de cambios
- ✅ `.github/ISSUE_TEMPLATE/` - Plantillas para issues
- ✅ `.github/workflows/ci.yml` - Pipeline de CI/CD

## 🤝 Contribución

Para contribuir al proyecto:
1. Fork el repositorio
2. Crear una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Crear un Pull Request

Consulta `CONTRIBUTING.md` para más detalles sobre cómo contribuir.

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

---

**Desarrollado con ❤️ para la gestión eficiente de tiendas de ropa** 