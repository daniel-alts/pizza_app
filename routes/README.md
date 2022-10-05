# ROUTES

This document outlines the request/response structure for the endpoints

## User Routes

### Create a user

To create a user, send a `POST` request to the `/api/users/register` route. The body will contain a json with properties indicated as following:

```json
{
  "username": "username",
  "password": "user password"
}
```

### Get all users

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

Send a `GET` request to the `/api/orders/` route. 

By default, the api returns the first page with a limit of 5 orders per page. In order to change the page or increase/decrease the limit, you may pass addition query parameters `page` and `limit` respectively.

An example response is:

```json
{
  "status": true,
  "data": {
    "currentPage": 1,
    "nextPage": {
      "page": 2,
      "limit": 5
    },
    "totalPages": 2,
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
      },
      {
        "created_at": "2022-09-29T03:02:56.271Z",
        "state": 1,
        "total_price": 9500,
        "items": [
          {
            "name": "Veggie Supreme",
            "price": 3500,
            "size": "m",
            "quantity": 2,
            "item_id": "63350ae0b3f4277ffcf6ca5d"
          },
          {
            "name": "Naija Fiesta",
            "price": 2500,
            "size": "m",
            "quantity": 1,
            "item_id": "63350ae0b3f4277ffcf6ca5e"
          }
        ],
        "id": "63350ae0b3f4277ffcf6ca5c"
      },
      {
        "created_at": "2022-09-29T03:03:08.785Z",
        "state": 1,
        "total_price": 9000,
        "items": [
          {
            "name": "Pepperoni Supreme",
            "price": 4500,
            "size": "m",
            "quantity": 2,
            "item_id": "63350aecb3f4277ffcf6ca62"
          }
        ],
        "id": "63350aecb3f4277ffcf6ca61"
      },
      {
        "created_at": "2022-09-30T21:44:58.209Z",
        "state": 2,
        "total_price": 6500,
        "items": [
          {
            "name": "Ghost Pancho",
            "price": 6500,
            "size": "l",
            "quantity": 1,
            "item_id": "6337635a546b3674d0600f60"
          }
        ],
        "id": "6337635a546b3674d0600f5f"
      }
    ]
  }
}
```

To view results from page 3 with a limit of 2 orders per page, send a request to: 

```text
/api/orders?page=3&limit=2
```
the corresponding response will be 

```json
{
  "status": true,
  "data": {
    "previousPage": {
      "page": 2,
      "limit": 2
    },
    "currentPage": 3,
    "nextPage": {
      "page": 4,
      "limit": 2
    },
    "totalPages": 5,
    "orders": [
      {
        "created_at": "2022-09-30T21:44:58.209Z",
        "state": 2,
        "total_price": 6500,
        "items": [
          {
            "name": "Ghost Pancho",
            "price": 6500,
            "size": "l",
            "quantity": 1,
            "item_id": "6337635a546b3674d0600f60"
          }
        ],
        "id": "6337635a546b3674d0600f5f"
      },
      {
        "created_at": "2022-10-01T04:26:17.560Z",
        "state": 1,
        "total_price": 6500,
        "items": [
          {
            "name": "Chicken Tripple Decker",
            "price": 6500,
            "size": "l",
            "quantity": 1,
            "item_id": "6337c169b78508f4239d8bfe"
          }
        ],
        "id": "6337c169b78508f4239d8bfd"
      }
    ]
  }
}
```

To sort the orders by total price, pass a query parameter `price` with a value of either `asc` or `desc` for ascending or descending order respectively. 

for ascending order, send a GET request to
```text
/api/orders?price=asc
```

for descending order, send a GET request to
```text
/api/orders?price=desc
```

To sort by date created in ascending or descending order, add a query parameter `date` with values of `asc` or `desc`

for ascending order, send a GET request to
```text
/api/orders?date=asc
```

for descending order, send a GET request to
```text
/api/orders?date=desc
```
### Get order by ID

To get an order by it's ID, send a `GET` request to the `/api/orders/order_id` route where `order_id` is the ID of the order. For example, a request to:

```text
/api/orders/63350ad9b3f4277ffcf6ca57
```

will provide a response like:
```json
{
  "status": true,
  "data": {
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
}
```
### Update order state by ID

To update the state of an order by it's ID, send a `PATCH` request to the `/api/orders/order_id` route where `order_id` is the ID of the order. The body of the request should contain an object with a key of `state` and a value as an integer. To update the state of order with ID of '63350ad9b3f4277ffcf6ca57' from `1` to `2`, send a request to:

```text
/api/orders/63350ad9b3f4277ffcf6ca57
```

with a payload of

```json
{
  "state": 2
}
```

### Delete order by ID

To delete an order by it's ID, send a `DELETE` request to the `/api/orders/order_id` route where `order_id` is the ID of the order.
