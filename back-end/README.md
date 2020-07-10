<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


# Description

Madu is a digital map that references ecoresponsible addresses (activities, restaurants, shops).

# Argumentation file

## Used technologies

* **Node.js** is designed to build scalable network applications.
* **TypeScript** is a typed superset of JavaScript that compiles to plain JavaScript.
* **MongoDB** is a general purpose, document-based, distributed database built for modern application.

## Deployment on production

### Environment

The Backend needs to be run on an **Node.js** environment with access to a **MongoDB** database, correctly configure in the `.env` file or in the environment variables.

For the deployment in a production environment, some values in the `.env` file must be edited :
* **MONGO_URI** is the uri that the Backend use to connect to MongoDB.
* **JWT_SECRET** is a secret to sign tokens. This is used in the **Passport** JWT strategy.

### Build

```bash
# installation
$ npm install

# compile project
$ npm run build

# start server
$ npm run start:prod
```

## Database schema

<img src="./madu-db-schema.jpg" alt="Database schema" />

## The api's documentation

The **api** and **swagger's documentation** are deployed on [Madu's documentation](http://staging-madu-back-end-elb-1448654197.eu-west-2.elb.amazonaws.com).



# Development

## Running in local

### MongoDB

```bash
# start mongodb container
$ make create-db

# import data fixtures
$ make import-db

# drop database
$ make drop-db
```

### API

```bash
# installation
$ npm install

# development
$ npm run start

# watch mode
$ npm run start:dev
```

## Documentation

- swagger

While the application is running, open your browser and navigate to http://localhost:3000/.

- Compodoc

You can generate your documentation using the below command ``` npx compodoc -p tsconfig.json -s ``` . Then, open your browser and navigate to http://localhost:8080.

## Used libraries

* **NestJS** is a framework for building Node.js server-side applications. It is on top of ExpressJS, fully supports TypeScript and use MVC pattern.
* **Passport** is an authentication middleware for Node.js.
* **Mongoose** is an  mongodb object modeling for node.js.
* **Swagger UI Express** can generate API docs from express.
* **Bcrypt** is a library to help you hash passwords.
* **Helmet** can help protect your app from some well-known web vulnerabilities by setting HTTP headers appropriately.
* **Express CORS package**, cross-origin resource sharing (CORS) is a mechanism that allows resources to be requested from another domain.
* **Express-rate-limit** is used against brute-force attacks.
* **class-validator** is used to validate data.
* **RxJS** is a library for reactive programming using Observables, to make it easier to compose asynchronous code.
* **Multer** is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

## Authentication and permissions

You can see the AuthModule [here](./src/auth).

### Authentication

Authentication is an essential part of most applications. **Passport** is the most popular node.js authentication library, well-known by the community and successfully used in many production applications. Passport has a rich ecosystem of **strategies** that implement various authentication mechanisms. For this use case, clients will **start by authenticating with a username and password** using the local startegy. Once authenticated, the server will issue a JWT that can be sent as a **bearer token in an authorization header** on subsequent requests to prove authentication, that's the jwt strategy. 

### Authorization

Now that our user is authenticated, we need to verify his credentials.
**Guards** have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time. In our case, we use a guard that permits access only to users with a **specific role**, saved in the user.