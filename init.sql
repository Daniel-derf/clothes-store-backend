drop schema store cascade;
create schema store;

create table store.orders (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "productsIds" INT[],
  "totalPrice" NUMERIC(10,2),
  status VARCHAR(30)
);

create table store.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  price NUMERIC(10,2),
  sex CHAR(1),
  description TEXT,
  "ratingId" INT,
  "availableSizeQtt" JSONB
);

create table store.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  profile VARCHAR(10) CHECK (profile IN ('admin', 'client'))
);

create table store.wishlist (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "productsIds" INT[]
);

-- initial population
-- users
insert into store.users (name, password, email, profile) values
('testUser', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste@email.com', 'client'),
('testUser2', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste2@email.com', 'client'),
('testUser3', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste3@email.com', 'client'),
('testUser4', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste4@email.com', 'admin');

-- products
insert into store.products (name, price, sex, description, "ratingId", "availableSizeQtt") values
('Product 1', 100, 'M', 'Description 1', 1, '{"gg": 5}'),
('Product 2', 200, 'F', 'Description 2', 2, '{"gg": 3}'),
('Product 3', 300, 'M', 'Description 3', 3, '{"gg": 2}'),
('Product 4', 400, 'F', 'Description 4', 4, '{"gg": 4}'),
('Product 5', 500, 'M', 'Description 5', 5, '{"gg": 1}');

-- orders
insert into store.orders ("userId", "productsIds", "totalPrice", status) values
(1, '{201, 202}', 100.5, 'CANCELLED'),
(2, '{203}', 50.0, 'TRANSPORT'),
(3, '{204, 205, 206}', 150.75, 'PREPARATION'),
(4, '{204, 205, 206}', 150.75, 'PREPARATION');




