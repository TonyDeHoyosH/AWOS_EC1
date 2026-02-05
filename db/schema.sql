DROP TABLE IF EXISTS ventas CASCADE;
DROP TABLE IF EXISTS productos CASCADE;
DROP TABLE IF EXISTS categorias CASCADE;
DROP TABLE IF EXISTS empleados CASCADE;
DROP TABLE IF EXISTS turnos CASCADE;

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL UNIQUE,
    descripcion TEXT,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE productos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(200) NOT NULL,
    categoria_id INTEGER REFERENCES categorias(id),
    precio DECIMAL(10,2) NOT NULL CHECK (precio >= 0),
    costo DECIMAL(10,2) NOT NULL CHECK (costo >= 0),
    stock INTEGER DEFAULT 0 CHECK (stock >= 0),
    stock_minimo INTEGER DEFAULT 10,
    activo BOOLEAN DEFAULT true,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE turnos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    activo BOOLEAN DEFAULT true
);

CREATE TABLE empleados (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    apellido VARCHAR(150) NOT NULL,
    email VARCHAR(200) UNIQUE,
    telefono VARCHAR(20),
    turno_id INTEGER REFERENCES turnos(id),
    fecha_contratacion DATE DEFAULT CURRENT_DATE,
    salario DECIMAL(10,2),
    activo BOOLEAN DEFAULT true
);

CREATE TABLE ventas (
    id SERIAL PRIMARY KEY,
    producto_id INTEGER NOT NULL REFERENCES productos(id),
    empleado_id INTEGER REFERENCES empleados(id),
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    descuento DECIMAL(10,2) DEFAULT 0,
    total DECIMAL(10,2) NOT NULL,
    metodo_pago VARCHAR(50) DEFAULT 'efectivo',
    fecha_venta TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    turno VARCHAR(20),
    notas TEXT
);