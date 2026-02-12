INSERT INTO categories (name) VALUES
('Coffee'),
('Bakery'),
('Sandwiches'),
('Beverages');

INSERT INTO products (name, category_id, price, stock) VALUES
('Espresso', 1, 2.50, 100),
('Cappuccino', 1, 3.50, 80),
('Latte', 1, 4.00, 75),
('Croissant', 2, 2.75, 20),
('Muffin', 2, 2.50, 15),
('Ham & Cheese', 3, 5.50, 10),
('Club Sandwich', 3, 6.50, 8),
('Orange Juice', 4, 3.00, 30),
('Water', 4, 1.50, 50);

INSERT INTO customers (name, email) VALUES
('John Doe', 'john@example.com'),
('Jane Smith', 'jane@example.com'),
('Bob Johnson', 'bob@example.com'),
('Alice Brown', 'alice@example.com'),
('Charlie Wilson', 'charlie@example.com');

INSERT INTO orders (customer_id, created_at, status, channel) VALUES
(1, NOW() - INTERVAL '1 day', 'completed', 'in_store'),
(2, NOW() - INTERVAL '1 day', 'completed', 'online'),
(3, NOW() - INTERVAL '2 days', 'completed', 'in_store'),
(1, NOW() - INTERVAL '3 days', 'completed', 'in_store'),
(4, NOW(), 'completed', 'delivery'),
(5, NOW(), 'completed', 'in_store');

INSERT INTO order_items (order_id, product_id, qty, unit_price) VALUES
(1, 1, 2, 2.50),
(1, 4, 1, 2.75),
(2, 3, 1, 4.00),
(2, 5, 2, 2.50),
(3, 2, 1, 3.50),
(4, 1, 1, 2.50),
(5, 7, 1, 6.50),
(6, 6, 1, 5.50);

INSERT INTO payments (order_id, method, paid_amount) VALUES
(1, 'cash', 7.75),
(2, 'card', 9.00),
(3, 'cash', 3.50),
(4, 'cash', 2.50),
(5, 'online', 6.50),
(6, 'card', 5.50);