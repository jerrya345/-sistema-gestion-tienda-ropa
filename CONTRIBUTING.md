# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir al Sistema de Gestión de Tienda de Ropa! 

## 🚀 Cómo Contribuir

### 1. Fork del Repositorio
1. Ve a [GitHub](https://github.com/tu-usuario/sistema-gestion-tienda-ropa)
2. Haz clic en "Fork" en la esquina superior derecha
3. Clona tu fork localmente:
```bash
git clone https://github.com/tu-usuario/sistema-gestion-tienda-ropa.git
cd sistema-gestion-tienda-ropa
```

### 2. Configurar el Entorno de Desarrollo
```bash
# Instalar dependencias
npm install
cd backend && npm install

# Configurar base de datos
mysql -u root -p < boutiqueavilescruz.sql
node crear-stored-procedures.js

# Configurar variables de entorno
cp config.js config.local.js
# Editar config.local.js con tus credenciales
```

### 3. Crear una Rama
```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 4. Hacer Cambios
- Escribe código limpio y bien documentado
- Sigue las convenciones de nomenclatura existentes
- Agrega comentarios cuando sea necesario
- Prueba tus cambios localmente

### 5. Commit y Push
```bash
git add .
git commit -m "feat: agregar nueva funcionalidad de reportes"
git push origin feature/nueva-funcionalidad
```

### 6. Crear Pull Request
1. Ve a tu fork en GitHub
2. Haz clic en "New Pull Request"
3. Selecciona la rama con tus cambios
4. Describe tus cambios detalladamente
5. Envía el PR

## 📋 Convenciones

### Commits
Usa el formato convencional:
- `feat:` Nueva funcionalidad
- `fix:` Corrección de bug
- `docs:` Documentación
- `style:` Formato de código
- `refactor:` Refactorización
- `test:` Pruebas
- `chore:` Tareas de mantenimiento

### Código
- Usa 2 espacios para indentación
- Nombres de variables en camelCase
- Nombres de funciones descriptivos
- Comenta funciones complejas

### Base de Datos
- Usa Stored Procedures para operaciones complejas
- Mantén consistencia en nombres de tablas
- Documenta cambios en la estructura

## 🐛 Reportar Bugs

### Antes de Reportar
1. Verifica que el bug no haya sido reportado ya
2. Prueba en la última versión del código
3. Revisa la documentación

### Información Necesaria
- Descripción clara del problema
- Pasos para reproducir
- Comportamiento esperado vs actual
- Información del sistema (OS, Node.js, MySQL)
- Logs de error si aplica

## 💡 Sugerencias de Mejoras

### Antes de Sugerir
1. Revisa las issues existentes
2. Considera si la mejora es útil para otros usuarios
3. Piensa en la implementación

### Información Necesaria
- Descripción clara de la mejora
- Casos de uso
- Beneficios para los usuarios
- Posible implementación

## 🧪 Pruebas

### Ejecutar Pruebas
```bash
# Pruebas del backend
cd backend
npm test

# Pruebas de la base de datos
node crear-stored-procedures.js
```

### Escribir Pruebas
- Prueba todas las nuevas funcionalidades
- Incluye casos edge
- Mantén las pruebas actualizadas

## 📚 Documentación

### Actualizar Documentación
- README.md para cambios principales
- Comentarios en código para funciones complejas
- Documentación de API si agregas endpoints

## 🎯 Áreas de Contribución

### Prioridad Alta
- Mejoras en la interfaz de usuario
- Optimización de consultas de base de datos
- Nuevas funcionalidades de reportes
- Mejoras en la seguridad

### Prioridad Media
- Documentación adicional
- Pruebas unitarias
- Refactorización de código
- Mejoras en el rendimiento

### Prioridad Baja
- Correcciones menores de estilo
- Mejoras en la documentación
- Sugerencias de UX

## 📞 Contacto

Si tienes preguntas sobre cómo contribuir:
- Abre una issue en GitHub
- Revisa la documentación existente
- Únete a las discusiones en las issues

## 🙏 Agradecimientos

¡Gracias por contribuir a hacer este proyecto mejor para todos!

---

**¡Cada contribución, sin importar su tamaño, es valiosa para el proyecto!** 🚀 