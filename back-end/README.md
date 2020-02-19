<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

Madu is a digital map that references ecoresponsible addresses (activities, restaurants, shops) and evaluates their environmental impact through a greenscore.

## Backend developer

* Corentin Croizat

## Used technologies

* Node.js is designed to build scalable network applications.
* MongoDB is a general purpose, document-based, distributed database built for modern application.

## Database schema

<img src="./db-schema.jpg" width="320" alt="Database schema" />
[Database schema](./db-schema.jpg)

## Used libraries

* NestJS is a framework for building Node.js server-side applications. It is on top of ExpressJS, fully supports TypeScript and use MVC pattern.
* Passport is authentication middleware for Node.js.
* Mongoose is an  mongodb object modeling for node.js.
* Swagger UI Express can generate API docs from express.
* Bcrypt is a library to help you hash passwords.
* Helmet can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
* Express CORS package. Cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
* Express-rate-limit is used against brute-force attacks.
* class-validator is used to validate data.
* RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous code.

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