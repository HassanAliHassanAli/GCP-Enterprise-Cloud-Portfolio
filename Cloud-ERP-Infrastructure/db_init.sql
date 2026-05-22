-- ======================================================
-- Initial Schema Setup for ERP Cloud Database
-- Target Engine: PostgreSQL 14 (Cloud SQL)
-- ======================================================

CREATE SCHEMA IF NOT EXISTS erp_core;

-- Create basic structural tables for Supply Chain & Sales
CREATE TABLE erp_core.sales_orders (
    order_id SERIAL PRIMARY KEY,
    customer_name VARCHAR(100) NOT NULL,
    order_date DATE DEFAULT CURRENT_DATE,
    total_amount DECIMAL(10, 2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Processing'
);

CREATE TABLE erp_core.inventory_logs (
    log_id SERIAL PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    stock_change INT NOT NULL,
    transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Note: This is a foundational schema intended to be expanded 
-- by data engineering pipelines or directly connected to BI tools (Power BI/Tableau).