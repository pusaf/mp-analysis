# mp-analysis
A site to generate and analyze osu mp statistics.


### Setup
1. Clone the repository:

```sh
git clone https://github.com/pusaf/mp-analysis.git
cd mp-analysis
```

2. Setup the database:

    1. Install PostgreSQL if you don't already have it installed at <https://www.postgresql.org/download>.

    2. Open a terminal and enter the PostgreSQL shell by running psql and then create a database called mp_analyzer using:
    ```sql
    CREATE DATABASE mp_analyzer;
    ```
    3. Create a user for your application using your own username and password:
    ```sql
    CREATE USER your_username WITH PASSWORD 'your_password';
    ```
    4. Give the user access to the database:
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE mp_analyzer TO your_username;
    ```
    5. You can now leave psql:
    ```sql
    \q
    ```

3. Run the setup script to install dependencies and generate a .env file:

```sh
npm run setup
```

4. Configure the .env file in backend. It should currently look like this:
```
DATABASE_URL=postgresql://<your_username>:<your_password>@localhost:5432/mp_analyzer
OSU_CLIENT_ID=
OSU_CLIENT_SECRET=
```
Replace the bracketed fields and add your osu! OAuth client info (this can be found/created in your osu! settings => OAuth => New OAuth Application).

5. Setup the table by running:
```sh
npm run setup:db
```

### To Run the Application

Open two terminals at the root. Run the backend application:
```sh
cd backend
node src/app.js
```

And then run the frontend application on the second terminal:
```sh
cd frontend
npm run dev
```

Then visit <localhost:5173> to see the application.
