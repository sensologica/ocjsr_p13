# Argent Bank

![artem-barinov_argent-bank_opt](https://github.com/user-attachments/assets/267a4633-6b9a-4cf1-95de-297d29b4e723)

_This was project 11 out of 12 that I completed as part of the OpenClassrooms JavaScript & React course I took in 2023-2024._

## About

### Project goals

* Build a responsive frontend UI based on a provided Figma mockup. Use HTML, CSS, JavaScript, and React
* Implement login/logout functionality
  * Implement a frontend login form with input validation
  * Implement protected routes using React Router
  * Authorize access to protected resources to users who are registered in the app's MongoDB database and have provided valid credentials
  * Use JSON Web Tokens stored in local storage for continued authorization
  * On logout, clear JSON Web Tokens from local storage to revoke access
* Pull user data from a provided backend API written in Express, connected to a MongoDB database, and documented on Swagger
* Use Redux and Redux Toolkit to manage the application's state
* Allow logged-in users to modify their name and save the changes. Validate inputs and, if valid, write the changes to the MongoDB database.
* Use YAML and Swagger to design a Transactions API for performing CRUD operations on transactions

## Project specs
* Platform: Web (responsive)
* Tools: HTML, CSS, JavaScript, React, React Router, Redux, Redux Toolkit, MongoDB, Swagger, YAML, JSON, JWT
* Timeline: 1 month
* Skills:
  * Responsive HTML and CSS implementation based on design mockup
  * State management with Redux
  * Reading from and writing to MongoDB database via backend API
  * Protected routes, login/logout functionality, authentication with JWT (JSON Web Tokens), storing tokens in local storage
  * Front-end form validation
  * HTTP requests
  * API consumption
  * API design and documentation in Swagger

## How to install and run this application

### Cloning the repository

Clone [this repository](https://github.com/sensologica/argent-bank). The repository is subdivided into 2 parts: backend and frontend. 

### Prerequisites

The backend API requires:
* [Node.js v12](https://nodejs.org/en/download)
* [MongoDB Community Edition 7.0](https://www.mongodb.com/docs/v7.0/tutorial/install-mongodb-on-os-x/)

Make sure to install these tools before continuing.

### Spinning up the backend API

From the root of the project, navigate to the backend folder:
```bash
cd backend
```

Make sure that you are using Node v12. If you are managing Node with nvm, run:
```bash
nvm use 12
```

Start the backend server:
```bash
npm run dev:server
```

The API will be served at:
```text
http://localhost:3001
```

API documentation can be found at:
```text
http://localhost:3001/api-docs
```

### Prepopulating the MongoDB database with default users

You only need to do this once, when you first set up the application. The below commands will run a script that will create two users in the database.

In a new terminal window, from the root of the project, navigate to the backend folder:
```bash
cd backend
```

Make sure that you are using Node v12. If you are managing Node with nvm, run:
```bash
nvm use 12
```

Run the script:
```bash
npm run populate-db
```

If all went well, the database should now have two users:

| Login          | Password  |
|----------------|-----------|
|tony@stark.com  |password123|
|steve@rogers.com|password456|

You can use these credentials to log in.

### Starting the frontend

In a new terminal window, from the root of the project, navigate to the frontend folder:
```bash
cd frontend
```

Start the server:
```bash
npm run dev
```

The front-end will be served at:
```text
http://localhost:5173
```

### What to try?

Here are some things you can try to test-drive the app:
- [ ] Click on the "Sign in" button to navigate to a login form
- [ ] Try to login with invalid credentials or incorrectly formatted inputs to observe how the validation reacts
- [ ] Log in with valid credentials to access a user's profile. (Use the login and password information of one of the default users described in section "Prepopulating the MongoDB database with default users".)
- [ ] Try to change the user name to an empty string and click "Save". You will see an error.
- [ ] Now try to change the user name to a valid name and click "Save". The changes will be written to the database. Now if you log out and log back in, your changes will persist.
- [ ] While logged in, open your browser's DevTools and navigate to the "Application" tabm then to "Local storage" section to observe that a JWT token (`jwt-token`) is stored there. Delete the token and refresh the page. Because the token is now absent, you will lose your authorized status and will be logged out and taken back to the login page.
- [ ] Alternatively, instead of deleting the JWT token from local storage manually, simply log out and the JWT token will be removed, requiring that you provide your credentials again to log in.
- [ ] While logged out, navigate to a protected route to see how it redirects you to the login page. Try going to `http://localhost:5173/profile` and you will be redirected to the login page to provide credentials and get access to protected resources.
