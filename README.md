# pizza_app

This is an [altschool](altschool.com) backend (nodejs) task.
Pizza app is an app whereby only authenticated users are allowed to access the order route (i.e get the list of available pizzas from the database , order pizza, etc).

### In this app, i implemented the following:

- Connected mongoose to my local host
- Created the user and order model by defining the user and order schemas respectively
- Build their respective APIs and implemented CRUD functionality
- defined a middleware for basic authentication of users inorder to protect the order route
- implemented sorting, query by state and pagination on the order route
- Refactored the code by creating a controller folder(containing the user and order files) where i placed all response handlers and also created separate files for the order and user routes
- Carried out integration testing on all routes using supertest
- Added signup and login routes
- Implemented JWT authentication to protect the order route

![pizzaAppTesting](https://user-images.githubusercontent.com/95231247/194046114-163a4246-8b78-4c2f-8281-8cd99ae29806.png)

![User pizzaAppModel](https://user-images.githubusercontent.com/95231247/194046391-f1affc6b-f0b5-4391-8393-df04b2a1d250.png)
