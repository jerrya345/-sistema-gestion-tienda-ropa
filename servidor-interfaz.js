const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 8080;

// Configurar CORS
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Servir archivos estáticos
app.use(express.static(path.join(__dirname)));

// Ruta principal - servir la interfaz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interfaz-api.html'));
});

// Ruta de salud
app.get('/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'Interfaz API funcionando correctamente',
        timestamp: new Date().toISOString(),
        port: port
    });
});

// Ruta para verificar la API externa
app.get('/api-status', async (req, res) => {
    try {
        const API_URL = 'https://sistema-gestion-tienda-ropa.onrender.com';
        const response = await fetch(`${API_URL}/api/test`);
        
        if (response.ok) {
            const data = await response.json();
            res.json({
                status: 'connected',
                message: 'API externa conectada',
                apiData: data
            });
        } else {
            res.json({
                status: 'error',
                message: 'Error conectando a la API externa'
            });
        }
    } catch (error) {
        res.json({
            status: 'error',
            message: 'Error conectando a la API externa',
            error: error.message
        });
    }
});

// Manejar rutas no encontradas
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`🚀 Interfaz API iniciada en puerto ${port}`);
    console.log(`📱 URL: http://localhost:${port}`);
    console.log(`🌐 Cuando se despliegue en Render, estará disponible online`);
});

module.exports = app; 