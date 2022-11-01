# AltSchool Pizza Company

Poudly presents the API for its proposed Pizza Order App.

The app is meant for prospective customers (who are referred to as users in the source code) to make orders of their favourite Pizza flavours.

---

## Requirements

1. User should be able to register
2. User should be able to login with JWT
3. Implement basic auth (I did this in an earlier git iteration, before refactoring it to JWT)
4. User should be able to get orders
5. Users should be able to create orders
6. Users should be able to update and delete orders
7. Test application

---

## Setup

- I made use of the YARN Package Manager
- I made use of MongoDB Atlas
- Install NodeJS
- pull this repo
- update env with .env
- run `yarn dev`

---

## Base URL

- 127.0.0.1:1111

## Models

---

### User

| field           | data_type | constraints                                      |
| --------------- | --------- | ------------------------------------------------ |
| id              | string    | required                                         |
| username        | string    | required, unique                                 |
| password        | string    | required, minlength: 8                           |
| userType        | string    | required, default: user, enum: ['user', 'admin'] |
| age             | number    | optional                                         |
| email           | string    | required, unique                                 |
| firstname       | string    | required                                         |
| lastname        | string    | optional                                         |
| deliveryAddress | string    | optional                                         |
| date            | date      | optional                                         |

### Order

| field         | data_type | constraints                     |
| ------------- | --------- | ------------------------------- |
| id            | string    | required                        |
| created_at    | date      | required                        |
| state         | number    | required,default:1              |
| total_price   | number    | required                        |
| items         | array     | required                        |
| item.name     | string    | required                        |
| item.price    | number    | required                        |
| item.size     | string    | required, enum: ['m', 's', 'l'] |
| item.quantity | number    | required, enum: ['m', 's', 'l'] |

## APIs

---

### Signup User

- Route: /signup
- Method: POST
- Body:

```
{
 "username": "obedient",
  "password": "obidient123",
  "email": "obi4president@gmail.com",
  "firstName": "Peter",
  "lastName": "Obi"
}
```

- Responses

Success

```
<h4>Congratulations, your account has been created successfully! :) </h4>

```

---

### Login User

- PLEASE NOTE: Login is done in the header of the order route

- Route: /order
- Method: It depends
- Header:

```
{
  "password": "obidient123",
  "username": "obedient",
}
```

- Responses

Success

```
{
    message: 'Login successful',
    token: 'sjlkafjkldsfjsd'
}
```

---

### Create Order

- Route: /orders
- Method: POST
- Header
  - Authorization: Bearer {token}
- Body:

```
{
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

### Get Order

- Route: /orders/:id
- Method: GET
- Header
  - Authorization: Bearer {token}
- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

### Get Orders

- Route: /orders
- Method: GET
- Header:
  - Authorization: Bearer {token}
- Query params:
  - page (default: 1)
  - per_page (default: 10)
  - order_by (default: created_at)
  - order (options: asc | desc, default: desc)
  - state
  - created_at
- Responses

Success

```
{
    state: 1,
    total_price: 900,
    created_at: Mon Oct 31 2022 08:35:00 GMT+0100,
    items: [{ name: 'chicken pizza', price: 900, size: 'm', quantity: 1}]
}
```

---

...

## Contributor

- Emmanuel Eni
