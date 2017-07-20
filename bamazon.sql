
DROP DATABASE IF EXISTS products_db;

CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products (
	item_id INTEGER(11) AUTO_INCREMENT,
	product_name VARCHAR(30) NULL,
    department_name VARCHAR(30) NULL,
    price DECIMAL (10,2) NULL,
    stock_quantity INT(10) NULL,
	PRIMARY KEY(item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Socks', 'Apparel', '15', '10', 1);
INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('iPhone', 'Electronics', '600', '15', 2);
INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Tent', 'Outdoors & Recreation', '200', '5', 3);
INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Knife', 'Kitchen & Appliances', '100', '20', 4);
INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Body Bag', 'Outdoors & Recreation', '75', '8', 5);
INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Bleach', 'Household', '10', '13', 6);
INSERT INTO products (product_name, department_name, price, stock_quantity, item_id) VALUES ('Pre-written alibi', 'Stationaries', '10', '30', 7);


SELECT * FROM products; 
