Assignment:
From our last live class, we created a mini pizza ordering app. What we want you to do now is to add users and protect the routes
Tasks
1 add a user schema, the attributes/fields are up to you but the required fields/attributes are:
        a username,
        b password and
        c user_type.
        d user_type should be “admin” or “user”
2 using basic authentication, protect the order routes
3 add query params to the /orders route, we want to:
    a sort the total_price from ascending to descending
    b sort the date created from asc to desc
    c query by a state
4 add pagination to the GET /orders route

Bonus
Write integration tests for all the routes
Refactor the code such that we have routers for orders and users


