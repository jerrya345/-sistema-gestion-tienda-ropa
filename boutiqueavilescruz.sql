-- -----------------------------------------------------
-- Script para crear y poblar la Base de Datos "TiendaRopa"
-- Versión modificada con "Ropa de temporada"
-- -----------------------------------------------------

-- 1. CREACIÓN DE LA BASE DE DATOS Y TABLAS
-- DROP DATABASE IF EXISTS TiendaRopa;  -- COMENTADO PARA NO BORRAR DATOS
CREATE DATABASE IF NOT EXISTS TiendaRopa;
USE TiendaRopa;

-- Tabla de Clientes (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Clientes (
    ID_Cliente INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Correo VARCHAR(100) UNIQUE
);

-- Tabla de Proveedores (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Proveedores (
    ID_Proveedor INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Correo VARCHAR(100)
);

-- Tabla de Productos (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Productos (
    ID_Producto INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Descripcion VARCHAR(255), -- Agregado
    Talla VARCHAR(10),
    Color VARCHAR(50),
    Precio DECIMAL(10, 2) NOT NULL,
    Marca VARCHAR(50),
    Tipo_Prenda VARCHAR(50),
    Temporada VARCHAR(50),
    Stock INT, -- Agregado
    ID_Proveedor INT,
    FOREIGN KEY (ID_Proveedor) REFERENCES Proveedores(ID_Proveedor) ON DELETE CASCADE
);

-- Tabla de Ropa de temporada (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Ropa_de_temporada (
    ID_Temporada INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(255),
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    Descuento INT -- Porcentaje de descuento
);

-- Tabla de Ventas (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Ventas (
    ID_Venta INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    ID_Cliente INT,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente) ON DELETE CASCADE
);

-- Tabla Detalle de Venta (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Detalle_Venta (
    ID_Detalle_Venta INT PRIMARY KEY AUTO_INCREMENT,
    ID_Venta INT,
    ID_Producto INT,
    Cantidad INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ID_Venta) REFERENCES Ventas(ID_Venta) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto) ON DELETE CASCADE
);

-- Tabla Producto_Temporada (SOLO SI NO EXISTE)
CREATE TABLE IF NOT EXISTS Producto_Temporada (
    ID_Producto_Temporada INT PRIMARY KEY AUTO_INCREMENT,
    ID_Producto INT,
    ID_Temporada INT,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto) ON DELETE CASCADE,
    FOREIGN KEY (ID_Temporada) REFERENCES Ropa_de_temporada(ID_Temporada) ON DELETE CASCADE
);

-- Tabla de Procesos (ELIMINADA - Ya no necesaria, usamos SHOW PROCESSLIST)


-- -----------------------------------------------------
-- 2. INSERCIÓN DE DATOS DE PRUEBA (SOLO SI NO EXISTEN)
-- -----------------------------------------------------

-- Poblando la tabla de Clientes (SOLO SI ESTÁ VACÍA)
INSERT IGNORE INTO Clientes (ID_Cliente, Nombre, Telefono, Correo) VALUES
(1, 'Ana Pérez', '999-111-2233', 'ana.perez@mail.com'),
(2, 'Luis Gómez', '999-222-3344', 'l.gomez@mail.com'),
(3, 'María Torres', '999-333-4455', 'maria.torres@mail.com'),
(4, 'Juan Martínez', '999-444-5566', 'j.martinez@mail.com'),
(5, 'Carlos Solís', '999-555-6677', 'c.solis@mail.com'),
(6, 'Laura Fernández', '999-666-7788', 'laura.f@mail.com'),
(7, 'Miguel Ángel Chan', '999-777-8899', 'mchan@mail.com'),
(8, 'Sofía Castillo', '999-888-9900', 'sofia.c@mail.com'),
(9, 'Javier Herrera', '999-999-0011', 'jherrera@mail.com'),
(10, 'Valeria Pech', '999-000-1122', 'vale.pech@mail.com'),
(11, 'Ricardo Morales', '999-112-2334', 'ricky.m@mail.com'),
(12, 'Daniela Cruz', '999-223-3445', 'dani.cruz@mail.com'),
(13, 'Fernando Rojas', '999-334-4556', 'fer.rojas@mail.com'),
(14, 'Gabriela Santos', '999-445-5667', 'gaby.santos@mail.com'),
(15, 'Andrés Canul', '999-556-6778', 'a.canul@mail.com');

-- Poblando la tabla de Proveedores (SOLO SI ESTÁ VACÍA)
INSERT IGNORE INTO Proveedores (ID_Proveedor, Nombre, Telefono, Correo) VALUES
(1, 'Moda Latina', '998-111-2222', 'ventas@modalatina.com'),
(2, 'Fashion Factory', '998-222-3333', 'contacto@fashionfac.com'),
(3, 'Textiles Romero', '998-333-4444', 'romero@textiles.com'),
(4, 'Prendas Elite', '998-444-5555', 'info@prendaselite.com'),
(5, 'Ropa Casual S.A.', '998-555-6666', 'ventas@ropacasualsa.com'),
(6, 'Deportivos del Sureste', '998-666-7777', 'contacto@deportivoss.com'),
(7, 'Elegancia Total', '998-777-8888', 'elegancia@total.com'),
(8, 'Importadora Tex-Mex', '998-888-9999', 'texmex@import.com'),
(9, 'Confecciones del Caribe', '998-999-0000', 'caribe@confecciones.com'),
(10, 'Proveedores de Ropa MX', '998-987-6543', 'ventas@proveedoresmx.com'),
(11, 'Kids Fashion', '998-123-1234', 'kids@fashion.com'),
(12, 'Urban Style', '998-234-2345', 'urban@style.com'),
(13, 'Solo Piel', '998-345-3456', 'contacto@solopiel.com'),
(14, 'Algodón Premium', '998-456-4567', 'premium@algodon.com'),
(15, 'Linos de Yucatán', '998-567-5678', 'ventas@linosyucatan.com');

-- Poblando la tabla de Productos (SOLO SI ESTÁ VACÍA)
INSERT IGNORE INTO Productos (ID_Producto, Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor) VALUES
(1, 'Blusa Floral', 'Blusa de algodón con estampado floral', 'M', 'Rosa', 280.00, 'Zara', 'Blusa', 'Verano', 10, 1),
(2, 'Pantalón Skinny', 'Pantalón de mezclilla con cintura alta', '32', 'Azul', 550.00, 'Levis', 'Pantalón', 'Invierno', 5, 2),
(3, 'Camisa Formal', 'Camisa de lino con cuello y mangas', 'L', 'Blanco', 320.00, 'Hugo Boss', 'Camisa', 'Todo año', 8, 7),
(4, 'Vestido Largo', 'Vestido de tul con tirantes y detalle de encaje', 'S', 'Negro', 790.00, 'Mango', 'Vestido', 'Primavera', 3, 4),
(5, 'Chamarra de Mezclilla', 'Chamarra de cuero con bolsillos y cinturón', 'M', 'Azul Claro', 850.00, 'Wrangler', 'Chamarra', 'Invierno', 12, 2),
(6, 'Playera Deportiva', 'Playera de algodón con cuello y manga corta', 'L', 'Rojo', 250.00, 'Nike', 'Playera', 'Todo año', 20, 6),
(7, 'Falda Plisada', 'Falda de tul con plisados y detalle de encaje', 'S', 'Beige', 420.00, 'H&M', 'Falda', 'Primavera', 15, 5),
(8, 'Sudadera con Capucha', 'Sudadera de piel con capucha y bolsillos', 'XL', 'Gris', 600.00, 'Adidas', 'Sudadera', 'Invierno', 10, 6),
(9, 'Guayabera de Lino', 'Camisa de lino con cuello y mangas', 'M', 'Blanco', 950.00, 'Artesanal', 'Camisa', 'Verano', 7, 15),
(10, 'Blusa de Vestir', 'Blusa de seda con cuello y mangas', 'L', 'Negro', 480.00, 'Versace', 'Blusa', 'Todo año', 5, 1),
(11, 'Pantalón Slim', 'Pantalón de mezclilla con cintura baja', '34', 'Azul Marino', 620.00, 'Levis', 'Pantalón', 'Invierno', 6, 2),
(12, 'Camisa de Lino', 'Camisa de lino con cuello y mangas', 'M', 'Blanco', 350.00, 'Hugo Boss', 'Camisa', 'Todo año', 10, 7),
(13, 'Vestido de Fiesta', 'Vestido de tul con tirantes y detalle de encaje', 'S', 'Dorado', 850.00, 'Mango', 'Vestido', 'Primavera', 2, 4),
(14, 'Chamarra de Cuero', 'Chamarra de cuero con bolsillos y cinturón', 'L', 'Negro', 980.00, 'Wrangler', 'Chamarra', 'Invierno', 8, 2),
(15, 'Playera Deportiva', 'Playera de algodón con cuello y manga corta', 'XL', 'Rojo', 280.00, 'Nike', 'Playera', 'Todo año', 15, 6);

-- Datos de Procesos (ELIMINADOS - Ya no necesarios, usamos SHOW PROCESSLIST)

-- -----------------------------------------------------
-- 3. CREACIÓN DE USUARIOS (SOLO SI NO EXISTEN)
-- -----------------------------------------------------

-- Crear el usuario tienda_user (SOLO SI NO EXISTE)
CREATE USER IF NOT EXISTS 'tienda_user'@'%' IDENTIFIED BY 'Preventa1';

-- Otorgar privilegios al usuario
GRANT ALL PRIVILEGES ON TiendaRopa.* TO 'tienda_user'@'%';
GRANT ALL PRIVILEGES ON startrekmariogerardojosecanche.* TO 'tienda_user'@'%';

-- Aplicar los cambios
FLUSH PRIVILEGES;

-- -----------------------------------------------------
-- 4. VERIFICACIÓN FINAL
-- -----------------------------------------------------

-- Verificar que el usuario se creó correctamente
SELECT User, Host FROM mysql.user WHERE User = 'tienda_user';

-- Verificar las tablas creadas
SHOW TABLES;

-- Verificar que los datos se insertaron correctamente
SELECT COUNT(*) as total_clientes FROM Clientes;
SELECT COUNT(*) as total_proveedores FROM Proveedores;
SELECT COUNT(*) as total_productos FROM Productos;

-- Mensaje de confirmación
SELECT 'Base de datos TiendaRopa configurada correctamente - NO SE BORRAN DATOS EXISTENTES' as mensaje;

-- -----------------------------------------------------
-- 5. STORED PROCEDURES PARA OPERACIONES DE LA PÁGINA WEB
-- -----------------------------------------------------

-- Procedimiento para agregar clientes
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_AgregarCliente(
    IN p_Nombre VARCHAR(100),
    IN p_Telefono VARCHAR(20),
    IN p_Correo VARCHAR(100)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    INSERT INTO Clientes (Nombre, Telefono, Correo) 
    VALUES (p_Nombre, p_Telefono, p_Correo);
    
    SELECT LAST_INSERT_ID() as ID_Cliente, 'Cliente agregado exitosamente' as Mensaje;
    
    COMMIT;
END //
DELIMITER ;

-- Procedimiento para agregar productos
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_AgregarProducto(
    IN p_Nombre VARCHAR(100),
    IN p_Descripcion VARCHAR(255),
    IN p_Talla VARCHAR(10),
    IN p_Color VARCHAR(50),
    IN p_Precio DECIMAL(10,2),
    IN p_Marca VARCHAR(50),
    IN p_Tipo_Prenda VARCHAR(50),
    IN p_Temporada VARCHAR(50),
    IN p_Stock INT,
    IN p_ID_Proveedor INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    INSERT INTO Productos (Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor) 
    VALUES (p_Nombre, p_Descripcion, p_Talla, p_Color, p_Precio, p_Marca, p_Tipo_Prenda, p_Temporada, p_Stock, p_ID_Proveedor);
    
    SELECT LAST_INSERT_ID() as ID_Producto, 'Producto agregado exitosamente' as Mensaje;
    
    COMMIT;
END //
DELIMITER ;

-- Procedimiento para crear una venta completa
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_CrearVenta(
    IN p_ID_Cliente INT,
    IN p_Total DECIMAL(10,2)
)
BEGIN
    DECLARE v_ID_Venta INT;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    INSERT INTO Ventas (Fecha, Total, ID_Cliente) 
    VALUES (CURDATE(), p_Total, p_ID_Cliente);
    
    SET v_ID_Venta = LAST_INSERT_ID();
    
    SELECT v_ID_Venta as ID_Venta, 'Venta creada exitosamente' as Mensaje;
    
    COMMIT;
END //
DELIMITER ;

-- Procedimiento para agregar detalle de venta
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_AgregarDetalleVenta(
    IN p_ID_Venta INT,
    IN p_ID_Producto INT,
    IN p_Cantidad INT,
    IN p_Subtotal DECIMAL(10,2)
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;
        RESIGNAL;
    END;
    
    START TRANSACTION;
    
    INSERT INTO Detalle_Venta (ID_Venta, ID_Producto, Cantidad, Subtotal) 
    VALUES (p_ID_Venta, p_ID_Producto, p_Cantidad, p_Subtotal);
    
    -- Actualizar stock del producto
    UPDATE Productos 
    SET Stock = Stock - p_Cantidad 
    WHERE ID_Producto = p_ID_Producto;
    
    SELECT LAST_INSERT_ID() as ID_Detalle_Venta, 'Detalle de venta agregado exitosamente' as Mensaje;
    
    COMMIT;
END //
DELIMITER ;

-- Procedimiento para obtener estadísticas
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_ObtenerEstadisticas()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM Clientes) as TotalClientes,
        (SELECT COUNT(*) FROM Productos) as TotalProductos,
        (SELECT COUNT(*) FROM Ventas) as TotalVentas,
        (SELECT COALESCE(SUM(Total), 0) FROM Ventas) as TotalIngresos;
END //
DELIMITER ;

-- Procedimiento para buscar clientes por nombre
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_BuscarClientes(
    IN p_Busqueda VARCHAR(100)
)
BEGIN
    SELECT * FROM Clientes 
    WHERE Nombre LIKE CONCAT('%', p_Busqueda, '%')
    OR Telefono LIKE CONCAT('%', p_Busqueda, '%')
    OR Correo LIKE CONCAT('%', p_Busqueda, '%');
END //
DELIMITER ;

-- Procedimiento para obtener productos por categoría
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_ProductosPorCategoria(
    IN p_Tipo_Prenda VARCHAR(50)
)
BEGIN
    SELECT * FROM Productos 
    WHERE Tipo_Prenda = p_Tipo_Prenda
    ORDER BY Nombre;
END //
DELIMITER ;

-- ========================================
-- STORED PROCEDURES PARA ACTUALIZAR
-- ========================================

-- Actualizar Cliente
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_ActualizarCliente(
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
END //
DELIMITER ;

-- Actualizar Producto
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_ActualizarProducto(
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
END //
DELIMITER ;

-- Actualizar Venta
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_ActualizarVenta(
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
END //
DELIMITER ;

-- ========================================
-- STORED PROCEDURES PARA ELIMINAR
-- ========================================

-- Eliminar Cliente
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_EliminarCliente(
    IN p_ID_Cliente INT
)
BEGIN
    DELETE FROM Clientes WHERE ID_Cliente = p_ID_Cliente;
    SELECT 'Cliente eliminado exitosamente' as Mensaje;
END //
DELIMITER ;

-- Eliminar Producto
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_EliminarProducto(
    IN p_ID_Producto INT
)
BEGIN
    DELETE FROM Productos WHERE ID_Producto = p_ID_Producto;
    SELECT 'Producto eliminado exitosamente' as Mensaje;
END //
DELIMITER ;

-- Eliminar Venta
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_EliminarVenta(
    IN p_ID_Venta INT
)
BEGIN
    -- Primero eliminar detalles de venta
    DELETE FROM Detalle_Venta WHERE ID_Venta = p_ID_Venta;
    -- Luego eliminar la venta
    DELETE FROM Ventas WHERE ID_Venta = p_ID_Venta;
    SELECT 'Venta eliminada exitosamente' as Mensaje;
END //
DELIMITER ;

-- ========================================
-- STORED PROCEDURES PARA BUSCAR POR ID
-- ========================================

-- Buscar Cliente por ID (cambiar nombre de sp_BuscarClientes)
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_BuscarClientesPorID(
    IN p_ID_Cliente INT
)
BEGIN
    SELECT ID_Cliente, Nombre, Telefono, Correo 
    FROM Clientes 
    WHERE ID_Cliente = p_ID_Cliente;
END //
DELIMITER ;

-- Buscar Proveedor por ID
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_BuscarProveedorPorID(
    IN p_ID_Proveedor INT
)
BEGIN
    SELECT ID_Proveedor, Nombre, Telefono, Correo 
    FROM Proveedores 
    WHERE ID_Proveedor = p_ID_Proveedor;
END //
DELIMITER ;

-- Buscar Venta por ID
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_BuscarVentaPorID(
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
END //
DELIMITER ;

-- Productos por Categoría (ya existe pero lo renombro para claridad)
DELIMITER //
CREATE PROCEDURE IF NOT EXISTS sp_ProductosPorCategoria(
    IN p_Tipo_Prenda VARCHAR(50)
)
BEGIN
    SELECT * FROM Productos 
    WHERE Tipo_Prenda = p_Tipo_Prenda
    ORDER BY Nombre;
END //
DELIMITER ;

-- -----------------------------------------------------
-- 6. VERIFICACIÓN DE STORED PROCEDURES
-- -----------------------------------------------------

-- Verificar que los procedimientos se crearon correctamente
SELECT ROUTINE_NAME, ROUTINE_TYPE 
FROM INFORMATION_SCHEMA.ROUTINES 
WHERE ROUTINE_SCHEMA = 'TiendaRopa' 
AND ROUTINE_TYPE = 'PROCEDURE';

-- Mensaje final
SELECT 'Stored Procedures creados exitosamente - Sistema listo para usar CALL' as mensaje;