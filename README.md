# Pizza App
This is an api for a pizza app

---

## Requirements
1. User should be able to register 
2. User should be able to login with Passport using JWT
3. Implement basic auth
4. User should be able to get orders
5. Users should be able to create orders
6. Users should be able to update and delete orders
7. Test application
---
## Setup
- Pull this repo
- Run `npm install`
- Update **sample_env** with mongo uri and jwt secret  
and rename to **.env**
- Run `npm run dev` to start server

---
## Base URL
- http://localhost:3334/


## Models
---

### User
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  username |  string |  required |
|  firstname | string  |  optional|
|  lastname  |  string |  optional  |
|  email     | string  |  optional |
|  password |   string |  required  |
|  user_type |  string |  required, default: user, enum: ['user', 'admin'] |


### Order
| field  |  data_type | constraints  |
|---|---|---|
|  id |  string |  required |
|  created_at |  date |  required |
|  state | number  |  required, default:1, enum: [1, 2, 3, 4]|
|  total_price  |  number |  required  |
|  items     | array  |  required |
|  item.name |   string |  required  |
|  item.price |  number |  required |
|  item.size |  string |  required, default: 'm', enum: ['m', 's', 'l'] |
|  item.quantity |  number |  required, default: 1, min: 1|



# APIs
---

## Create User

- Route: /user
- Method: POST
- Body: 
```json
{
    "username": "jwtuser2",
    "password": "admin",
    "user_type": "admin"
}
```

- Responses

Success
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNjFhNDk5NmZhZmE3OTQ2NGRiNzcyNCIsInVzZXJuYW1lIjoiand0dXNlcjIiLCJ1c2VyX3R5cGUiOiJhZG1pbiIsImlhdCI6MTY2NzM0MzUxM30.a8qkgQduei0Edgaf7_kk6O-ibP5yzouWolaVyOxGy5E"
}
```
---
## Get all users

- Route: /user/
- Method: GET

- Responses

Success
```json
[
    {
        "_id": "6346ecd98251362259942058",
        "username": "test1",
        "password": "$2b$10$MV1eQnDKIr0wtHCeqF3cL.ACQRRCxC.HN58fuzkJKuW3jvt2i852S",
        "user_type": "user",
        "__v": 0
    },
    {
        "_id": "6346f1e06aabba3a1cb49a59",
        "username": "admin",
        "password": "$2b$10$3qmW07IZZyIyuPOUirKCQOW/5J.i35nYz.F45msrUdtFBHaz5PUPm",
        "user_type": "admin",
        "__v": 0
    },
    {
        "_id": "6346f1eb6aabba3a1cb49a5b",
        "username": "admin1",
        "password": "$2b$10$hoocR1I9a4qbCopXVpgL6.8P.O8t0Z5vwHZy6YUEn3gB1NsAVhkNi",
        "user_type": "admin",
        "__v": 0
    },
    {
        "_id": "63487bc99383c75303601dc1",
        "username": "jwtuser1",
        "password": "$2b$10$FueorNF4/ZpctRrElNzOiOeQIQMRHwR/Y9uOX1ZDqChJ48JFZNOIW",
        "user_type": "admin",
        "__v": 0
    },
]
```

---
## Create Order

- Route: /order
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body: 
```json
{
    "order": {
        "items": [
            {
                "name": "kentucky",
                "price": 15,
                "quantity": 10
            },
            {
                "name": "dominoes",
                "price": 10,
                "quantity": 20
            },
            {
                "name": "chicken",
                "price": 40,
                "quantity": 20
            },
            {
                "name": "beef",
                "price": 50,
                "quantity": 2
            }
        ]
    }
}
```

- Responses

Success
```json
{
    "status": true,
    "order": {
        "state": 1,
        "items": [
            {
                "name": "kentucky",
                "price": 15,
                "size": "m",
                "quantity": 10,
                "_id": "6361a895582110089f5d75fc"
            },
            {
                "name": "dominoes",
                "price": 10,
                "size": "m",
                "quantity": 20,
                "_id": "6361a895582110089f5d75fd"
            },
            {
                "name": "chicken",
                "price": 40,
                "size": "m",
                "quantity": 20,
                "_id": "6361a895582110089f5d75fe"
            },
            {
                "name": "beef",
                "price": 50,
                "size": "m",
                "quantity": 2,
                "_id": "6361a895582110089f5d75ff"
            }
        ],
        "_id": "6361a895582110089f5d75fb",
        "created_at": "2022-11-01T23:15:33.730Z",
        "__v": 0,
        "total_price": 1250
    }
}
```
---
## Update Order

- Route: /order/:id
- Method: POST
- Header
    - Authorization: Bearer {token}
- Body:
```json
{
    "state": 2
}

```
- Responses

Success
```json
{
    "status": true,
    "order": {
        "_id": "632ddc75f656143ab871b85d",
        "state": 2,
        "items": [
            {
                "name": "peperoni",
                "price": 10,
                "size": "m",
                "quantity": 1,
                "_id": "632ddc75f656143ab871b85e"
            },
            {
                "name": "beef",
                "price": 20,
                "size": "m",
                "quantity": 1,
                "_id": "632ddc75f656143ab871b85f"
            }
        ],
        "created_at": "2022-09-23T16:19:01.859Z",
        "__v": 0,
        "total_price": 30
    }
}
```
---

## Get all orders

- Route: /order
- Method: GET  
**Note**: Best viewed in a browser
- Query params: 
    - page (default: 1)
    - state (1, 2, 3, 4)
    - total_price (asc && desc)
    - created_at (asc && desc)
- Responses

Success
```
Best viewed on a browser
```
---

...

## Contributor
- Ibukun Ekunwe


## Notes
Looking back at my pizza_app project I realize I made a ton of 
mistakes (almost weird to think *I wrote this*). Anyway, I made a ton of 
improvements on the blogging_api assignment and it's kinda too late to redo this one anyway.

For instance I got the paging feature *better* in the blogging_api than I did
in this one.