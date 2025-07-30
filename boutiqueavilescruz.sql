-- -----------------------------------------------------
-- Script para crear y poblar la Base de Datos "TiendaRopa"
-- Versión modificada con "Ropa de temporada"
-- -----------------------------------------------------

-- 1. CREACIÓN DE LA BASE DE DATOS Y TABLAS
DROP DATABASE IF EXISTS TiendaRopa;
CREATE DATABASE TiendaRopa;
USE TiendaRopa;

-- Tabla de Clientes
CREATE TABLE Clientes (
    ID_Cliente INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Correo VARCHAR(100) UNIQUE
);

-- Tabla de Proveedores
CREATE TABLE Proveedores (
    ID_Proveedor INT PRIMARY KEY AUTO_INCREMENT,
    Nombre VARCHAR(100) NOT NULL,
    Telefono VARCHAR(20),
    Correo VARCHAR(100)
);

-- Tabla de Productos
CREATE TABLE Productos (
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

-- Tabla de Ropa de temporada (Anteriormente Promociones)
CREATE TABLE Ropa_de_temporada (
    ID_Temporada INT PRIMARY KEY AUTO_INCREMENT,
    Descripcion VARCHAR(255),
    Fecha_Inicio DATE,
    Fecha_Fin DATE,
    Descuento INT -- Porcentaje de descuento
);

-- Tabla de Ventas
CREATE TABLE Ventas (
    ID_Venta INT PRIMARY KEY AUTO_INCREMENT,
    Fecha DATE NOT NULL,
    Total DECIMAL(10, 2) NOT NULL,
    ID_Cliente INT,
    FOREIGN KEY (ID_Cliente) REFERENCES Clientes(ID_Cliente) ON DELETE CASCADE
);

-- Tabla Detalle de Venta
CREATE TABLE Detalle_Venta (
    ID_Detalle_Venta INT PRIMARY KEY AUTO_INCREMENT,
    ID_Venta INT,
    ID_Producto INT,
    Cantidad INT NOT NULL,
    Subtotal DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (ID_Venta) REFERENCES Ventas(ID_Venta) ON DELETE CASCADE,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto) ON DELETE CASCADE
);

-- Tabla Producto_Temporada (Anteriormente Producto_Promocion)
CREATE TABLE Producto_Temporada (
    ID_Producto_Temporada INT PRIMARY KEY AUTO_INCREMENT,
    ID_Producto INT,
    ID_Temporada INT,
    FOREIGN KEY (ID_Producto) REFERENCES Productos(ID_Producto) ON DELETE CASCADE,
    FOREIGN KEY (ID_Temporada) REFERENCES Ropa_de_temporada(ID_Temporada) ON DELETE CASCADE
);


-- -----------------------------------------------------
-- 2. INSERCIÓN DE DATOS DE PRUEBA
-- -----------------------------------------------------

-- Poblando la tabla de Clientes (15 registros)
INSERT INTO Clientes (ID_Cliente, Nombre, Telefono, Correo) VALUES
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

-- Poblando la tabla de Proveedores (15 registros)
INSERT INTO Proveedores (ID_Proveedor, Nombre, Telefono, Correo) VALUES
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

-- Poblando la tabla de Productos (15 registros)
INSERT INTO Productos (ID_Producto, Nombre, Descripcion, Talla, Color, Precio, Marca, Tipo_Prenda, Temporada, Stock, ID_Proveedor) VALUES
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