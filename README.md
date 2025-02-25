```
# Recipes App

This is a full-stack Node.js application for managing recipes. Users can register, log in, view, create, update, and delete recipes. The application uses MongoDB for data storage, JWT for authentication, and Express for routing.

## Features

- **User Authentication** (Register/Login with JWT)
- **Role-Based Access Control** (Admin and User roles)
- **Create, Read, Update, and Delete Recipes**
- Public access to view recipes
- Only creators or admins can update or delete recipes
- Input validation using `express-validator`
- Error handling with consistent error messages
- Responsive design for mobile and desktop

## Technologies Used

- **Backend**: Node.js and Express
- **Database**: MongoDB and Mongoose
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Input Validation**: express-validator
- **Frontend**: HTML, CSS, Vanilla JavaScript
- **Version Control**: GitHub

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/KosTyanka/web2_final.git
   cd web2_final
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

4. Run the project locally:
   ```bash
   node server.js
   ```

## API Endpoints

### Authentication

- **POST `/api/auth/register`**  
  Register a new user.  
  **Request Body**:
  ```json
  {
    "username": "yourUsername",
    "email": "yourEmail",
    "password": "yourPassword"
  }
  ```

- **POST `/api/auth/login`**  
  Authenticate a user and return a JWT.  
  **Request Body**:
  ```json
  {
    "email": "yourEmail",
    "password": "yourPassword"
  }
  ```

### User Management

- **GET `/api/users/profile`**  
  Retrieve the logged-in user's profile.  
  **Headers**: `Authorization: Bearer <token>`

- **PUT `/api/users/profile`**  
  Update the logged-in user's profile.  
  **Headers**: `Authorization: Bearer <token>`  
  **Request Body**:
  ```json
  {
    "username": "newUsername",
    "email": "newEmail"
  }
  ```

### Recipes

- **POST `/api/recipes`**  
  Create a new recipe (Authenticated users only).  
  **Headers**: `Authorization: Bearer <token>`  
  **Request Body**:
  ```json
  {
    "title": "Recipe Title",
    "ingredients": ["Ingredient1", "Ingredient2"],
    "instructions": "Recipe instructions"
  }
  ```

- **GET `/api/recipes`**  
  Retrieve all recipes (Public).

- **GET `/api/recipes/:id`**  
  Retrieve a specific recipe by its ID (Public).

- **PUT `/api/recipes/:id`**  
  Update a specific recipe (Only by creator or admin).  
  **Headers**: `Authorization: Bearer <token>`  
  **Request Body**:
  ```json
  {
    "title": "Updated Title",
    "ingredients": ["Updated Ingredient1"],
    "instructions": "Updated instructions"
  }
  ```

- **DELETE `/api/recipes/:id`**  
  Delete a specific recipe (Only by creator or admin).  
  **Headers**: `Authorization: Bearer <token>`

## Role-Based Access Control

- **User**: Can create, update, and delete their own recipes.
- **Admin**: Can update or delete any recipe.  
  To assign the admin role to a user, modify `adminSetup.js` as explained in the project documentation.

## Error Handling

Consistent error messages with status codes:
- **ERROR 404**: Not Found
- **ERROR 403**: Not Authorized
- **ERROR 500**: Server Error

**Example Error Response**:
```json
{
  "message": "ERROR 403: Not authorized to delete this recipe"
}
```

## Contributors

- **Zhaslan Aubakirov**

## License

This project is licensed under the **MIT License**.
```
