<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

Madu is a digital map that references ecoresponsible addresses (activities, restaurants, shops) and evaluates their environmental impact through a greenscore.

## Installation

```bash
$ npm install
```

## Running MongoDB

```
docker-compose up -d
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
If your database is empty you can create an admin with `/users/admin`.
After that, you can get a bearer token with `/auth/login`, then call all the routes with the token in Authorization header.

## Documentation

- swagger

While the application is running, open your browser and navigate to http://localhost:3000/.

- Compodoc

You can generate your documentation using the below command ``` npx compodoc -p tsconfig.json -s ``` . Then, open your browser and navigate to http://localhost:8080.