CREATE DATABASE banco;

SET DATESTYLE TO 'European';

CREATE TABLE cuentas(
    id INT PRIMARY KEY,
    saldo DECIMAL CHECK (saldo >=0) NOT NULL
);

CREATE TABLE transacciones(
    id SERIAL,
    descripcion VARCHAR(50) NOT NULL,
    fecha DATE,
    monto DECIMAL NOT NULL,
    cuenta INT REFERENCES cuentas(id) 
);

INSERT INTO cuentas VALUES (1, 20000);
INSERT INTO cuentas VALUES (2, 40000);
INSERT INTO cuentas VALUES (3, 10000);
INSERT INTO cuentas VALUES (4, 80000);
INSERT INTO cuentas VALUES (5, 100000);