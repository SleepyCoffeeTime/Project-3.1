Welcome to the Inventory Management System!
This digital inventory application is designed to help inventory managers keep track of their current inventories and features all CRUD capabilities to Create, Read, Update, and Delete inventory entries. Additionally, it allows visitors to see all current inventory items from all inventory managers.


## Setting the application up:

This application relies on Docker to containerize the database, Node.js, Express, bcrypt, PostgreSQL, and Knex for the backend, as well as JavaScript, React, and Vite for the frontend.

In order to run the application after cloning and forking from the GitHub repository, do the following:

### 1. Start Docker Desktop
Make sure Docker Desktop is running on your computer.

### 2. Navigate to the project folder
```
cd Inventoryapp
```

### 3. Start the backend (API & Database)
```

docker-compose up -d

docker-compose exec api npx knex migrate:latest

docker-compose exec api npx knex seed:run
```

### 4. Start the frontend
```
cd frontend
npm install
npm run dev
```

## Access the Application

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## Demo Credentials

- Username: demo
- Password: password123


Enjoy! 
