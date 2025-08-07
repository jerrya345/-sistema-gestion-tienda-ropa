const express = require('express');
const path = require('path');
const config = require('./config');

const app = express();
const port = config.webServer.port;

// Servir archivos estáticos
app.use(express.static('.'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '!DOCTYPE html.html'));
});

// Ruta específica para el archivo HTML
app.get('/tienda', (req, res) => {
    res.sendFile(path.join(__dirname, '!DOCTYPE html.html'));
});

// Middleware para CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.listen(port, () => {
    console.log('🏪 Sistema de Gestión - Tienda de Ropa');
    console.log('========================================');
    console.log(`🌐 Servidor web: http://localhost:${port}`);
    console.log(`🔗 Interfaz principal: http://localhost:${port}/tienda`);
    console.log(`⚙️  API Backend: http://localhost:${config.server.port}`);
    console.log('✅ Sistema listo para usar');
}); 