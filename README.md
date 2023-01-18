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

## Setup app
#### ``` docker-compose up ``` to start the docker container for the database
#### ``` npm install ```  to install all dependencies for the app
#### ``` npm run db-up ``` to set up the database 
#### ``` npm run build  ``` to build the app should be done before starting the app

## Start app
#### ``` npm run start ``` to start the app
