CREATE OR REPLACE VIEW vw_ventas_por_categoria AS
SELECT 
    c.nombre AS categoria,
    COUNT(v.id) AS total_transacciones,
    SUM(v.cantidad) AS unidades_vendidas,
    SUM(v.total) AS ingresos_totales,
    AVG(v.total) AS ticket_promedio,
    ROUND((SUM(v.total) - SUM(p.costo * v.cantidad)), 2) AS utilidad_bruta,
    CASE 
        WHEN SUM(v.total) > 5000 THEN 'Alta'
        WHEN SUM(v.total) > 2000 THEN 'Media'
        ELSE 'Baja'
    END AS clasificacion_ventas
FROM ventas v
JOIN productos p ON v.producto_id = p.id
JOIN categorias c ON p.categoria_id = c.id
GROUP BY c.id, c.nombre
HAVING SUM(v.total) > 100
ORDER BY ingresos_totales DESC;

CREATE OR REPLACE VIEW vw_productos_top_rendimiento AS
SELECT 
    p.id,
    p.nombre,
    c.nombre AS categoria,
    COUNT(v.id) AS veces_vendido,
    SUM(v.cantidad) AS total_unidades,
    SUM(v.total) AS ingresos_generados,
    AVG(v.total) AS venta_promedio,
    SUM(v.total) - SUM(p.costo * v.cantidad) AS margen_utilidad,
    CASE 
        WHEN p.stock < p.stock_minimo THEN 'Crítico'
        WHEN p.stock < (p.stock_minimo * 2) THEN 'Bajo'
        ELSE 'Normal'
    END AS estado_stock
FROM productos p
LEFT JOIN ventas v ON p.id = v.producto_id
JOIN categorias c ON p.categoria_id = c.id
WHERE p.activo = true
GROUP BY p.id, p.nombre, p.stock, p.stock_minimo, c.nombre
HAVING COUNT(v.id) > 2
ORDER BY ingresos_generados DESC;

CREATE OR REPLACE VIEW vw_analisis_ventas_empleados AS
WITH ventas_empleado AS (
    SELECT 
        e.id,
        e.nombre,
        e.apellido,
        t.nombre AS turno,
        COUNT(v.id) AS num_ventas,
        SUM(v.total) AS total_vendido,
        AVG(v.total) AS ticket_promedio
    FROM empleados e
    LEFT JOIN ventas v ON e.id = v.empleado_id
    LEFT JOIN turnos t ON e.turno_id = t.id
    WHERE e.activo = true
    GROUP BY e.id, e.nombre, e.apellido, t.nombre
)
SELECT 
    id,
    nombre || ' ' || apellido AS empleado_completo,
    turno,
    COALESCE(num_ventas, 0) AS total_ventas,
    COALESCE(total_vendido, 0) AS ingresos_generados,
    COALESCE(ticket_promedio, 0) AS promedio_ticket,
    CASE 
        WHEN num_ventas >= 20 THEN 'Excelente'
        WHEN num_ventas >= 10 THEN 'Bueno'
        WHEN num_ventas >= 5 THEN 'Regular'
        ELSE 'Bajo'
    END AS desempeno
FROM ventas_empleado
ORDER BY total_vendido DESC;

CREATE OR REPLACE VIEW vw_ranking_productos_ventas AS
SELECT 
    p.id,
    p.nombre AS producto,
    c.nombre AS categoria,
    COUNT(v.id) AS numero_transacciones,
    SUM(v.cantidad) AS unidades_totales,
    SUM(v.total) AS ingresos_totales,
    RANK() OVER (ORDER BY SUM(v.total) DESC) AS ranking_global,
    RANK() OVER (PARTITION BY c.nombre ORDER BY SUM(v.total) DESC) AS ranking_por_categoria,
    ROUND((SUM(v.total) / NULLIF(SUM(SUM(v.total)) OVER (), 0) * 100), 2) AS porcentaje_ingresos
FROM productos p
LEFT JOIN ventas v ON p.id = v.producto_id
JOIN categorias c ON p.categoria_id = c.id
GROUP BY p.id, p.nombre, c.nombre
ORDER BY ranking_global;

CREATE OR REPLACE VIEW vw_inventario_critico AS
SELECT 
    p.id,
    p.nombre,
    c.nombre AS categoria,
    p.stock AS stock_actual,
    p.stock_minimo,
    p.stock - p.stock_minimo AS diferencia,
    COALESCE(SUM(v.cantidad), 0) AS unidades_vendidas,
    CASE 
        WHEN p.stock = 0 THEN 'Sin Stock'
        WHEN p.stock < p.stock_minimo THEN 'Urgente'
        WHEN p.stock < (p.stock_minimo * 1.5) THEN 'Próximo a Crítico'
        ELSE 'Estable'
    END AS nivel_alerta,
    p.precio * (p.stock_minimo - p.stock) AS costo_reposicion_estimado
FROM productos p
JOIN categorias c ON p.categoria_id = c.id
LEFT JOIN ventas v ON p.id = v.producto_id
WHERE p.activo = true
GROUP BY p.id, p.nombre, p.stock, p.stock_minimo, p.precio, c.nombre
ORDER BY diferencia ASC;
