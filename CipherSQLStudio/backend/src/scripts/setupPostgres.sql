-- CipherSQLStudio PostgreSQL Setup Script
-- Run this script to set up the database and sample data

-- Create database (run as postgres superuser)
-- CREATE DATABASE cipher_sql_studio;

-- Connect to the database
\c cipher_sql_studio;

-- Create read-only user for query execution
CREATE USER sql_learner WITH PASSWORD 'learner_password';

-- Create assignment schemas
CREATE SCHEMA IF NOT EXISTS assignment_1;
CREATE SCHEMA IF NOT EXISTS assignment_2;

-- Grant read-only access to assignment_1
GRANT USAGE ON SCHEMA assignment_1 TO sql_learner;
GRANT SELECT ON ALL TABLES IN SCHEMA assignment_1 TO sql_learner;
ALTER DEFAULT PRIVILEGES IN SCHEMA assignment_1 GRANT SELECT ON TABLES TO sql_learner;

-- Grant read-only access to assignment_2
GRANT USAGE ON SCHEMA assignment_2 TO sql_learner;
GRANT SELECT ON ALL TABLES IN SCHEMA assignment_2 TO sql_learner;
ALTER DEFAULT PRIVILEGES IN SCHEMA assignment_2 GRANT SELECT ON TABLES TO sql_learner;

-- Set up assignment_1 schema (Basic queries)
SET search_path = assignment_1;

-- Create departments table
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

-- Create employees table
CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary DECIMAL(10, 2),
  hire_date DATE
);

-- Insert sample data into departments
INSERT INTO departments (name, location) VALUES
  ('Engineering', 'San Francisco'),
  ('Sales', 'New York'),
  ('Marketing', 'Los Angeles');

-- Insert sample data into employees
INSERT INTO employees (name, department_id, salary, hire_date) VALUES
  ('Alice Johnson', 1, 95000, '2020-01-15'),
  ('Bob Smith', 1, 85000, '2021-03-20'),
  ('Carol White', 2, 75000, '2019-06-10'),
  ('David Brown', 2, 80000, '2020-11-05'),
  ('Eve Davis', 3, 70000, '2022-02-14');

-- Create indexes
CREATE INDEX idx_employees_department_id ON employees(department_id);
CREATE INDEX idx_employees_salary ON employees(salary);

-- Set up assignment_2 schema (JOIN queries)
SET search_path = assignment_2;

-- Create the same tables for assignment_2
CREATE TABLE departments (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  location VARCHAR(100)
);

CREATE TABLE employees (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  department_id INTEGER REFERENCES departments(id),
  salary DECIMAL(10, 2),
  hire_date DATE
);

-- Insert sample data
INSERT INTO departments (name, location) VALUES
  ('Engineering', 'San Francisco'),
  ('Sales', 'New York'),
  ('Marketing', 'Los Angeles');

INSERT INTO employees (name, department_id, salary, hire_date) VALUES
  ('Alice Johnson', 1, 95000, '2020-01-15'),
  ('Bob Smith', 1, 85000, '2021-03-20'),
  ('Carol White', 2, 75000, '2019-06-10'),
  ('David Brown', 2, 80000, '2020-11-05'),
  ('Eve Davis', 3, 70000, '2022-02-14');

-- Create indexes
CREATE INDEX idx_employees_department_id ON employees(department_id);

-- Grant permissions again after table creation
GRANT SELECT ON ALL TABLES IN SCHEMA assignment_1 TO sql_learner;
GRANT SELECT ON ALL TABLES IN SCHEMA assignment_2 TO sql_learner;

-- Verify setup
\echo 'PostgreSQL setup completed successfully!'
\echo 'Schemas created: assignment_1, assignment_2'
\echo 'User created: sql_learner (read-only access)'
