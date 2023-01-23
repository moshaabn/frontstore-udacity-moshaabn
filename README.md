# Storefront Backend Project


## Prepare env
- add a `.env` file in the root directory and add user_name and password identical 
- to what is in database.json
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5433
POSTGRES_DB=frontstore
POSTGRES_USER=frontstoreuser
POSTGRES_PASSWORD=1234
SALT_ROUNDS=10
SECRET=secret
BCRYPT_PASSWORD=MYSECRET
```

## database.json prepare
## to setup a database create database.json and put the following info to it
``` json
{
    "dev": {
        "driver": "pg",
        "host": "127.0.0.1",
        "port": 5432,
        "database": "frontstore",
        "user": "frontstoreuser",
        "password": "1234"
    },
    "test": {
        "driver": "pg",
        "host": "127.0.0.1",
        "port": 5433,
        "database": "storefront",
        "user": "storefrontuser",
        "password": "1234"
    }
}
```
## create docker-compose.yml and put the following info to it 
``` yml
version: '3.9'

services:
  postgres:
    image: postgres
    ports:
      - '5432:5432'
    env_file:
      - .env
    volumes:
      - 'postgres:/var/lib/postgresql/data'

  postgres-test:
    image: postgres
    ports:
      - '5433:5432'
    env_file:
      - .env

volumes:
  postgres:
```

## backend will run on port 3000
## testing backend will run on port 3001
## database port on docker container for postges on port 5432 for development and 5433 for testing

## Installation instruction
#### ``` docker-compose up ``` to start the docker container for the database
#### ``` npm install ```  to install all dependencies for the app
#### ``` npm run db-up ``` to set up the database 
#### ``` npm run build  ``` to build the app should be done before starting the app

## Start app
#### ``` npm run start ``` to start the app
