# pizza_app

## Tasks
- [x] add a user schema, the attributes/fields are up to you but the required fields/attributes are:
    - username,
    - password and
    - user_type.
    - user_type should be “admin” or “user”
  
- [x] using basic authentication, protect the order routes

- [x] add query params to the /orders route, we want to:
    - sort the total_price from ascending to descending
    - sort the date created from asc to desc
    - query by a state

- [x] add pagination to the GET /orders route

**Bonus**
- [ ] Write integration tests for all the routes
- [x] Refactor the code such that we have routers for orders and users