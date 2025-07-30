const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Configuración de la conexión a MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Preventa1',
  database: 'TiendaRopa'
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos MySQL');
});

// Endpoint para registrar un cliente
app.post('/clientes', (req, res) => {
  const { Nombre, Telefono, Correo } = req.body;
  const sql = 'INSERT INTO Clientes (Nombre, Telefono, Correo) VALUES (?, ?, ?)';
  db.query(sql, [Nombre, Telefono, Correo], (err, result) => {
    if (err) {
      console.error('Error al insertar cliente:', err);
      res.status(500).json({ error: 'Error al registrar cliente', detalle: err.sqlMessage });
      return;
    }
    res.status(201).json({ message: 'Cliente registrado', id: result.insertId });
  });
});

// Endpoint para obtener todos los clientes
app.get('/clientes', (req, res) => {
  db.query('SELECT ID_Cliente, Nombre, Telefono, Correo FROM Clientes', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener clientes' });
    res.json(results);
  });
});

// Endpoint para eliminar un cliente
app.delete('/clientes/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Clientes WHERE ID_Cliente = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar cliente:', err);
      return res.status(500).json({ error: 'Error al eliminar cliente', detalle: err.sqlMessage });
    }
    res.json({ message: 'Cliente eliminado', affectedRows: result.affectedRows });
  });
});

// Endpoint para actualizar datos de cliente
app.put('/clientes/:id', (req, res) => {
  const clienteId = req.params.id;
  const { Nombre, Telefono, Correo } = req.body;
  const sql = 'UPDATE Clientes SET Nombre = ?, Telefono = ?, Correo = ? WHERE ID_Cliente = ?';
  db.query(sql, [Nombre, Telefono, Correo, clienteId], (err, result) => {
    if (err) {
      console.error('Error al actualizar cliente:', err);
      return res.status(500).json({ error: 'Error al actualizar cliente', detalle: err.sqlMessage });
    }
    res.json({ message: 'Cliente actualizado', affectedRows: result.affectedRows });
  });
});

// Endpoint para registrar un producto
app.post('/productos', (req, res) => {
  const { Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor } = req.body;
  const sql = 'INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  db.query(sql, [Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor], (err, result) => {
    if (err) {
      console.error('Error al insertar producto:', err);
      return res.status(500).json({ error: 'Error al registrar producto', detalle: err.sqlMessage });
    }
    res.status(201).json({ message: 'Producto registrado', id: result.insertId });
  });
});

// Endpoint para obtener todos los productos
app.get('/productos', (req, res) => {
  db.query('SELECT ID_Producto, Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor FROM Productos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener productos' });
    res.json(results);
  });
});

// Endpoint para eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM Productos WHERE ID_Producto = ?', [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar producto:', err);
      return res.status(500).json({ error: 'Error al eliminar producto', detalle: err.sqlMessage });
    }
    res.json({ message: 'Producto eliminado', affectedRows: result.affectedRows });
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

// Endpoint para registrar una venta
app.post('/ventas', (req, res) => {
  const { ID_Cliente, Fecha, Total } = req.body;
  const sql = 'INSERT INTO Ventas (ID_Cliente, Fecha, Total) VALUES (?, ?, ?)';
  db.query(sql, [ID_Cliente, Fecha, Total], (err, result) => {
    if (err) {
      console.error('Error al insertar venta:', err);
      return res.status(500).json({ error: 'Error al registrar venta', detalle: err.sqlMessage });
    }
    res.status(201).json({ message: 'Venta registrada', id: result.insertId });
  });
});

// Endpoint para obtener todas las ventas
app.get('/ventas', (req, res) => {
  db.query('SELECT ID_Venta, Fecha, Total, ID_Cliente FROM Ventas', (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ventas' });
    res.json(results);
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

// Endpoint para registrar un detalle de venta
app.post('/detalle_venta', (req, res) => {
  const { id_venta, id_producto, cantidad, precio_unitario } = req.body;
  const sql = 'INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)';
  db.query(sql, [id_venta, id_producto, cantidad, precio_unitario], (err, result) => {
    if (err) {
      console.error('Error al insertar detalle de venta:', err);
      return res.status(500).json({ error: 'Error al registrar detalle de venta' });
    }
    res.status(201).json({ message: 'Detalle de venta registrado', id: result.insertId });
  });
});

// Endpoint para obtener el resumen general
app.get('/resumen', (req, res) => {
  const resumen = {};
  // Ventas de hoy
  db.query("SELECT IFNULL(SUM(total),0) AS ventasHoy FROM ventas WHERE DATE(fecha) = CURDATE()", (err, result1) => {
    if (err) return res.status(500).json({ error: 'Error al obtener ventas de hoy' });
    resumen.ventasHoy = result1[0].ventasHoy;
    // Ventas del mes
    db.query("SELECT IFNULL(SUM(total),0) AS ventasMes FROM ventas WHERE fecha >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)", (err, result2) => {
      if (err) return res.status(500).json({ error: 'Error al obtener ventas del mes' });
      resumen.ventasMes = result2[0].ventasMes;
      // Total clientes
      db.query("SELECT COUNT(*) AS totalClientes FROM clientes", (err, result3) => {
        if (err) return res.status(500).json({ error: 'Error al obtener total de clientes' });
        resumen.totalClientes = result3[0].totalClientes;
        // Total productos
        db.query("SELECT COUNT(*) AS totalProductos FROM productos", (err, result4) => {
          if (err) return res.status(500).json({ error: 'Error al obtener total de productos' });
          resumen.totalProductos = result4[0].totalProductos;
          res.json(resumen);
        });
      });
    });
  });
});

// Endpoint para obtener las últimas ventas
app.get('/ventas/ultimas', (req, res) => {
  const sql = `SELECT v.id, c.nombre AS cliente, v.fecha, v.total FROM ventas v JOIN clientes c ON v.id_cliente = c.id ORDER BY v.fecha DESC, v.id DESC LIMIT 4`;
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener últimas ventas' });
    res.json(results);
  });
});

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
}); 