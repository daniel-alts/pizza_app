# pizza_app

## Tasks
1. add a user schema, the attributes/fields are up to you but the required fields/attributes are:
    - username,
    - password and
    - user_type.
    - user_type should be “admin” or “user”
  
2. using basic authentication, protect the order routes

3. add query params to the /orders route, we want to:
    - sort the total_price from ascending to descending
    - sort the date created from asc to desc
    - query by a state
    
4. add pagination to the GET /orders route

**Bonus**
1. Write integration tests for all the routes
2. Refactor the code such that we have routers for orders and users
