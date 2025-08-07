const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost', // Conexión local a MySQL
  user: 'root',
  password: 'Preventa1',
  database: 'TiendaRopa',
  port: 3306 // Puerto por defecto de MySQL
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para registrar un cliente usando Stored Procedure
app.post('/clientes', (req, res) => {
  const { Nombre, Telefono, Correo } = req.body;
  const sql = 'CALL sp_AgregarCliente(?, ?, ?)';
  db.query(sql, [Nombre, Telefono, Correo], (err, result) => {
    if (err) {
      console.error('Error al insertar cliente:', err);
      res.status(500).json({ error: 'Error al registrar cliente', detalle: err.sqlMessage });
      return;
    }
    // El Stored Procedure devuelve el ID y mensaje
    const resultado = result[0][0];
    res.status(201).json({ 
      message: resultado.Mensaje, 
      id: resultado.ID_Cliente 
    });
  });
});

// Endpoint para obtener todos los clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT ID_Cliente, Nombre, Telefono, Correo FROM Clientes', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener clientes' });
    res.json(results);
  });
});

// Endpoint para buscar cliente por ID
app.get('/clientes/buscar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT ID_Cliente, Nombre, Telefono, Correo FROM Clientes WHERE ID_Cliente = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar cliente' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(results[0]);
  });
});

// Endpoint para buscar cliente por ID usando Stored Procedure
app.get('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'CALL sp_BuscarClientePorID(?)';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al buscar cliente:', err);
      return res.status(500).json({ error: 'Error al buscar cliente' });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.json(results[0][0]);
  });
});

// Endpoint para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'CALL sp_EliminarCliente(?)';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar cliente:', err);
      return res.status(500).json({ error: 'Error al eliminar cliente', detalle: err.sqlMessage });
    }
    res.json({ message: 'Cliente eliminado exitosamente' });
  });
});

// Endpoint para actualizar datos de cliente
app.put('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const { Nombre, Telefono, Correo } = req.body;
  const sql = 'CALL sp_ActualizarCliente(?, ?, ?, ?)';
  db.query(sql, [clienteId, Nombre, Telefono, Correo], (err, result) => {
    if (err) {
      console.error('Error al actualizar cliente:', err);
      return res.status(500).json({ error: 'Error al actualizar cliente', detalle: err.sqlMessage });
    }
    res.json({ message: 'Cliente actualizado exitosamente' });
  });
});

// Endpoint para registrar un producto usando Stored Procedure
app.post('/productos', (req, res) => {
  const { Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor } = req.body;
  const sql = 'CALL sp_AgregarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor], (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err);
      return res.status(500).json({ error: 'Error al registrar producto', detalle: err.sqlMessage });
    }
    // El Stored Procedure devuelve el ID y mensaje
    const resultado = result[0][0];
    res.status(201).json({ 
      message: resultado.Mensaje, 
      id: resultado.ID_Producto 
    });
  });
});

// Endpoint para obtener todos los productos con JOIN a proveedores
app.get('/productos', (req, res) => {
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
      p.ID_Proveedor,
      pr.Nombre AS Nombre_Proveedor,
      pr.Telefono AS Telefono_Proveedor
    FROM Productos p
    LEFT JOIN Proveedores pr ON p.ID_Proveedor = pr.ID_Proveedor
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    res.json(results);
  });
});

// Endpoint para buscar producto por ID con JOIN
app.get('/productos/buscar/:id', (req, res) => {
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
      p.ID_Proveedor,
      pr.Nombre AS Nombre_Proveedor,
      pr.Telefono AS Telefono_Proveedor
    FROM Productos p
    LEFT JOIN Proveedores pr ON p.ID_Proveedor = pr.ID_Proveedor
    WHERE p.ID_Producto = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar producto' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(results[0]);
  });
});

// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'CALL sp_EliminarProducto(?)';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto', detalle: err.sqlMessage });
    }
    res.json({ message: 'Producto eliminado exitosamente' });
  });
});

// Endpoint para actualizar datos de producto
app.put('/productos/:id', (req, res) => {
  const productoId = req.params.id;
  const { Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor } = req.body;
  const sql = 'CALL sp_ActualizarProducto(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [productoId, Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor], (err, result) => {
    if (err) {
      console.error('Error al actualizar producto:', err);
      return res.status(500).json({ error: 'Error al actualizar producto', detalle: err.sqlMessage });
    }
    res.json({ message: 'Producto actualizado exitosamente' });
  });
});

// Endpoint para registrar un proveedor
app.post('/proveedores', (req, res) => {
  const { Nombre, Telefono, Correo } = req.body;
  const sql = 'INSERT INTO Proveedores (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
  db.query(sql, [Nombre, Telefono, Correo], (err, result) => {
    if (err) {
      console.error('Error al insertar proveedor:', err);
      return res.status(500).json({ error: 'Error al registrar proveedor' });
    }
    res.status(201).json({ message: 'Proveedor registrado', id: result.insertId });
  });
});

// Endpoint para obtener todos los proveedores
app.get('/proveedores', (req, res) => {
  db.query('SELECT ID_Proveedor, Nombre, Telefono, Correo FROM Proveedores', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener proveedores' });
    res.json(results);
  });
});

// Endpoint para buscar proveedor por ID
app.get('/proveedores/buscar/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT ID_Proveedor, Nombre, Telefono, Correo FROM Proveedores WHERE ID_Proveedor = ?';
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar proveedor' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(results[0]);
  });
});

// Endpoint para buscar proveedor por ID usando Stored Procedure
app.get('/proveedores/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'CALL sp_BuscarProveedorPorID(?)';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al buscar proveedor:', err);
      return res.status(500).json({ error: 'Error al buscar proveedor' });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }
    res.json(results[0][0]);
  });
});

// Endpoint para eliminar un proveedor
app.delete('/proveedores/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Proveedores WHERE ID_Proveedor = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar proveedor:', err);
      return res.status(500).json({ error: 'Error al eliminar proveedor', detalle: err.sqlMessage });
    }
    res.json({ message: 'Proveedor eliminado', affectedRows: result.affectedRows });
  });
});

// Endpoint para registrar una venta usando Stored Procedure
app.post('/ventas', (req, res) => {
  const { ID_Cliente, Total } = req.body;
  const sql = 'CALL sp_CrearVenta(?, ?)';
  db.query(sql, [ID_Cliente, Total], (err, result) => {
    if (err) {
      console.error('Error al insertar venta:', err);
      return res.status(500).json({ error: 'Error al registrar venta', detalle: err.sqlMessage });
    }
    // El Stored Procedure devuelve el ID y mensaje
    const resultado = result[0][0];
    res.status(201).json({ 
      message: resultado.Mensaje, 
      id: resultado.ID_Venta 
    });
  });
});

// Endpoint para obtener todas las ventas con JOIN a clientes
app.get('/ventas', (req, res) => {
  const sql = `
    SELECT 
      v.ID_Venta, 
      v.Fecha, 
      v.Total, 
      v.ID_Cliente,
      c.Nombre AS Nombre_Cliente,
      c.Telefono AS Telefono_Cliente,
      c.Correo AS Correo_Cliente
    FROM Ventas v
    LEFT JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente
    ORDER BY v.Fecha DESC
  `;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ventas' });
    res.json(results);
  });
});

// Endpoint para buscar venta por ID con JOIN
app.get('/ventas/buscar/:id', (req, res) => {
  const id = req.params.id;
  const sql = `
    SELECT 
      v.ID_Venta, 
      v.Fecha, 
      v.Total, 
      v.ID_Cliente,
      c.Nombre AS Nombre_Cliente,
      c.Telefono AS Telefono_Cliente,
      c.Correo AS Correo_Cliente
    FROM Ventas v
    LEFT JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente
    WHERE v.ID_Venta = ?
  `;
  db.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al buscar venta' });
    if (results.length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(results[0]);
  });
});

// Endpoint para buscar venta por ID usando Stored Procedure
app.get('/ventas/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'CALL sp_BuscarVentaPorID(?)';
  db.query(sql, [id], (err, results) => {
    if (err) {
      console.error('Error al buscar venta:', err);
      return res.status(500).json({ error: 'Error al buscar venta' });
    }
    if (results[0].length === 0) {
      return res.status(404).json({ error: 'Venta no encontrada' });
    }
    res.json(results[0][0]);
  });
});

// Endpoint para actualizar datos de venta
app.put('/ventas/:id', (req, res) => {
  const ventaId = req.params.id;
  const { ID_Cliente, Fecha, Total } = req.body;
  const sql = 'CALL sp_ActualizarVenta(?, ?, ?, ?)';
  db.query(sql, [ventaId, ID_Cliente, Fecha, Total], (err, result) => {
    if (err) {
      console.error('Error al actualizar venta:', err);
      return res.status(500).json({ error: 'Error al actualizar venta', detalle: err.sqlMessage });
    }
    res.json({ message: 'Venta actualizada exitosamente' });
  });
});

// Endpoint para eliminar una venta
app.delete('/ventas/:id', (req, res) => {
  const id = req.params.id;
  const sql = 'CALL sp_EliminarVenta(?)';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar venta:', err);
      return res.status(500).json({ error: 'Error al eliminar venta', detalle: err.sqlMessage });
    }
    res.json({ message: 'Venta eliminada exitosamente' });
  });
});

// Endpoint para obtener ventas de un cliente específico
app.get('/ventas/cliente/:id', (req, res) => {
  const clienteId = req.params.id;
  db.query('SELECT ID_Venta, Fecha, Total FROM Ventas WHERE ID_Cliente = ? ORDER BY Fecha DESC', [clienteId], (err, results) => {
    if (err) {
      console.error('Error al obtener ventas del cliente:', err);
      return res.status(500).json({ error: 'Error al obtener ventas del cliente' });
    }
    res.json(results);
  });
});

// Endpoint para registrar un detalle de venta usando Stored Procedure
app.post('/detalle_venta', (req, res) => {
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
  const subtotal = cantidad * precio_unitario;
  const sql = 'CALL sp_AgregarDetalleVenta(?, ?, ?, ?)';
  db.query(sql, [id_venta, id_producto, cantidad, subtotal], (err, result) => {
    if (err) {
      console.error('Error al insertar detalle de venta:', err);
      return res.status(500).json({ error: 'Error al registrar detalle de venta' });
    }
    // El Stored Procedure devuelve el ID y mensaje
    const resultado = result[0][0];
    res.status(201).json({ 
      message: resultado.Mensaje, 
      id: resultado.ID_Detalle_Venta 
    });
  });
});

// Endpoint para obtener el resumen general
app.get('/api/resumen', (req, res) => {
  const resumen = {};
  // Ventas de hoy (mostrar todas las ventas por ahora)
  db.query("SELECT IFNULL(SUM(Total),0) AS ventasHoy FROM Ventas", (err, result1) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ventas de hoy' });
    resumen.ventasHoy = result1[0].ventasHoy;
    // Ventas del mes (mostrar todas las ventas por ahora)
    db.query("SELECT IFNULL(SUM(Total),0) AS ventasMes FROM Ventas", (err, result2) => {
      if (err) return res.status(500).json({ error: 'Error al obtener ventas del mes' });
      resumen.ventasMes = result2[0].ventasMes;
      // Total clientes
      db.query("SELECT COUNT(*) AS totalClientes FROM Clientes", (err, result3) => {
        if (err) return res.status(500).json({ error: 'Error al obtener total de clientes' });
        resumen.totalClientes = result3[0].totalClientes;
        // Total productos
        db.query("SELECT COUNT(*) AS totalProductos FROM Productos", (err, result4) => {
          if (err) return res.status(500).json({ error: 'Error al obtener total de productos' });
          resumen.totalProductos = result4[0].totalProductos;
          res.json(resumen);
        });
      });
    });
  });
});

// Endpoint para obtener las últimas ventas
app.get('/api/ventas/ultimas', (req, res) => {
  const sql = `SELECT v.ID_Venta, c.Nombre AS cliente, v.Fecha, v.Total FROM Ventas v JOIN Clientes c ON v.ID_Cliente = c.ID_Cliente ORDER BY v.Fecha DESC, v.ID_Venta DESC LIMIT 4`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener últimas ventas' });
    res.json(results);
  });
});

// ========================================
// ENDPOINTS PARA PROCESOS
// ========================================

// Endpoint para obtener todos los procesos de MySQL
app.get('/procesos', (req, res) => {
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error('Error al obtener procesos de MySQL:', err);
      return res.status(500).json({ error: 'Error al obtener procesos de MySQL' });
    }
    
    // Formatear los resultados para mejor presentación
    const procesosFormateados = results.map(proceso => ({
      id: proceso.Id,
      usuario: proceso.User,
      host: proceso.Host,
      baseDatos: proceso.db || 'N/A',
      comando: proceso.Command,
      tiempo: proceso.Time,
      estado: proceso.State || 'N/A',
      info: proceso.Info || 'N/A'
    }));
    
    res.json({
      total: results.length,
      procesos: procesosFormateados,
      timestamp: new Date().toISOString()
    });
  });
});

// Endpoint para obtener estadísticas de procesos de MySQL (DEBE IR ANTES QUE /:id)
app.get('/procesos/estadisticas', (req, res) => {
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error('Error al obtener estadísticas de procesos de MySQL:', err);
      return res.status(500).json({ error: 'Error al obtener estadísticas de procesos de MySQL' });
    }
    
    // Procesar resultados para estadísticas útiles
    const estadisticas = {
      total: results.length,
      porComando: {},
      porUsuario: {},
      porEstado: {},
      procesosActivos: 0,
      procesosInactivos: 0,
      timestamp: new Date().toISOString()
    };
    
    results.forEach(proceso => {
      // Contar por comando
      estadisticas.porComando[proceso.Command] = (estadisticas.porComando[proceso.Command] || 0) + 1;
      
      // Contar por usuario
      estadisticas.porUsuario[proceso.User] = (estadisticas.porUsuario[proceso.User] || 0) + 1;
      
      // Contar por estado
      const estado = proceso.State || 'Sin estado';
      estadisticas.porEstado[estado] = (estadisticas.porEstado[estado] || 0) + 1;
      
      // Contar procesos activos vs inactivos
      if (proceso.Command === 'Sleep' || proceso.Command === 'Daemon') {
        estadisticas.procesosInactivos++;
      } else {
        estadisticas.procesosActivos++;
      }
    });
    
    res.json(estadisticas);
  });
});

// Endpoint para buscar procesos por estado (filtrado por comando de MySQL)
app.get('/procesos/estado/:estado', (req, res) => {
  const estado = req.params.estado;
  
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error('Error al obtener procesos de MySQL:', err);
      return res.status(500).json({ error: 'Error al obtener procesos de MySQL' });
    }
    
    // Filtrar por comando (estado en MySQL)
    const procesosFiltrados = results.filter(proceso => 
      proceso.Command.toLowerCase().includes(estado.toLowerCase()) ||
      (proceso.State && proceso.State.toLowerCase().includes(estado.toLowerCase()))
    );
    
    const procesosFormateados = procesosFiltrados.map(proceso => ({
      id: proceso.Id,
      usuario: proceso.User,
      host: proceso.Host,
      baseDatos: proceso.db || 'N/A',
      comando: proceso.Command,
      tiempo: proceso.Time,
      estado: proceso.State || 'N/A',
      info: proceso.Info || 'N/A'
    }));
    
    res.json({
      total: procesosFormateados.length,
      procesos: procesosFormateados,
      filtro: estado
    });
  });
});

// Endpoint para buscar procesos por prioridad (filtrado por tiempo de ejecución)
app.get('/procesos/prioridad/:prioridad', (req, res) => {
  const prioridad = req.params.prioridad;
  
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error('Error al obtener procesos de MySQL:', err);
      return res.status(500).json({ error: 'Error al obtener procesos de MySQL' });
    }
    
    // Filtrar por tiempo de ejecución (simulación de prioridad)
    const procesosFiltrados = results.filter(proceso => {
      const tiempo = proceso.Time;
      if (prioridad === 'alta' && tiempo > 100) return true;
      if (prioridad === 'media' && tiempo > 10 && tiempo <= 100) return true;
      if (prioridad === 'baja' && tiempo <= 10) return true;
      return false;
    });
    
    const procesosFormateados = procesosFiltrados.map(proceso => ({
      id: proceso.Id,
      usuario: proceso.User,
      host: proceso.Host,
      baseDatos: proceso.db || 'N/A',
      comando: proceso.Command,
      tiempo: proceso.Time,
      estado: proceso.State || 'N/A',
      info: proceso.Info || 'N/A'
    }));
    
    res.json({
      total: procesosFormateados.length,
      procesos: procesosFormateados,
      filtro: prioridad
    });
  });
});

// Endpoint para buscar procesos por responsable (filtrado por usuario de MySQL)
app.get('/procesos/responsable/:responsable', (req, res) => {
  const responsable = req.params.responsable;
  
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error('Error al obtener procesos de MySQL:', err);
      return res.status(500).json({ error: 'Error al obtener procesos de MySQL' });
    }
    
    // Filtrar por usuario (responsable en MySQL)
    const procesosFiltrados = results.filter(proceso => 
      proceso.User.toLowerCase().includes(responsable.toLowerCase()) ||
      proceso.Host.toLowerCase().includes(responsable.toLowerCase())
    );
    
    const procesosFormateados = procesosFiltrados.map(proceso => ({
      id: proceso.Id,
      usuario: proceso.User,
      host: proceso.Host,
      baseDatos: proceso.db || 'N/A',
      comando: proceso.Command,
      tiempo: proceso.Time,
      estado: proceso.State || 'N/A',
      info: proceso.Info || 'N/A'
    }));
    
    res.json({
      total: procesosFormateados.length,
      procesos: procesosFormateados,
      filtro: responsable
    });
  });
});

// Endpoint para obtener un proceso específico por ID (DEBE IR AL FINAL)
app.get('/procesos/:id', (req, res) => {
  const id = req.params.id;
  
  db.query('SHOW PROCESSLIST', (err, results) => {
    if (err) {
      console.error('Error al obtener procesos de MySQL:', err);
      return res.status(500).json({ error: 'Error al obtener procesos de MySQL' });
    }
    
    const proceso = results.find(p => p.Id == id);
    if (!proceso) {
      return res.status(404).json({ error: 'Proceso no encontrado' });
    }
    
    const procesoFormateado = {
      id: proceso.Id,
      usuario: proceso.User,
      host: proceso.Host,
      baseDatos: proceso.db || 'N/A',
      comando: proceso.Command,
      tiempo: proceso.Time,
      estado: proceso.State || 'N/A',
      info: proceso.Info || 'N/A'
    };
    
    res.json(procesoFormateado);
  });
});

// Endpoint para crear un nuevo proceso (solo informativo - no se pueden crear procesos de MySQL)
app.post('/procesos', (req, res) => {
  res.status(405).json({ 
    error: 'No se pueden crear procesos de MySQL manualmente',
    message: 'Los procesos de MySQL se crean automáticamente por el sistema',
    info: 'Usa GET /procesos para ver los procesos activos'
  });
});

// Endpoint para actualizar un proceso (solo informativo - no se pueden modificar procesos de MySQL)
app.put('/procesos/:id', (req, res) => {
  res.status(405).json({ 
    error: 'No se pueden modificar procesos de MySQL manualmente',
    message: 'Los procesos de MySQL son gestionados automáticamente por el sistema',
    info: 'Usa GET /procesos para ver los procesos activos'
  });
});

// Endpoint para eliminar un proceso (solo informativo - no se pueden eliminar procesos de MySQL)
app.delete('/procesos/:id', (req, res) => {
  res.status(405).json({ 
    error: 'No se pueden eliminar procesos de MySQL manualmente',
    message: 'Los procesos de MySQL son gestionados automáticamente por el sistema',
    info: 'Usa GET /procesos para ver los procesos activos'
  });
});

// Endpoint para obtener estadísticas usando Stored Procedure
app.get('/estadisticas', (req, res) => {
  const sql = 'CALL sp_ObtenerEstadisticas()';
  db.query(sql, (err, result) => {
    if (err) {
      console.error('Error al obtener estadísticas:', err);
      return res.status(500).json({ error: 'Error al obtener estadísticas' });
    }
    // El Stored Procedure devuelve un array con las estadísticas
    const estadisticas = result[0][0];
    res.json({
      totalClientes: estadisticas.TotalClientes,
      totalProductos: estadisticas.TotalProductos,
      totalVentas: estadisticas.TotalVentas,
      totalIngresos: estadisticas.TotalIngresos
    });
  });
});

// Endpoint para buscar clientes usando Stored Procedure
app.get('/clientes/buscar/:termino', (req, res) => {
  const termino = req.params.termino;
  const sql = 'CALL sp_BuscarClientes(?)';
  db.query(sql, [termino], (err, result) => {
    if (err) {
      console.error('Error al buscar clientes:', err);
      return res.status(500).json({ error: 'Error al buscar clientes' });
    }
    res.json(result[0]);
  });
});

// Endpoint para obtener productos por categoría usando Stored Procedure
app.get('/productos/categoria/:tipo', (req, res) => {
  const tipo = req.params.tipo;
  const sql = 'CALL sp_ProductosPorCategoria(?)';
  db.query(sql, [tipo], (err, result) => {
    if (err) {
      console.error('Error al obtener productos por categoría:', err);
      return res.status(500).json({ error: 'Error al obtener productos por categoría' });
    }
    res.json(result[0]);
  });
});

// Documentación API disponible en: http://localhost:3000/api-docs

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
  console.log(`📚 Documentación Swagger disponible en: http://localhost:${port}/api-docs`);
}); 