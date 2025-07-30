# 🌐 Guía de Conexión Remota a MySQL

## 📋 ¿Qué necesitas de tu amigo?

Para conectarte a la base de datos de tu amigo, necesitas que te proporcione esta información:

### 🔑 Información de Conexión
1. **IP del servidor**: La dirección IP de su computadora
2. **Puerto MySQL**: Normalmente es 3306
3. **Usuario MySQL**: El nombre de usuario para acceder a la base de datos
4. **Contraseña**: La contraseña del usuario MySQL
5. **Nombre de la base de datos**: El nombre de la base de datos que usa

### 📝 Ejemplo de información que necesitas:
```
IP: 192.168.1.100 (o la IP de tu amigo)
Puerto: 3306
Usuario: root
Contraseña: Preventa1
Base de datos: TiendaRopa
```

## 🛠️ Configuración Paso a Paso

### Paso 1: Obtener la información de tu amigo
Pídele a tu amigo que te proporcione:
- Su dirección IP (puede usar `ipconfig` en Windows)
- Los datos de conexión a MySQL
- Que confirme que MySQL está configurado para conexiones remotas

### Paso 2: Configurar el archivo de conexión
1. Abre el archivo `config-remoto.js`
2. Reemplaza los valores con la información de tu amigo:

```javascript
const configRemoto = {
    host: '192.168.1.100', // IP de tu amigo
    user: 'root', // Usuario MySQL
    password: 'Preventa1', // Contraseña MySQL
    database: 'TiendaRopa', // Nombre de la base de datos
    port: 3306, // Puerto MySQL
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};
```

### Paso 3: Configurar MySQL en la computadora de tu amigo

Tu amigo necesita hacer esto en su computadora:

#### 1. Permitir conexiones remotas en MySQL
```sql
-- En MySQL Workbench o línea de comandos
GRANT ALL PRIVILEGES ON TiendaRopa.* TO 'root'@'%' IDENTIFIED BY 'Preventa1';
FLUSH PRIVILEGES;
```

#### 2. Configurar el firewall
- Abrir el puerto 3306 en el firewall de Windows
- Permitir conexiones entrantes a MySQL

#### 3. Verificar que MySQL escucha en todas las interfaces
En el archivo `my.ini` o `my.cnf` de MySQL:
```ini
[mysqld]
bind-address = 0.0.0.0
```

### Paso 4: Probar la conexión
1. Ejecuta el script: `.\iniciar-remoto.ps1`
2. Verifica que aparezca: "✅ Conectado a la base de datos MySQL remota"
3. Si hay errores, revisa la configuración

## 🔧 Solución de Problemas

### ❌ Error: "ECONNREFUSED"
**Causa**: No se puede conectar al servidor MySQL
**Solución**:
- Verifica que la IP sea correcta
- Confirma que MySQL esté ejecutándose
- Revisa que el puerto 3306 esté abierto

### ❌ Error: "Access denied"
**Causa**: Credenciales incorrectas o permisos insuficientes
**Solución**:
- Verifica usuario y contraseña
- Confirma que el usuario tenga permisos en la base de datos

### ❌ Error: "Unknown database"
**Causa**: El nombre de la base de datos no existe
**Solución**:
- Verifica el nombre exacto de la base de datos
- Confirma que la base de datos existe en el servidor

## 🌐 Configuración de Red

### Para conexión local (misma red WiFi):
- Usa la IP local de tu amigo (ej: 192.168.1.100)
- Ambos deben estar en la misma red WiFi

### Para conexión desde internet:
- Tu amigo necesita configurar port forwarding en su router
- Usar su IP pública
- Configurar firewall para permitir conexiones externas

## 📊 Verificación de Conexión

### Test rápido de conexión:
```powershell
# En tu computadora, prueba la conexión
telnet [IP_DE_TU_AMIGO] 3306
```

### Verificar desde MySQL:
```sql
-- En la computadora de tu amigo
SHOW PROCESSLIST;
-- Deberías ver tu conexión en la lista
```

## 🚀 Iniciar el Sistema

Una vez configurado todo:

1. **Ejecuta el script remoto**:
   ```powershell
   .\iniciar-remoto.ps1
   ```

2. **Verifica la conexión**:
   - Debería aparecer: "✅ Conectado a la base de datos MySQL remota"
   - La página web se abrirá automáticamente

3. **Prueba la funcionalidad**:
   - Navega por las diferentes pestañas
   - Verifica que los datos se cargan correctamente
   - Los cambios que haga tu amigo aparecerán en tiempo real

## 💡 Consejos Importantes

- **Seguridad**: Usa contraseñas fuertes
- **Red**: Asegúrate de que ambos estén en la misma red
- **Firewall**: Verifica que no haya bloqueos
- **MySQL**: Confirma que esté configurado para conexiones remotas
- **Pruebas**: Haz cambios desde la computadora de tu amigo y verifica que aparezcan en tu página

## 🔄 Actualización en Tiempo Real

Los datos se actualizan automáticamente cuando:
- Cambias de pestaña en la página web
- Recargas la página
- Tu amigo hace cambios en la base de datos

¡Con esto ya podrás ver todos los cambios que haga tu amigo en tiempo real! 🎉 