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
