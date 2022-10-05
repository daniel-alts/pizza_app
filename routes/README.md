# ROUTES

This document outlines the request/response structure for the endpoints

## User Routes

### Create a user

`/api/users/register` route

To create a user, send a `POST` request to the `/api/users/register` route. The body will contain a json with properties indicated as following:

```json
{
  "username": "username",
  "password": "user password"
}
```

### Get all users

`/api/users` route

<details>
<summary> :sunglasses: </summary>
This route is only accessible to users with the `admin` role
</details>

To get all users, send a `GET` request to the `/api/users` route. Supply your admin credentials using basic authentication. An example response is:

```json
{
  "status": true,
  "users": [
    {
      "username": "user1",
      "user_type": "admin",
      "id": "unique user id 1"
    },
    {
      "username": "user2",
      "user_type": "user",
      "id": "unique user id 2"
    },
    {
      "username": "user3",
      "user_type": "user",
      "id": "unique user id 3"
    }
  ]
}
```

## Order Routes

<details>
<summary>Something to note</summary>
Supply login credentials using basic authentication when sending requests to any of the routes listed below. 
</details>

### Get information about all orders

`/api/orders/info` route

<details>
<summary> :sunglasses: </summary>
This route is only accessible to users with the `admin` role
</details>

Send a `GET` request to the `/api/orders/info` route to get information about all the orders in the database. An example response is:

```json
{
  "status": true,
  "data": {
    "numberOfOrders": 8,
    "states": {
      "1": 5,
      "2": 1,
      "3": 3
    }
  }
}
```

### Create a new order

To create a new order, send a `POST` request to the `/api/orders/` route. The payload will contain an object with one key, `items` whose value will be an array of object(s). An example request is:

```json
{
  "items": [
    {
      "name": "Pizza name",
      "quantity": 1, // quantity as a number
      "price": 2500, // price as a number
      "size": "m" // size can be one of "s", "m", or "l" which is small, medium or large
    }
  ]
}
```

a corresponding response:

```json
{
  "status": true,
  "result": {
    "created_at": "2022-10-02T18:19:00.638Z",
    "state": 1,
    "total_price": 2500,
    "items": [
      {
        "name": "Sweet n Sour",
        "price": 2500,
        "size": "m",
        "quantity": 1,
        "item_id": "6339d61478609241a928e097"
      }
    ],
    "id": "6339d61478609241a928e096"
  }
}
```

### Get all orders

<details>
<summary> :sunglasses: </summary>
This route is only accessible to users with the `admin` role
</details>

Send a `GET` request to the `/api/orders/` route. An example response is:

```json
{
  "status": true,
  "orders": [
    {
      "created_at": "2022-09-29T03:02:27.314Z",
      "state": 1,
      "total_price": 16000,
      "items": [
        {
          "name": "Extravaganza",
          "price": 2500,
          "size": "m",
          "quantity": 1,
          "item_id": "63350ac3b3f4277ffcf6ca52"
        },
        {
          "name": "Jambalaya",
          "price": 7000,
          "size": "m",
          "quantity": 1,
          "item_id": "63350ac3b3f4277ffcf6ca53"
        },
        {
          "name": "Chicken Suya",
          "price": 6500,
          "size": "m",
          "quantity": 1,
          "item_id": "63350ac3b3f4277ffcf6ca54"
        }
      ],
      "id": "63350ac3b3f4277ffcf6ca51"
    },
    {
      "created_at": "2022-09-29T03:02:49.896Z",
      "state": 1,
      "total_price": 9500,
      "items": [
        {
          "name": "Extravaganza",
          "price": 2500,
          "size": "m",
          "quantity": 1,
          "item_id": "63350ad9b3f4277ffcf6ca58"
        },
        {
          "name": "Jambalaya",
          "price": 7000,
          "size": "m",
          "quantity": 1,
          "item_id": "63350ad9b3f4277ffcf6ca59"
        }
      ],
      "id": "63350ad9b3f4277ffcf6ca57"
    }
  ]
}
```

To sort the orders by total price, pass a query parameter `price` with a value of either `asc` or `desc` for ascending or descending order respectively. 

for ascending order, send a GET request to
```text
`/api/orders?price=asc`
```

for descending order, send a GET request to
```text
`/api/orders?price=desc`
```

To sort by date created in ascending or descending order, add a query parameter `date` with values of `asc` or `desc`

for ascending order, send a GET request to
```text
`/api/orders?date=asc`
```

for descending order, send a GET request to
```text
`/api/orders?date=desc`
```