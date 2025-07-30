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
            origin: '*', // En producción, especificar dominios específicos
            methods: ['GET', 'POST', 'PUT', 'DELETE'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }
    },
    
    // Configuración de la API
    api: {
        baseUrl: 'http://localhost:3000',
        endpoints: {
            productos: '/productos',
            clientes: '/clientes',
            ventas: '/ventas',
            proveedores: '/proveedores',
            ropaTemporada: '/ropa_temporada'
        }
    },
    
    // Configuración de la Aplicación
    app: {
        name: 'TiendaRopa',
        version: '1.0.0',
        description: 'Sistema de gestión para tienda de ropa'
    },
    
    // Cliente de Prueba (para demostración)
    demoClient: {
        ID_Cliente: 1,
        Nombre: 'Ana Pérez',
        Telefono: '999-111-2233',
        Correo: 'ana.perez@mail.com'
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