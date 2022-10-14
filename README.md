1. Added a user schema with the following attributes:
- username (unique)
- password
- email (unique)
- phone number
- timestamps (createdAt and updatedAt)

2. Used Passport local-strategy to implement JWT authorization to protect the order route

3. Added query params (Sort) to the Get order route.

4. Added pagination to the Get order route

5. Refactor the code such that we have routers for orders and users


