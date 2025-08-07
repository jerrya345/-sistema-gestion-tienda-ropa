const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 10000; // Puerto para Render

app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Servir archivos estáticos (para la interfaz)
app.use(express.static(path.join(__dirname)));

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'Preventa1',
    database: process.env.DB_NAME || 'TiendaRopa',
    port: process.env.DB_PORT || 3306
});

db.connect((err) => {
    if (err) {
        console.error('❌ Error al conectar a la base de datos:', err);
        console.error('🔧 Configuración actual:');
        console.error('   Host:', process.env.DB_HOST || 'localhost');
        console.error('   User:', process.env.DB_USER || 'root');
        console.error('   Database:', process.env.DB_NAME || 'TiendaRopa');
        console.error('   Port:', process.env.DB_PORT || 3306);
        return;
    }
    console.log('✅ API de Tienda conectada a la base de datos MySQL');
    console.log('📊 Base de datos:', process.env.DB_NAME || 'TiendaRopa');
});

// ========================================
// RUTAS PRINCIPALES (INTERFAZ Y DOCS)
// ========================================

// 1. Ruta principal - servir la interfaz gráfica
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'interfaz-api.html'));
});

// 2. Ruta de documentación de la API
app.get('/docs', (req, res) => {
    res.json({
        message: '📚 Documentación de la API de Tienda',
        version: '1.0.0',
        endpoints: {
            // Endpoints públicos (para clientes)
            'GET /productos': 'Obtener todos los productos disponibles',
            'GET /productos/categoria/:id': 'Obtener productos por categoría',
            'GET /productos/marca/:marca': 'Obtener productos por marca',
            'GET /categorias': 'Obtener todas las categorías',
            'GET /marcas': 'Obtener todas las marcas',
            'POST /clientes': 'Registrar un nuevo cliente',
            'POST /ordenes': 'Crear una orden de compra',
            'GET /health': 'Verificar estado de la API',
            'GET /test': 'Test de conexión',
            
            // Endpoints de administración
            'GET /api/clientes': 'Obtener todos los clientes (para admin)',
            'GET /api/clientes/:id': 'Obtener cliente por ID (para admin)',
            'POST /api/clientes': 'Registrar nuevo cliente (para admin)',
            'DELETE /api/clientes/:id': 'Eliminar cliente (para admin)',
            'GET /api/productos/admin': 'Obtener todos los productos (para admin)',
            'POST /api/productos': 'Registrar nuevo producto (para admin)',
            'DELETE /api/productos/:id': 'Eliminar producto (para admin)',
            'GET /api/proveedores': 'Obtener todos los proveedores (para admin)',
            'GET /api/proveedores/:id': 'Obtener proveedor por ID (para admin)',
            'POST /api/proveedores': 'Registrar nuevo proveedor (para admin)',
            'DELETE /api/proveedores/:id': 'Eliminar proveedor (para admin)',
            'GET /api/ventas': 'Obtener todas las ventas (para admin)',
            'GET /api/ventas/:id': 'Obtener venta por ID (para admin)',
            'POST /api/ventas': 'Registrar nueva venta (para admin)',
            'GET /api/estadisticas': 'Obtener estadísticas del dashboard (para admin)'
        },
        info: {
            baseUrl: 'https://sistema-gestion-tienda-ropa.onrender.com',
            database: 'MySQL en Railway',
            frontend: 'Interfaz integrada en /'
        }
    });
});

// 3. Test endpoint para verificar conexión
app.get('/api/test', (req, res) => {
    res.json({
        success: true,
        message: 'API funcionando',
        timestamp: new Date().toISOString(),
        env: process.env.NODE_ENV,
        port: process.env.PORT
    });
});

// 4. Health check
app.get('/api/health', (req, res) => {
    res.json({
        status: 'OK',
        message: 'API de Tienda funcionando correctamente',
        timestamp: new Date().toISOString(),
        database: 'MySQL',
        version: '1.0.0'
    });
});

// ========================================
// ENDPOINTS PÚBLICOS (PARA CLIENTES)
// ========================================

// 5. Obtener todos los productos (público)
app.get('/productos', (req, res) => {
    const query = `
        SELECT p.*, c.Nombre as Categoria, pr.Nombre as Proveedor
        FROM Productos p
        LEFT JOIN Categorias c ON p.ID_Categoria = c.ID_Categoria
        LEFT JOIN Proveedores pr ON p.ID_Proveedor = pr.ID_Proveedor
        WHERE p.Stock > 0
        ORDER BY p.Nombre
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            data: results,
            total: results.length
        });
    });
});

// 6. Obtener productos por categoría
app.get('/productos/categoria/:id', (req, res) => {
    const categoriaId = req.params.id;
    const query = `
        SELECT p.*, c.Nombre as Categoria
        FROM Productos p
        LEFT JOIN Categorias c ON p.ID_Categoria = c.ID_Categoria
        WHERE p.ID_Categoria = ? AND p.Stock > 0
        ORDER BY p.Nombre
    `;
    
    db.query(query, [categoriaId], (err, results) => {
        if (err) {
            console.error('Error obteniendo productos por categoría:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            data: results,
            categoria: categoriaId,
            total: results.length
        });
    });
});

// 7. Obtener productos por marca
app.get('/productos/marca/:marca', (req, res) => {
    const marca = req.params.marca;
    const query = `
        SELECT p.*, c.Nombre as Categoria
        FROM Productos p
        LEFT JOIN Categorias c ON p.ID_Categoria = c.ID_Categoria
        WHERE p.Marca LIKE ? AND p.Stock > 0
        ORDER BY p.Nombre
    `;
    
    db.query(query, [`%${marca}%`], (err, results) => {
        if (err) {
            console.error('Error obteniendo productos por marca:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            data: results,
            marca: marca,
            total: results.length
        });
    });
});

// 8. Obtener todas las categorías
app.get('/categorias', (req, res) => {
    const query = 'SELECT * FROM Categorias ORDER BY Nombre';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo categorías:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            data: results,
            total: results.length
        });
    });
});

// 9. Obtener todas las marcas
app.get('/marcas', (req, res) => {
    const query = 'SELECT DISTINCT Marca FROM Productos WHERE Marca IS NOT NULL ORDER BY Marca';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo marcas:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            data: results,
            total: results.length
        });
    });
});

// 10. Registrar nuevo cliente (público)
app.post('/clientes', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    
    if (!Nombre || !Telefono || !Correo) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    const query = 'INSERT INTO Clientes (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    db.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error registrando cliente:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            message: 'Cliente registrado exitosamente',
            id: result.insertId
        });
    });
});

// 11. Crear orden de compra
app.post('/ordenes', (req, res) => {
    const { ID_Cliente, Total, Productos } = req.body;
    
    if (!ID_Cliente || !Total || !Productos) {
        return res.status(400).json({ error: 'Datos de orden incompletos' });
    }
    
    // Iniciar transacción
    db.beginTransaction((err) => {
        if (err) {
            return res.status(500).json({ error: 'Error iniciando transacción' });
        }
        
        // Crear la venta
        const ventaQuery = 'INSERT INTO Ventas (ID_Cliente, Total, Fecha) VALUES (?, ?, NOW())';
        db.query(ventaQuery, [ID_Cliente, Total], (err, ventaResult) => {
            if (err) {
                return db.rollback(() => {
                    res.status(500).json({ error: 'Error creando venta' });
                });
            }
            
            const ventaId = ventaResult.insertId;
            
            // Crear detalles de venta
            let detallesCompletados = 0;
            let errorOcurrido = false;
            
            Productos.forEach(producto => {
                const detalleQuery = 'INSERT INTO Detalle_Venta (ID_Venta, ID_Producto, Cantidad, Precio_Unitario) VALUES (?, ?, ?, ?)';
                db.query(detalleQuery, [ventaId, producto.ID_Producto, producto.Cantidad, producto.Precio], (err) => {
                    if (err && !errorOcurrido) {
                        errorOcurrido = true;
                        return db.rollback(() => {
                            res.status(500).json({ error: 'Error creando detalles de venta' });
                        });
                    }
                    
                    detallesCompletados++;
                    if (detallesCompletados === Productos.length && !errorOcurrido) {
                        db.commit((err) => {
                            if (err) {
                                return db.rollback(() => {
                                    res.status(500).json({ error: 'Error confirmando transacción' });
                                });
                            }
                            res.json({
                                success: true,
                                message: 'Orden creada exitosamente',
                                ventaId: ventaId
                            });
                        });
                    }
                });
            });
        });
    });
});

// ========================================
// ENDPOINTS PARA EL PANEL DE ADMINISTRACIÓN
// ========================================

// 12. Obtener todos los clientes (para admin)
app.get('/api/clientes', (req, res) => {
    const query = 'SELECT * FROM Clientes ORDER BY Nombre';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo clientes:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

// 13. Obtener cliente por ID (para admin)
app.get('/api/clientes/:id', (req, res) => {
    const clienteId = req.params.id;
    const query = 'SELECT * FROM Clientes WHERE ID_Cliente = ?';
    
    db.query(query, [clienteId], (err, results) => {
        if (err) {
            console.error('Error obteniendo cliente:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json(results[0]);
    });
});

// 14. Registrar nuevo cliente (para admin)
app.post('/api/clientes', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    
    if (!Nombre || !Telefono || !Correo) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    const query = 'INSERT INTO Clientes (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    db.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error registrando cliente:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            message: 'Cliente registrado exitosamente',
            id: result.insertId
        });
    });
});

// 15. Eliminar cliente (para admin)
app.delete('/api/clientes/:id', (req, res) => {
    const clienteId = req.params.id;
    const query = 'DELETE FROM Clientes WHERE ID_Cliente = ?';
    
    db.query(query, [clienteId], (err, result) => {
        if (err) {
            console.error('Error eliminando cliente:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Cliente no encontrado' });
        }
        res.json({
            success: true,
            message: 'Cliente eliminado exitosamente'
        });
    });
});

// 16. Obtener todos los productos (para admin)
app.get('/api/productos/admin', (req, res) => {
    const query = `
        SELECT p.*, c.Nombre as Categoria, pr.Nombre as Proveedor
        FROM Productos p
        LEFT JOIN Categorias c ON p.ID_Categoria = c.ID_Categoria
        LEFT JOIN Proveedores pr ON p.ID_Proveedor = pr.ID_Proveedor
        ORDER BY p.Nombre
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo productos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

// 17. Registrar nuevo producto (para admin)
app.post('/api/productos', (req, res) => {
    const { 
        Nombre, Descripcion, Talla, Color, Precio, Marca, 
        Tipo_Prenda, Temporada, Stock, ID_Proveedor, ID_Categoria 
    } = req.body;
    
    if (!Nombre || !Precio || !Stock) {
        return res.status(400).json({ error: 'Campos requeridos faltantes' });
    }
    
    const query = `
        INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, 
                              Tipo_Prenda, Temporada, Stock, ID_Proveedor, ID_Categoria)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    db.query(query, [Nombre, Descripcion, Talla, Color, Precio, Marca, 
                     Tipo_Prenda, Temporada, Stock, ID_Proveedor, ID_Categoria], (err, result) => {
        if (err) {
            console.error('Error registrando producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            message: 'Producto registrado exitosamente',
            id: result.insertId
        });
    });
});

// 18. Eliminar producto (para admin)
app.delete('/api/productos/:id', (req, res) => {
    const productoId = req.params.id;
    const query = 'DELETE FROM Productos WHERE ID_Producto = ?';
    
    db.query(query, [productoId], (err, result) => {
        if (err) {
            console.error('Error eliminando producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.json({
            success: true,
            message: 'Producto eliminado exitosamente'
        });
    });
});

// 19. Obtener todos los proveedores (para admin)
app.get('/api/proveedores', (req, res) => {
    const query = 'SELECT * FROM Proveedores ORDER BY Nombre';
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo proveedores:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

// 20. Obtener proveedor por ID (para admin)
app.get('/api/proveedores/:id', (req, res) => {
    const proveedorId = req.params.id;
    const query = 'SELECT * FROM Proveedores WHERE ID_Proveedor = ?';
    
    db.query(query, [proveedorId], (err, results) => {
        if (err) {
            console.error('Error obteniendo proveedor:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json(results[0]);
    });
});

// 21. Registrar nuevo proveedor (para admin)
app.post('/api/proveedores', (req, res) => {
    const { Nombre, Telefono, Correo } = req.body;
    
    if (!Nombre || !Telefono || !Correo) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }
    
    const query = 'INSERT INTO Proveedores (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
    
    db.query(query, [Nombre, Telefono, Correo], (err, result) => {
        if (err) {
            console.error('Error registrando proveedor:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            message: 'Proveedor registrado exitosamente',
            id: result.insertId
        });
    });
});

// 22. Eliminar proveedor (para admin)
app.delete('/api/proveedores/:id', (req, res) => {
    const proveedorId = req.params.id;
    const query = 'DELETE FROM Proveedores WHERE ID_Proveedor = ?';
    
    db.query(query, [proveedorId], (err, result) => {
        if (err) {
            console.error('Error eliminando proveedor:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Proveedor no encontrado' });
        }
        res.json({
            success: true,
            message: 'Proveedor eliminado exitosamente'
        });
    });
});

// 23. Obtener todas las ventas (para admin)
app.get('/api/ventas', (req, res) => {
    const query = `
        SELECT v.*, c.Nombre as Cliente
        FROM Ventas v
        LEFT JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente
        ORDER BY v.Fecha DESC
    `;
    
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error obteniendo ventas:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(results);
    });
});

// 24. Obtener venta por ID (para admin)
app.get('/api/ventas/:id', (req, res) => {
    const ventaId = req.params.id;
    const query = `
        SELECT v.*, c.Nombre as Cliente
        FROM Ventas v
        LEFT JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente
        WHERE v.ID_Venta = ?
    `;
    
    db.query(query, [ventaId], (err, results) => {
        if (err) {
            console.error('Error obteniendo venta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        if (results.length === 0) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(results[0]);
    });
});

// 25. Registrar nueva venta (para admin)
app.post('/api/ventas', (req, res) => {
    const { ID_Cliente, Total } = req.body;
    
    if (!ID_Cliente || !Total) {
        return res.status(400).json({ error: 'ID_Cliente y Total son requeridos' });
    }
    
    const query = 'INSERT INTO Ventas (ID_Cliente, Total, Fecha) VALUES (?, ?, NOW())';
    
    db.query(query, [ID_Cliente, Total], (err, result) => {
        if (err) {
            console.error('Error registrando venta:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({
            success: true,
            message: 'Venta registrada exitosamente',
            id: result.insertId
        });
    });
});

// 26. Obtener estadísticas del dashboard (para admin)
app.get('/api/estadisticas', (req, res) => {
    const queries = {
        totalClientes: 'SELECT COUNT(*) as total FROM Clientes',
        totalProductos: 'SELECT COUNT(*) as total FROM Productos',
        ventasHoy: 'SELECT COALESCE(SUM(Total), 0) as total FROM Ventas WHERE DATE(Fecha) = CURDATE()',
        ventasMes: 'SELECT COALESCE(SUM(Total), 0) as total FROM Ventas WHERE MONTH(Fecha) = MONTH(CURDATE()) AND YEAR(Fecha) = YEAR(CURDATE())'
    };
    
    const results = {};
    let completed = 0;
    const totalQueries = Object.keys(queries).length;
    
    Object.keys(queries).forEach(key => {
        db.query(queries[key], (err, result) => {
            if (err) {
                console.error(`Error obteniendo ${key}:`, err);
                results[key] = 0;
            } else {
                results[key] = result[0].total;
            }
            
            completed++;
            if (completed === totalQueries) {
                res.json({
                    totalClientes: results.totalClientes,
                    totalProductos: results.totalProductos,
                    ventasHoy: results.ventasHoy,
                    ventasMes: results.ventasMes
                });
            }
        });
    });
});

// Manejar rutas no encontradas
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`🚀 API de Tienda iniciada en puerto ${port}`);
    console.log(`📱 URL local: http://localhost:${port}`);
    console.log(`🌐 Interfaz disponible en: http://localhost:${port}`);
    console.log(`📚 Documentación en: http://localhost:${port}/docs`);
    console.log(`🧪 Test en: http://localhost:${port}/api/test`);
}); 