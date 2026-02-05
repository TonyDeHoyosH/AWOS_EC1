CREATE USER app_user WITH PASSWORD 'cafeteria2026';

GRANT CONNECT ON DATABASE postgres TO app_user;

GRANT USAGE ON SCHEMA public TO app_user;

GRANT SELECT ON vw_ventas_por_categoria TO app_user;
GRANT SELECT ON vw_productos_top_rendimiento TO app_user;
GRANT SELECT ON vw_analisis_ventas_empleados TO app_user;
GRANT SELECT ON vw_ranking_productos_ventas TO app_user;
GRANT SELECT ON vw_inventario_critico TO app_user;

REVOKE ALL ON productos FROM app_user;
REVOKE ALL ON ventas FROM app_user;
REVOKE ALL ON categorias FROM app_user;
REVOKE ALL ON empleados FROM app_user;
REVOKE ALL ON turnos FROM app_user;