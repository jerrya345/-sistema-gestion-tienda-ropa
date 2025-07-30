// Configuración para que tu amigo se conecte a tu base de datos
// Tu amigo debe usar este archivo en su proyecto

const configAmigo = {
    host: '10.3.0.144', // Tu IP local
    user: 'amigo_user', // Usuario que creamos para tu amigo
    password: 'Preventa1', // Contraseña
    database: 'TiendaRopa', // Tu base de datos
    port: 3306, // Puerto MySQL
    // Opciones para conexión remota
    connectionLimit: 10,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
};

module.exports = configAmigo; 