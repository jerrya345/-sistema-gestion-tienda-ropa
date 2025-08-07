// Configuración del Sistema TiendaRopa
const config = {
    // Configuración de la Base de Datos
    database: {
        host: 'localhost',
        user: 'root',
        password: 'Preventa1', // Cambiar según tu configuración
        database: 'TiendaRopa',
        port: 3306
    },
    
    // Configuración del Servidor
    server: {
        port: 3000,
        host: 'localhost',
        cors: {
            origin: '*',
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }
    },
    
    // Configuración del Servidor Web
    webServer: {
        port: 8080,
        host: 'localhost'
    },
    
    // Configuración de la API
    api: {
        baseUrl: 'https://sistema-gestion-tienda-ropa.onrender.com',
        endpoints: {
            productos: '/productos',
            clientes: '/clientes',
            ventas: '/ventas',
            proveedores: '/proveedores',
            estadisticas: '/estadisticas'
        }
    },
    
    // Configuración de la Aplicación
    app: {
        name: 'TiendaRopa',
        version: '1.0.0',
        description: 'Sistema de gestión para tienda de ropa'
    }
};

// Exportar configuración para uso en Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// Exportar para uso en navegador
if (typeof window !== 'undefined') {
    window.config = config;
} 