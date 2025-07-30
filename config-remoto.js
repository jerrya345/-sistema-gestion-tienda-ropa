// Configuración para conexión remota a MySQL
// Modifica estos valores con la información de tu amigo

const configRemoto = {
    host: 'localhost', // Cambiar a localhost para conexión local
    user: 'root', // Usuario MySQL
    password: 'Preventa1', // Tu contraseña MySQL
    database: 'TiendaRopa', // Nombre de tu base de datos
    port: 3306, // Puerto MySQL
    // Opciones adicionales para conexión remota
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

module.exports = configRemoto; 