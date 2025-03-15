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


