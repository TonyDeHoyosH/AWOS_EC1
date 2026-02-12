-- Create the application user if it doesn't exist
DO
$do$
BEGIN
   IF NOT EXISTS (
      SELECT FROM pg_catalog.pg_roles
      WHERE  rolname = 'app_user') THEN

      CREATE ROLE app_user LOGIN PASSWORD 'cafeteria_secure_pass';
   END IF;
END
$do$;

-- Grant connection to the database
GRANT CONNECT ON DATABASE postgres TO app_user;

-- Grant usage on schema public
GRANT USAGE ON SCHEMA public TO app_user;

-- REVOKE ALL permissions on tables to ensure strict security
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM app_user;

-- GRANT SELECT ONLY on the views
GRANT SELECT ON vw_sales_daily TO app_user;
GRANT SELECT ON vw_top_products_ranked TO app_user;
GRANT SELECT ON vw_inventory_risk TO app_user;
GRANT SELECT ON vw_customer_value TO app_user;
GRANT SELECT ON vw_payment_mix TO app_user;