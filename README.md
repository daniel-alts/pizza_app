1. Added a user schema with the following attributes:
- username (unique)
- password
- email (unique)
- phone number
- timestamps (createdAt and updatedAt)
  
2. Used basic authentication (username and password) to protect the order route. 
- Only the "admin" will be able to "Get" all orders
- An account must be created "Post" before order can be created, get, updated, or deleted 
- (SEE image FOLDER FOR BODY FORMAT)



3. Added query params (Sort) to the Get order route.

4. Added pagination to the Get order route

5. Refactor the code such that we have routers for orders and users


