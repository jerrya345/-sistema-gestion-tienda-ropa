const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3001; // Puerto diferente para la API de tienda

app.use(cors());
app.use(express.json());

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
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('✅ API de Tienda conectada a la base de datos MySQL');
});

// ========================================
// ENDPOINTS PÚBLICOS PARA LA TIENDA WEB
// ========================================

// 1. Obtener productos disponibles (público)
app.get('/api/productos', (req, res) => {
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock,
      pr.Nombre AS Nombre_Proveedor
    FROM Productos p
    LEFT JOIN Proveedores pr ON p.ID_Proveedor = pr.ID_Proveedor
    WHERE p.Stock > 0
    ORDER BY p.Nombre ASC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error al obtener productos:', err);
      return res.status(500).json({ 
        error: 'Error al obtener productos',
        message: 'No se pudieron cargar los productos'
      });
    }
    res.json({
      success: true,
      data: results,
      total: results.length
    });
  });
});

// 2. Buscar productos por categoría
app.get('/api/productos/categoria/:categoria', (req, res) => {
  const categoria = req.params.categoria;
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock
    FROM Productos p
    WHERE p.Tipo_Prenda = ? AND p.Stock > 0
    ORDER BY p.Precio ASC
  `;
  
  db.query(sql, [categoria], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al buscar productos',
        message: 'No se pudieron cargar los productos de esta categoría'
      });
    }
    res.json({
      success: true,
      categoria: categoria,
      data: results,
      total: results.length
    });
  });
});

// 3. Buscar productos por precio
app.get('/api/productos/precio/:min/:max', (req, res) => {
  const { min, max } = req.params;
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock
    FROM Productos p
    WHERE p.Precio BETWEEN ? AND ? AND p.Stock > 0
    ORDER BY p.Precio ASC
  `;
  
  db.query(sql, [min, max], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al buscar productos',
        message: 'No se pudieron cargar los productos en este rango de precio'
      });
    }
    res.json({
      success: true,
      precio_min: min,
      precio_max: max,
      data: results,
      total: results.length
    });
  });
});

// 4. Buscar productos por nombre
app.get('/api/productos/buscar/:termino', (req, res) => {
  const termino = req.params.termino;
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock
    FROM Productos p
    WHERE (p.Nombre LIKE ? OR p.Descripcion LIKE ? OR p.Marca LIKE ?) 
    AND p.Stock > 0
    ORDER BY p.Nombre ASC
  `;
  
  const searchTerm = `%${termino}%`;
  db.query(sql, [searchTerm, searchTerm, searchTerm], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al buscar productos',
        message: 'No se pudieron buscar los productos'
      });
    }
    res.json({
      success: true,
      termino: termino,
      data: results,
      total: results.length
    });
  });
});

// 5. Obtener detalles de un producto específico
app.get('/api/productos/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock,
      pr.Nombre AS Nombre_Proveedor,
      pr.Telefono AS Telefono_Proveedor
    FROM Productos p
    LEFT JOIN Proveedores pr ON p.ID_Proveedor = pr.ID_Proveedor
    WHERE p.ID_Producto = ?
  `;
  
  db.query(sql, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al obtener producto',
        message: 'No se pudo cargar el producto'
      });
    }
    if (results.length === 0) {
      return res.status(404).json({ 
        error: 'Producto no encontrado',
        message: 'El producto solicitado no existe'
      });
    }
    res.json({
      success: true,
      data: results[0]
    });
  });
});

// 6. Obtener categorías disponibles
app.get('/api/categorias', (req, res) => {
  const sql = `
    SELECT DISTINCT Tipo_Prenda as categoria, COUNT(*) as total_productos
    FROM Productos 
    WHERE Stock > 0
    GROUP BY Tipo_Prenda
    ORDER BY total_productos DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al obtener categorías',
        message: 'No se pudieron cargar las categorías'
      });
    }
    res.json({
      success: true,
      data: results
    });
  });
});

// 7. Obtener marcas disponibles
app.get('/api/marcas', (req, res) => {
  const sql = `
    SELECT DISTINCT Marca, COUNT(*) as total_productos
    FROM Productos 
    WHERE Stock > 0
    GROUP BY Marca
    ORDER BY total_productos DESC
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al obtener marcas',
        message: 'No se pudieron cargar las marcas'
      });
    }
    res.json({
      success: true,
      data: results
    });
  });
});

// 8. Registrar cliente (para compras)
app.post('/api/clientes', (req, res) => {
  const { Nombre, Telefono, Correo } = req.body;
  
  if (!Nombre || !Telefono || !Correo) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'Nombre, teléfono y correo son requeridos'
    });
  }
  
  const sql = 'CALL sp_AgregarCliente(?, ?, ?)';
  db.query(sql, [Nombre, Telefono, Correo], (err, result) => {
    if (err) {
      console.error('Error al registrar cliente:', err);
      return res.status(500).json({ 
        error: 'Error al registrar cliente',
        message: 'No se pudo registrar el cliente'
      });
    }
    const resultado = result[0][0];
    res.status(201).json({ 
      success: true,
      message: resultado.Mensaje, 
      id: resultado.ID_Cliente 
    });
  });
});

// 9. Crear orden de compra
app.post('/api/ordenes', (req, res) => {
  const { ID_Cliente, productos, total } = req.body;
  
  if (!ID_Cliente || !productos || !total) {
    return res.status(400).json({
      error: 'Datos incompletos',
      message: 'Cliente, productos y total son requeridos'
    });
  }
  
  // Crear la venta
  const sqlVenta = 'CALL sp_CrearVenta(?, ?)';
  db.query(sqlVenta, [ID_Cliente, total], (err, result) => {
    if (err) {
      console.error('Error al crear venta:', err);
      return res.status(500).json({ 
        error: 'Error al crear orden',
        message: 'No se pudo procesar la orden'
      });
    }
    
    const ventaResult = result[0][0];
    const ID_Venta = ventaResult.ID_Venta;
    
    // Agregar detalles de la venta
    let detallesCompletados = 0;
    let errores = [];
    
    productos.forEach((producto, index) => {
      const sqlDetalle = 'CALL sp_AgregarDetalleVenta(?, ?, ?, ?)';
      const subtotal = producto.cantidad * producto.precio;
      
      db.query(sqlDetalle, [ID_Venta, producto.ID_Producto, producto.cantidad, subtotal], (err, result) => {
        if (err) {
          errores.push(`Error en producto ${producto.Nombre}: ${err.message}`);
        }
        
        detallesCompletados++;
        
        if (detallesCompletados === productos.length) {
          if (errores.length > 0) {
            return res.status(500).json({
              error: 'Error en algunos productos',
              message: 'La orden se creó pero algunos productos no se procesaron',
              errores: errores
            });
          }
          
          res.status(201).json({
            success: true,
            message: 'Orden creada exitosamente',
            orden_id: ID_Venta,
            total: total
          });
        }
      });
    });
  });
});

// 10. Obtener información de contacto de la tienda
app.get('/api/tienda/info', (req, res) => {
  res.json({
    success: true,
    data: {
      nombre: "Boutique Avilés Cruz",
      descripcion: "Tienda de ropa con las mejores tendencias",
      direccion: "Dirección de la tienda",
      telefono: "+1234567890",
      email: "info@boutiqueavilescruz.com",
      horarios: "Lunes a Sábado: 9:00 AM - 8:00 PM",
      redes_sociales: {
        facebook: "https://facebook.com/boutiqueavilescruz",
        instagram: "https://instagram.com/boutiqueavilescruz",
        twitter: "https://twitter.com/boutiqueavilescruz"
      }
    }
  });
});

// 11. Obtener productos destacados
app.get('/api/productos/destacados', (req, res) => {
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock
    FROM Productos p
    WHERE p.Stock > 0
    ORDER BY p.Precio DESC
    LIMIT 8
  `;
  
  db.query(sql, (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al obtener productos destacados',
        message: 'No se pudieron cargar los productos destacados'
      });
    }
    res.json({
      success: true,
      data: results,
      total: results.length
    });
  });
});

// 12. Obtener productos por temporada
app.get('/api/productos/temporada/:temporada', (req, res) => {
  const temporada = req.params.temporada;
  const sql = `
    SELECT 
      p.ID_Producto, 
      p.Nombre, 
      p.Descripcion, 
      p.Talla, 
      p.Color, 
      p.Precio, 
      p.Marca, 
      p.Tipo_Prenda, 
      p.Temporada, 
      p.Stock
    FROM Productos p
    WHERE p.Temporada = ? AND p.Stock > 0
    ORDER BY p.Precio ASC
  `;
  
  db.query(sql, [temporada], (err, results) => {
    if (err) {
      return res.status(500).json({ 
        error: 'Error al obtener productos de temporada',
        message: 'No se pudieron cargar los productos de esta temporada'
      });
    }
    res.json({
      success: true,
      temporada: temporada,
      data: results,
      total: results.length
    });
  });
});

// 13. Health check para Render
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'API de Tienda funcionando correctamente',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 14. Documentación de la API
app.get('/api/docs', (req, res) => {
  res.json({
    success: true,
    message: 'API de Tienda - Documentación',
    endpoints: {
      'GET /api/productos': 'Obtener todos los productos disponibles',
      'GET /api/productos/:id': 'Obtener detalles de un producto específico',
      'GET /api/productos/categoria/:categoria': 'Buscar productos por categoría',
      'GET /api/productos/precio/:min/:max': 'Buscar productos por rango de precio',
      'GET /api/productos/buscar/:termino': 'Buscar productos por nombre',
      'GET /api/categorias': 'Obtener categorías disponibles',
      'GET /api/marcas': 'Obtener marcas disponibles',
      'GET /api/productos/destacados': 'Obtener productos destacados',
      'GET /api/productos/temporada/:temporada': 'Obtener productos por temporada',
      'GET /api/tienda/info': 'Obtener información de la tienda',
      'POST /api/clientes': 'Registrar un nuevo cliente',
      'POST /api/ordenes': 'Crear una orden de compra',
      'GET /api/health': 'Verificar estado de la API'
    }
  });
});

// Manejo de errores 404
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Endpoint no encontrado',
    message: 'La ruta solicitada no existe',
    available_endpoints: [
      '/api/productos',
      '/api/categorias',
      '/api/marcas',
      '/api/tienda/info',
      '/api/health',
      '/api/docs'
    ]
  });
});

app.listen(port, () => {
  console.log(`🛍️ API de Tienda escuchando en http://localhost:${port}`);
  console.log(`📚 Documentación disponible en: http://localhost:${port}/api/docs`);
  console.log(`💚 Health check disponible en: http://localhost:${port}/api/health`);
}); 