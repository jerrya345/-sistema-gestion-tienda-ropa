const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Preventa1',
  database: 'TiendaRopa',
  port: 3306
});

console.log('🔧 CREANDO STORED PROCEDURES');
console.log('=' .repeat(40));

// Función para crear un Stored Procedure
async function crearStoredProcedure(nombre, sql) {
  return new Promise((resolve, reject) => {
    console.log(`\n🔧 Creando: ${nombre}`);
    
    db.query(sql, (err, result) => {
      if (err) {
        if (err.message.includes('already exists')) {
          console.log(`✅ ${nombre} ya existe`);
          resolve();
        } else {
          console.error(`❌ Error creando ${nombre}:`, err.message);
          reject(err);
        }
      } else {
        console.log(`✅ ${nombre} creado exitosamente`);
        resolve(result);
      }
    });
  });
}

// Stored Procedures
const storedProcedures = [
    // Procedimientos existentes
    {
        name: 'sp_AgregarCliente',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_AgregarCliente(
            IN p_Nombre VARCHAR(100),
            IN p_Telefono VARCHAR(20),
            IN p_Correo VARCHAR(100)
        )
        BEGIN
            INSERT INTO Clientes (Nombre, Telefono, Correo)
            VALUES (p_Nombre, p_Telefono, p_Correo);

            SELECT LAST_INSERT_ID() as ID_Cliente, 'Cliente agregado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_AgregarProducto',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_AgregarProducto(
            IN p_Nombre VARCHAR(100),
            IN p_Descripcion TEXT,
            IN p_Talla VARCHAR(10),
            IN p_Color VARCHAR(50),
            IN p_Precio DECIMAL(10,2),
            IN p_Marca VARCHAR(50),
            IN p_Tipo_Prenda VARCHAR(50),
            IN p_Temporada VARCHAR(20),
            IN p_Stock INT,
            IN p_ID_Proveedor INT
        )
        BEGIN
            INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor)
            VALUES (p_Nombre, p_Descripcion, p_Talla, p_Color, p_Precio, p_Marca, p_Tipo_Prenda, p_Temporada, p_Stock, p_ID_Proveedor);

            SELECT LAST_INSERT_ID() as ID_Producto, 'Producto agregado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_CrearVenta',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_CrearVenta(
            IN p_ID_Cliente INT,
            IN p_Total DECIMAL(10,2)
        )
        BEGIN
            INSERT INTO Ventas (ID_Cliente, Fecha, Total)
            VALUES (p_ID_Cliente, CURDATE(), p_Total);

            SELECT LAST_INSERT_ID() as ID_Venta, 'Venta creada exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_AgregarDetalleVenta',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_AgregarDetalleVenta(
            IN p_ID_Venta INT,
            IN p_ID_Producto INT,
            IN p_Cantidad INT,
            IN p_Subtotal DECIMAL(10,2)
        )
        BEGIN
            INSERT INTO Detalle_Venta (ID_Venta, ID_Producto, Cantidad, Subtotal)
            VALUES (p_ID_Venta, p_ID_Producto, p_Cantidad, p_Subtotal);

            -- Actualizar stock del producto
            UPDATE Productos SET Stock = Stock - p_Cantidad WHERE ID_Producto = p_ID_Producto;

            SELECT 'Detalle de venta agregado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_ObtenerEstadisticas',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_ObtenerEstadisticas()
        BEGIN
            SELECT 
                (SELECT COUNT(*) FROM Clientes) as TotalClientes,
                (SELECT COUNT(*) FROM Productos) as TotalProductos,
                (SELECT COUNT(*) FROM Ventas) as TotalVentas,
                (SELECT COALESCE(SUM(Total), 0) FROM Ventas) as TotalIngresos;
        END`
    },
    {
        name: 'sp_BuscarClientes',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_BuscarClientes(
            IN p_Busqueda VARCHAR(100)
        )
        BEGIN
            SELECT * FROM Clientes 
            WHERE Nombre LIKE CONCAT('%', p_Busqueda, '%')
            OR Telefono LIKE CONCAT('%', p_Busqueda, '%')
            OR Correo LIKE CONCAT('%', p_Busqueda, '%')
            ORDER BY Nombre;
        END`
    },
    {
        name: 'sp_ProductosPorCategoria',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_ProductosPorCategoria(
            IN p_Tipo_Prenda VARCHAR(50)
        )
        BEGIN
            SELECT * FROM Productos 
            WHERE Tipo_Prenda = p_Tipo_Prenda
            ORDER BY Nombre;
        END`
    },
    // NUEVOS PROCEDIMIENTOS PARA ACTUALIZAR
    {
        name: 'sp_ActualizarCliente',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_ActualizarCliente(
            IN p_ID_Cliente INT,
            IN p_Nombre VARCHAR(100),
            IN p_Telefono VARCHAR(20),
            IN p_Correo VARCHAR(100)
        )
        BEGIN
            UPDATE Clientes 
            SET Nombre = p_Nombre, 
                Telefono = p_Telefono, 
                Correo = p_Correo
            WHERE ID_Cliente = p_ID_Cliente;
            
            SELECT 'Cliente actualizado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_ActualizarProducto',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_ActualizarProducto(
            IN p_ID_Producto INT,
            IN p_Nombre VARCHAR(100),
            IN p_Descripcion TEXT,
            IN p_Talla VARCHAR(10),
            IN p_Color VARCHAR(50),
            IN p_Precio DECIMAL(10,2),
            IN p_Marca VARCHAR(50),
            IN p_Tipo_Prenda VARCHAR(50),
            IN p_Temporada VARCHAR(20),
            IN p_Stock INT,
            IN p_ID_Proveedor INT
        )
        BEGIN
            UPDATE Productos 
            SET Nombre = p_Nombre,
                Descripcion = p_Descripcion,
                Talla = p_Talla,
                Color = p_Color,
                Precio = p_Precio,
                Marca = p_Marca,
                Tipo_Prenda = p_Tipo_Prenda,
                Temporada = p_Temporada,
                Stock = p_Stock,
                ID_Proveedor = p_ID_Proveedor
            WHERE ID_Producto = p_ID_Producto;
            
            SELECT 'Producto actualizado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_ActualizarVenta',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_ActualizarVenta(
            IN p_ID_Venta INT,
            IN p_ID_Cliente INT,
            IN p_Fecha DATE,
            IN p_Total DECIMAL(10,2)
        )
        BEGIN
            UPDATE Ventas 
            SET ID_Cliente = p_ID_Cliente,
                Fecha = p_Fecha,
                Total = p_Total
            WHERE ID_Venta = p_ID_Venta;
            
            SELECT 'Venta actualizada exitosamente' as Mensaje;
        END`
    },
    // NUEVOS PROCEDIMIENTOS PARA ELIMINAR
    {
        name: 'sp_EliminarCliente',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_EliminarCliente(
            IN p_ID_Cliente INT
        )
        BEGIN
            DELETE FROM Clientes WHERE ID_Cliente = p_ID_Cliente;
            SELECT 'Cliente eliminado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_EliminarProducto',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_EliminarProducto(
            IN p_ID_Producto INT
        )
        BEGIN
            DELETE FROM Productos WHERE ID_Producto = p_ID_Producto;
            SELECT 'Producto eliminado exitosamente' as Mensaje;
        END`
    },
    {
        name: 'sp_EliminarVenta',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_EliminarVenta(
            IN p_ID_Venta INT
        )
        BEGIN
            -- Primero eliminar detalles de venta
            DELETE FROM Detalle_Venta WHERE ID_Venta = p_ID_Venta;
            -- Luego eliminar la venta
            DELETE FROM Ventas WHERE ID_Venta = p_ID_Venta;
            SELECT 'Venta eliminada exitosamente' as Mensaje;
        END`
    },
    // NUEVOS PROCEDIMIENTOS PARA BUSCAR POR ID
    {
        name: 'sp_BuscarClientePorID',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_BuscarClientePorID(
            IN p_ID_Cliente INT
        )
        BEGIN
            SELECT ID_Cliente, Nombre, Telefono, Correo 
            FROM Clientes 
            WHERE ID_Cliente = p_ID_Cliente;
        END`
    },
    {
        name: 'sp_BuscarProveedorPorID',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_BuscarProveedorPorID(
            IN p_ID_Proveedor INT
        )
        BEGIN
            SELECT ID_Proveedor, Nombre, Telefono, Correo 
            FROM Proveedores 
            WHERE ID_Proveedor = p_ID_Proveedor;
        END`
    },
    {
        name: 'sp_BuscarVentaPorID',
        sql: `CREATE PROCEDURE IF NOT EXISTS sp_BuscarVentaPorID(
            IN p_ID_Venta INT
        )
        BEGIN
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
            WHERE v.ID_Venta = p_ID_Venta;
        END`
    }
];

// Función principal
async function crearTodosLosProcedimientos() {
  try {
    for (const sp of storedProcedures) {
      await crearStoredProcedure(sp.name, sp.sql);
    }
    
    console.log('\n🎉 ¡TODOS LOS STORED PROCEDURES CREADOS!');
    console.log('=' .repeat(40));
    
    // Verificar que se crearon
    console.log('\n🔍 Verificando Stored Procedures creados...');
    await new Promise((resolve, reject) => {
      db.query("SELECT ROUTINE_NAME FROM INFORMATION_SCHEMA.ROUTINES WHERE ROUTINE_SCHEMA = 'TiendaRopa' AND ROUTINE_TYPE = 'PROCEDURE'", (err, results) => {
        if (err) {
          reject(err);
          return;
        }
        
        console.log('📋 Stored Procedures encontrados:');
        results.forEach(row => {
          console.log(`   ✅ ${row.ROUTINE_NAME}`);
        });
        
        resolve(results);
      });
    });
    
  } catch (error) {
    console.error('❌ Error creando Stored Procedures:', error.message);
  } finally {
    db.end();
  }
}

// Ejecutar
crearTodosLosProcedimientos(); 