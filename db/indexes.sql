CREATE INDEX idx_ventas_fecha ON ventas(fecha_venta);

CREATE INDEX idx_ventas_producto_id ON ventas(producto_id);

CREATE INDEX idx_ventas_empleado_id ON ventas(empleado_id);

CREATE INDEX idx_ventas_metodo_pago ON ventas(metodo_pago);

CREATE INDEX idx_ventas_turno ON ventas(turno);

CREATE INDEX idx_productos_categoria_id ON productos(categoria_id);

CREATE INDEX idx_productos_activo ON productos(activo);

CREATE INDEX idx_empleados_turno_id ON empleados(turno_id);

CREATE INDEX idx_empleados_activo ON empleados(activo);