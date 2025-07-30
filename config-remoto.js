// Configuración para conexión remota a MySQL
// Modifica estos valores con la información de tu amigo

const configRemoto = {
    host: '10.3.0.144', // Tu IP local para que tu amigo se conecte
    user: 'amigo_user', // Usuario específico para tu amigo
    password: 'Preventa1', // Contraseña
    database: 'TiendaRopa', // Nombre de tu base de datos
    port: 3306, // Puerto MySQL
    // Opciones adicionales para conexión remota
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

module.exports = configRemoto; 