const mysql = require('mysql2');

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Preventa1',
  database: 'TiendaRopa'
});

console.log('Intentando conectar a la base de datos...');

db.connect((err) => {
  if (err) {
    console.error('❌ Error al conectar a la base de datos:', err.message);
    console.log('\nPosibles soluciones:');
    console.log('1. Verifica que MySQL esté ejecutándose');
    console.log('2. Verifica las credenciales (usuario/contraseña)');
    console.log('3. Verifica que la base de datos "TiendaRopa" exista');
    console.log('4. Ejecuta el script SQL para crear la base de datos');
    return;
  }
  
  console.log('✅ Conectado a la base de datos MySQL');
  
  // Probar una consulta simple
  db.query('SELECT COUNT(*) as total FROM Productos', (err, results) => {
    if (err) {
      console.error('❌ Error al consultar productos:', err.message);
    } else {
      console.log(`✅ Base de datos funcionando. Productos encontrados: ${results[0].total}`);
    }
    
    db.end();
  });
}); 