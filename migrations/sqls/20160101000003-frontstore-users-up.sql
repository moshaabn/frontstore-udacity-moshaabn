CREATE TABLE users (
  id              SERIAL PRIMARY KEY,
  user_name        VARCHAR(250) NOT NULL,
  first_name       VARCHAR(250) NOT NULL,
  last_name        VARCHAR(250) NOT NULL,
  password_digest VARCHAR(250) NOT NULL
);