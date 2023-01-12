# Storefront Backend Project


## Prepare env
- add a `.env` file in the root directory and add username and password identical 
- to what is in database.json
```
POSTGRES_HOST=127.0.0.1
POSTGRES_PORT=5432
POSTGRES_PORT_TEST=5433
POSTGRES_DB=frontstore
POSTGRES_USER=frontstoreUser
POSTGRES_PASSWORD=1234
BCRYPT_PASSWORD=MYSECRET
SALT_ROUNDS=10
SECRET=secret
```

## Setup app
#### -docker-compose up to start the docker container
#### -npm install to install all dependencies
#### -npm run db-up to set up the database
#### -npm run build to build the app

## Start app
#### -npm run start
