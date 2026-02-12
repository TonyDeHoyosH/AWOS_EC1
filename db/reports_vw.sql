CREATE OR REPLACE VIEW vw_sales_daily AS
SELECT
    DATE(o.created_at) AS sale_date,
    COUNT(DISTINCT o.id) AS total_tickets,
    SUM(p.paid_amount) AS total_revenue,
    CASE
        WHEN COUNT(DISTINCT o.id) > 0 THEN ROUND(SUM(p.paid_amount) / COUNT(DISTINCT o.id), 2)
        ELSE 0
    END AS average_ticket
FROM orders o
JOIN payments p ON o.id = p.order_id
WHERE o.status = 'completed'
GROUP BY DATE(o.created_at)
ORDER BY sale_date DESC;

CREATE OR REPLACE VIEW vw_top_products_ranked AS
SELECT
    p.id AS product_id,
    p.name AS product_name,
    c.name AS category_name,
    SUM(oi.qty) AS total_units_sold,
    SUM(oi.qty * oi.unit_price) AS total_revenue,
    RANK() OVER (ORDER BY SUM(oi.qty * oi.unit_price) DESC) AS rank_by_revenue,
    DENSE_RANK() OVER (ORDER BY SUM(oi.qty) DESC) AS rank_by_units
FROM products p
JOIN categories c ON p.category_id = c.id
JOIN order_items oi ON p.id = oi.product_id
JOIN orders o ON oi.order_id = o.id
WHERE o.status = 'completed'
GROUP BY p.id, p.name, c.name;

CREATE OR REPLACE VIEW vw_inventory_risk AS
WITH RiskThresholds AS (
    SELECT 10 AS critical_level, 20 AS warning_level
)
SELECT
    p.id AS product_id,
    p.name AS product_name,
    c.name AS category_name,
    p.stock,
    CASE
        WHEN p.stock = 0 THEN 'Out of Stock'
        WHEN p.stock <= rt.critical_level THEN 'Critical'
        WHEN p.stock <= rt.warning_level THEN 'Warning'
        ELSE 'Healthy'
    END AS stock_level,
    CASE
        WHEN p.stock = 0 THEN 100
        WHEN p.stock <= rt.critical_level THEN 90
        WHEN p.stock <= rt.warning_level THEN 50
        ELSE 0
    END AS risk_score
FROM products p
JOIN categories c ON p.category_id = c.id
CROSS JOIN RiskThresholds rt
WHERE p.stock <= rt.warning_level
ORDER BY p.stock ASC;

CREATE OR REPLACE VIEW vw_customer_value AS
SELECT
    c.id AS customer_id,
    c.name AS customer_name,
    c.email,
    COUNT(DISTINCT o.id) AS orders_count,
    COALESCE(SUM(p.paid_amount), 0) AS total_spent,
    CASE
        WHEN COUNT(DISTINCT o.id) > 0 THEN ROUND(COALESCE(SUM(p.paid_amount), 0) / COUNT(DISTINCT o.id), 2)
        ELSE 0
    END AS avg_ticket_value,
    CASE
        WHEN SUM(p.paid_amount) > 100 THEN 'VIP'
        WHEN SUM(p.paid_amount) > 50 THEN 'Regular'
        ELSE 'New'
    END AS customer_segment
FROM customers c
LEFT JOIN orders o ON c.id = o.customer_id AND o.status = 'completed'
LEFT JOIN payments p ON o.id = p.order_id
GROUP BY c.id, c.name, c.email;

CREATE OR REPLACE VIEW vw_payment_mix AS
SELECT
    method,
    COUNT(id) AS transaction_count,
    SUM(paid_amount) AS total_amount,
    ROUND((SUM(paid_amount) * 100.0) / SUM(SUM(paid_amount)) OVER (), 2) AS revenue_share_percentage
FROM payments
GROUP BY method;
