# Task Management API

This document outlines the REST API for a task management system built with Node.js and MongoDB. It enables users to create, manage, and share tasks organized into categories.

## Installation

1. Clone the GitHub repository to your local machine.
2. Install dependencies using `npm install` or `yarn install`.
3. Configure the MongoDB connection in the application settings (e.g., in a `.env` file).
4. Run the application using `nodemon` (make sure you have nodemon installed globally: `npm install -g nodemon`).

## User Authentication

The API uses basic HTTP authentication for user authorization.  To use the API, you first need to obtain a JWT token by authenticating with your username and password.

**Authentication Endpoint:**

- **Method:** `POST`
- **URL:** `/auth`
- **Request Body:**
    - `userName`: (String)
    - `password`: (String)

**Successful Response:**
- **Status code:** 200 OK
- **Content-Type:** application/json
- **Response Body:**
    - `token`: (String) - JWT token for future requests

**Failed Response:**
- **Status code:** 401 Unauthorized
- **Content-Type:** application/json
- **Response Body:**
    - `error`: (String) - Error message (e.g., "Invalid credentials")

## Endpoints

### Users Endpoints

**1. Sign Up:**

- **Method:** `POST`
- **URL:** `/users/signUp`
- **Request Body:**
    - `userName`: (String)
    - `password`: (String)
    - `email`: (String)

**Successful Response:**
- **Status code:** 201 Created
- **Content-Type:** application/json
- **Response Body:**
    - `message`: (String) - Success message (e.g., "User created successfully")

**Failed Response:**
- **Status code:** 400 Bad Request
- **Content-Type:** application/json
- **Response Body:**
    - `error`: (String) - Error message (e.g., "Duplicate email")

**2. Sign In:**

- **Method:** `POST`
- **URL:** `/users/signIn`
- **Request Body:**
    - `userName`: (String)
    - `password`: (String)

**Successful Response:**
- **Status code:** 200 OK
- **Content-Type:** application/json
- **Response Body:**
    - `token`: (String) - JWT token for future requests
    - `user`: (Object) - User information (id, userName, email)

**Failed Response:**
- **Status code:** 401 Unauthorized
- **Content-Type:** application/json
- **Response Body:**
    - `error`: (String) - Error message (e.g., "Invalid credentials")

### Category Endpoints

**1. Create Category:**

- **Method:** `POST`
- **URL:** `/category/createCategory`
- **Authentication:** Required
- **Request Body:**
    - `name`: (String)

**Successful Response:**
- **Status code:** 201 Created
- **Content-Type:** application/json
- **Response Body:**
    - `id`: (String) - Category ID

**Failed Response:**
- **Status code:** 400 Bad Request
- **Content-Type:** application/json
- **Response Body:**
    - `error`: (String) - Error message (e.g., "Invalid category name")

**2. Get All Categories:**

- **Method:** `GET`
- **URL:** `/category/getAllCategories`
- **Authentication:** Required
- **Response Body:**
    - An array of category objects:
        - `id`: (String)
        - `name`: (String)

**3. Get Category By ID:**

- **Method:** `GET`
- **URL:** `/category/getCategoryById/:id`
- **Authentication:** Required
- **Response Body:**
    - `id`: (String)
    - `name`: (String)

**4. Update Category By ID:**

- **Method:** `PUT`
- **URL:** `/category/updateCategoryById/:id`
- **Authentication:** Required
- **Request Body:**
    - `name`: (String)

**5. Delete Category By ID:**

- **Method:** `DELETE`
- **URL:** `/category/deleteCategoryById/:id`
- **Authentication:** Required

### Task Endpoints

**1. Create Task:**

- **Method:** `POST`
- **URL:** `/task/createTask`
- **Authentication:** Required
- **Request Body:**
    - `title`: (String)
    - `description`: (String) (optional)
    - `dueDate`: (Date) (optional)
    - `completed`: (Boolean) (optional)
    - `category`: (ObjectId) (required)
    - `assignedTo`: (ObjectId) (optional)
    - `taskScope`: (String) - "public" or "private" (required)
    - `task`: (Array of String) (optional) - For list tasks
    - `taskType`: (String) - "text" or "list" (optional)

**Successful Response:**
- **Status code:** 201 Created
- **Content-Type:** application/json
- **Response Body:**
    - `id`: (String) - Task ID

**Failed Response:**
- **Status code:** 400 Bad Request
- **Content-Type:** application/json
- **Response Body:**
    - `error`: (String) - Error message (e.g., "Invalid task title")

**2. Get All Tasks:**

- **Method:** `GET`
- **URL:** `/task/getAllTasks`
- **Authentication:** Required
- **Response Body:**
    - An array of task objects:
        - `id`: (String)
        - `title`: (String)
        - `description`: (String)
        - `dueDate`: (Date)
        - `completed`: (Boolean)
        - `category`: (ObjectId)
        - `assignedTo`: (ObjectId)
        - `taskScope`: (String)
        - `task`: (Array of String)
        - `taskType`: (String)

**3. Get Task By ID:**

- **Method:** `GET`
- **URL:** `/task/getTaskById/:id`
- **Authentication:** Required
- **Response Body:**
    - Task object (similar to the task object in the Get All Tasks response)

**4. Update Task By ID:**

- **Method:** `PUT`
- **URL:** `/task/updateTaskById/:id`
- **Authentication:** Required
- **Request Body:** (any of the fields from the Create Task endpoint are optional)

**5. Delete Task By ID:**

- **Method:** `DELETE`
- **URL:** `/task/deleteTaskById/:id`
- **Authentication:** Required

## Error Handling

- **400 Bad Request:** Invalid request format or missing required fields.
- **401 Unauthorized:** Unauthorized access, missing authentication.
- **403 Forbidden:** Unauthorized action, insufficient permissions.
- **404 Not Found:** Requested resource not found.
- **500 Internal Server Error:** Internal server error.

## Example Usage

You can use the Postman collection to interact with the API. [Here is the Postman link](https://documenter.getpostman.com/view/34440263/2sA3e5f94T) 

This API allows users to manage their tasks effectively, organizing them into categories and controlling their visibility. It provides CRUD operations for both categories and tasks, ensuring flexible and comprehensive task management. 