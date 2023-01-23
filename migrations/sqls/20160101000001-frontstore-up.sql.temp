CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  user_name        VARCHAR(250) NOT NULL,
  first_name       VARCHAR(250) NOT NULL,
  last_name        VARCHAR(250) NOT NULL,
  password_digest VARCHAR(250) NOT NULL
);
CREATE TABLE products (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(250) NOT NULL,
  price INTEGER      NOT NULL
);

CREATE TABLE orders (
  id      SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users (id),
  status  BOOLEAN NOT NULL
);

CREATE TABLE order_products (
  order_id   INTEGER NOT NULL REFERENCES orders (id),
  product_id INTEGER NOT NULL REFERENCES products (id),
  quantity   INTEGER NOT NULL
);
-- CREATE ROLE storefrontUser superuser;
-- GRANT USAGE ON SCHEMA public TO storefrontUser;  
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO storefrontUser;
