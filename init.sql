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
  "availableSizeQtt" INT
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
insert into store.users (id, name, password, email, profile) values
(1, 'testUser', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste@email.com', 'client'),
(2, 'testUser2', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste2@email.com', 'client'),
(3, 'testUser3', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste3@email.com', 'client'),
(4, 'testUser4', '$2b$10$20IJmuLaI1P.duklED9Whu6QmkO2vgy.70K7mxZzZkmNvAh38YjAq', 'teste4@email.com', 'admin');

-- products
insert into store.products (id, name, price, sex, description, "ratingId", "availableSizeQtt") values
(1, 'Product 1', 100, 'M', 'Description 1', 1, 5),
(2, 'Product 2', 200, 'F', 'Description 2', 2, 3),
(3, 'Product 3', 300, 'M', 'Description 3', 3, 2),
(4, 'Product 4', 400, 'F', 'Description 4', 4, 4),
(5, 'Product 5', 500, 'M', 'Description 5', 5, 1);

-- orders
insert into store.orders (id, "userId", "productsIds", "totalPrice", status) values
(1, 1, '{201, 202}', 100.5, 'CANCELLED'),
(2, 1, '{203}', 50.0, 'TRANSPORT'),
(3, 2, '{204, 205, 206}', 150.75, 'PREPARATION'),
(4, 4, '{204, 205, 206}', 150.75, 'PREPARATION');




