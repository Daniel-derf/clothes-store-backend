drop schema store cascade;
create schema store;

create table store.products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50),
  price NUMERIC(10,2),
  sex CHAR(1),
  description TEXT,
  "ratingId" INT,
  image_url VARCHAR(300)
);

create table store.available_sizes (
  id SERIAL PRIMARY KEY,
  size VARCHAR(2),
  quantity INT,
  "productId" INT REFERENCES store.products(id) ON DELETE CASCADE
);

create table store.users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  password VARCHAR(255) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  profile VARCHAR(10) CHECK (profile IN ('admin', 'client'))
);

create table store.orders (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL REFERENCES store.users(id) on delete cascade,
  "productsIds" INT[],
  "totalPrice" NUMERIC(10,2),
  status VARCHAR(30)
);

create table store.wishlist (
  id SERIAL PRIMARY KEY,
  "userId" INT REFERENCES store.users(id) ON DELETE CASCADE,
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
insert into store.products (name, price, sex, description, "ratingId", image_url) values
('Product 1', 100, 'M', 'Description 1', 1, 'www.image.com'),
('Product 2', 200, 'F', 'Description 2', 2, 'www.image.com'),
('Product 3', 300, 'M', 'Description 3', 3, 'www.image.com'),
('Product 4', 400, 'F', 'Description 4', 4, 'www.image.com'),
('Product 5', 500, 'M', 'Description 5', 5, 'www.image.com');

-- product sizes
insert into store.available_sizes (size, quantity, "productId") values
('gg', 2, 1),
('pp', 2, 2),
('g', 2, 3),
('p', 2, 4),
('m', 2, 5);

-- orders
insert into store.orders ("userId", "productsIds", "totalPrice", status) values
(1, '{201, 202}', 100.5, 'CANCELLED'),
(2, '{203}', 50.0, 'TRANSPORT'),
(3, '{204, 205, 206}', 150.75, 'PREPARATION'),
(4, '{204, 205, 206}', 150.75, 'PREPARATION');

-- wishlist
insert into store.wishlist ("userId", "productsIds") values (4, '{1, 2}');




