![Altschool Logo](https://raw.githubusercontent.com/Oluwasetemi/altschool-opensource-names/d5d87d27629fdd83b4a1d601afee0248f69cb25e/AltSchool-dark.svg)

# Altschool Pizza App Assignment

After learning a new concept in NodeJS every week we apply what we have learned into this project, therefore this project often under continuous development. So far, I have learned and applied concepts from NodeJS, ExpressJS, authentication, authorisation, e.t.c.

## Table of contents

- [Overview](#overview)
  - [The project](#the-project)
  - [About project](#about-project)
  - [Usage](#usage)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The project

#### Question:

From our last live class, we created a mini pizza ordering app. What we want you to do now is to add users and protect the routes

#### Tasks
- Add a user schema, the attributes/fields are up to you but the required fields/attributes are: 
  - `username`
  - `password`
  - `userType`
- `userType` should be `admin` or `user`
- Using basic authentication, protect the `order` routes
- Add query params to the `/orders` route, we want to:
  - Sort the `total_price` from ascending to descending
  - Sort the `date` created from asc to desc
  - Query by a `state`
  - Add pagination to the `GET /orders` route

**Bonus**
- Write integration tests for all the routes
- Refactor the code such that we have routers for orders and users

### About project

This is an API created with ExpressJS. It can be classified into three main routes, the `users` route, `orders` route, and `auth` route. Each route contains the following methods and access control level authentication:
 
#### Orders

| Route              | Methods | Controller    | ACL             |
| :----------------- | :-----  | :------------ | :-------------- |
| /orders            | GET     | getOrders     | -               |
| /orders/:orderId   | GET     | getOrderById  | -               |
| /orders            | POST    | makeOrder     | `admin`, `user` |
| /orders/:id        | PUT     | updateOrder   | `admin`         |
| /orders/:id        | DELETE  | deleteOrder   | `admin`, `user` |

#### Users

| Route              | Methods | Controller     | ACL             |
| :----------------- | :-----  | :------------  | :-------------- |
| /users             | GET     | getUsers       | `admin`         |
| /users/:userId     | GET     | getUserById    | `admin`         |
| /users             | POST    | createUser     | -               |
| /users/:id         | PUT     | updateUser     | `admin`         |
| /users/:id         | DELETE  | deleteUser     | `admin`         |

#### Auth

| Route              | Methods | Controller     | ACL       |
| :----------------- | :-----  | :------------  | :-------- |
| /auth/login        | POST    | login          | -         |
| /auth/logout       | POST    | logoout        | -         |


## Usage

Clone repository 

```bash
git clone https://<insert_your_token>@github.com/davidudo/altschool-pizza_app-assignment
```

Start local mongodb server

```bash
mongod --dbpath ~/data/db
```

Change directory

```bash
cd altschool-pizza_app-assignment
```

Install dependencies

```bash
npm install
```

Create a `.env` file and add

```
MONGODB_URI=mongodb://localhost:27017/<database_name>
```

Start server

```bash
npm run start:dev
```

> NOTE: Go to `./config/dbConfig.js` and `./index.js` files and uncomment the lines with `console.log()` to begin local development or testing of the API. Also, the `.env` is important as it is needed for authentication processes.

## My process

Since this API already had a prior code base, my design process involved me writing out the best way to refactor the code base and add the features specified by the tutor. My design process could be divided into three stages:

1. Refactor code base
2. Add specified routes and it's corresponding functionality
3. Added authentication to certain routes

### Built with

- Nodejs
- ExpressJS
- Mongoose
- MomentJS
- Dotenv

### What I learned

- How to Object Document Model (ODM) which in this project is Mongoose, to perform CRUD actions with MongoDB using NodeJS
- Basic authentication
- How to use ESLint

### Continued development

I look forward to improving the API's authentication system using a standard library called PassportJS. Since it is an API, I will use the JWT strategy for authentication.

### Useful resources

For the development of the authentication route and middleware, I found this resources, [Basic Authentication in Node.js using HTTP Header](https://www.geeksforgeeks.org/basic-authentication-in-node-js-using-http-header/) and [Basic Authentication in Postman](https://www.toolsqa.com/postman/basic-authentication-in-postman/) very useful.

## Author

- Twitter - [@_davidudo](https://www.twitter.com/_davidudo)
- LinkedIn - [David Udo](https://www.linkedin.com/in/david-udo-1713b3231)
