This folder contains the two collections I used during the duration of this assignment.

I exported them with the two commands:
-   ```sh
    mongoexport --uri=$MONGO_URI -c=users  -o=pizza_app_mongoexport_db/users
    ```
-   ```sh
    mongoexport --uri=$MONGO_URI -c=orders  -o=pizza_app_mongoexport_db/orders
    ```

To import the data, replace `mongoexport` with `mongoimport` in the code above