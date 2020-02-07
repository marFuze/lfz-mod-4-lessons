# auth-with-jwt

Learn one way JWTs are used for user authentication.

### Before You Begin

Be sure to check out a new branch (from `master`) for this exercise. Detailed instructions can be found [**here**](../../guides/before-each-exercise.md). Then navigate to the `exercises/09-auth-with-jwt` directory in your terminal.

### Exercise

For this exercise, you will be working with some existing code. The goal will be to implement the use of JWTs and an auth middleware

Before you can begin, it's important to confirm that the PostgreSQL database server is running. The status should be **`online`**. You can check with the following command:

```bash
sudo service postgresql status
```

If your database server is not online, then you can start it with the following command:

```bash
sudo service postgresql start
```

#### Setup

1. Review the included files and folders to familiarize yourself with the structure of the project
1. Review the `package.json` file to see the included dependencies and available scripts
1. Install required dependencies from the `package.json`:
    - ```bash
        npm install
      ```
1. Create a new database named `jwtAuth` from the command line:
    - ```bash
        createdb jwtAuth
      ```
1. Import the provided `schema.sql` from the command line:
    - ```bash
        psql -d jwtAuth -f db/sql/schema.sql
      ```
1. Import the sample `data.sql` from the command line:
    - ```bash
        psql -d jwtAuth -f db/sql/data.sql
      ```
1. In the `config/` folder copy the `db.js.template` file and name the copy `db.js`.
    - Set the value of `connectionString` to `postgres://dev:lfz@localhost/jwtAuth`
1. In the `config/` folder copy the `jwt.js.template` file and name the copy `jwt.js`.
    - Set the value of `jwtSecret` to any random string of characters

#### Instructions

1. Read about [JWTs](https://en.wikipedia.org/wiki/JSON_Web_Token).
1. Read about the [jwt-simple](https://www.npmjs.com/package/jwt-simple) package.
1. In the `index.js` file find the `/api/sign-up` endpoint. Follow the comments in the code. The goal is to use `jwt-simple` to create a JWT that contains the users ID and a timestamp of when it was created then send the token back to the client.
    - Test the endpoint using [HTTPie](https://httpie.org/)
    - EXAMPLE:
    - ```bash
        http -v localhost:9000/api/sign-up name="Jim Bob" email="jim3@example.com" password="asdf1234"
      ```
1. In the `index.js` file find the `/api/sign-up` endpoint. Follow the comments in the code. The goal is to use `jwt-simple` to create a JWT that contains the users ID and a timestamp of when it was created then send the token back to the client.
    - Test the endpoint using [HTTPie](https://httpie.org/)
    - EXAMPLE:
    - ```bash
        http -v localhost:9000/api/sign-up name="Jim Bob" email="jim3@example.com" password="asdf1234"
      ```
      ![Sign Up Success](images/sign-up-success.png)
1. In the `index.js` file find the `/api/sign-in` endpoint. Follow the comments in the code. The goal is to use `jwt-simple` to create a JWT that contains the users ID and a timestamp of when it was created then send the token back to the client.
    - Test the endpoint using [HTTPie](https://httpie.org/)
    - EXAMPLE:
    - ```bash
        http -v localhost:9000/api/sign-in email="jim3@example.com" password="asdf1234"
      ```
      ![Sign In Success](images/sign-in-success.png)
1. Use HTTpie to test the `/api/products` endpoint.
    - ```bash
        http -v localhost:9000/api/products
      ```
    - You should get an auth error
1. In the `index.js` file find the `/api/products` endpoint and add the `auth` middleware to it.
1. In the `middleware/auth.js` file follow the comments in the code to complete the `auth` middleware.
    - Test the endpoint using [HTTPie](https://httpie.org/)
    - Use the token you got back from testing either `/api/sign-up` or `/api/sign-in`
    - EXAMPLE:
    - ```bash
        http -v localhost:9000/api/products access-token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInRzIjoxNTgxMDQwMjc0MTU3fQ.0q01yZAoDTSw2nSzGfeJEaSdZ1iaYSr3wVg_WMJWuH0"
      ```
      ![Product Success](images/product-success.png)

#### Bonus Challenge (optional)

1. Check if the token is expired.
    - If the token is more than 1 hour old, deny access.
    - You can use a shorter amount of time for testing like 1 minute.

### Submitting Your Solution

When your solution is complete, return to the root of your `lfz-mod-4-lessons` directory. Then commit your changes, push, and submit a Pull Request on GitHub. Detailed instructions can be found [**here**](../../guides/after-each-exercise.md).

### Quiz

- What does JWT stand for?
- What are JWTs used for?