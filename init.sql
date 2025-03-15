drop schema store cascade;
create schema store;

create table store.orders (
  id SERIAL PRIMARY KEY,
  "userId" INT NOT NULL,
  "productsIds" INT[],
  "totalPrice" NUMERIC(10,2),
  status VARCHAR(30)
);
