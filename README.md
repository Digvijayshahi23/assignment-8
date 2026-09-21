# Full Stack To-Do List Application

This project is a complete full-stack To-Do list application built with a Node.js/Express backend and a React/Vite frontend. It meets all the requirements of the assignment, including a structured architecture, API integration, and premium Vanilla CSS styling.

## Table of Contents
1. [Architecture](#architecture)
2. [Prerequisites](#prerequisites)
3. [Environment Variables](#environment-variables)
4. [Setup & Running](#setup--running)
5. [API Endpoints](#api-endpoints)
6. [Challenges Addressed](#challenges-addressed)

## Architecture

### Backend (Node.js + Express + MongoDB)
The backend follows a robust `Controller -> Service -> Route` structure for better maintainability and code organization:
- **Routes:** Handle routing definitions.
- **Controllers:** Handle HTTP requests and responses.
- **Services:** Contain the business logic and database interactions.
- **Models:** Define the Mongoose schema for the database.

### Frontend (React + Vite)
The frontend is initialized using Vite for fast builds and hot module replacement. It uses Axios for API requests to the backend and React Icons (Lucide) for clean SVGs.
- **Premium UI:** Uses dynamic custom CSS (`index.css`) with hover effects, micro-animations, and a responsive layout without relying on bulky frameworks.

## Prerequisites
- Node.js installed on your machine.
- MongoDB installed and running locally, or a MongoDB Atlas URI.

## Environment Variables

Create a `.env` file in the `backend` directory (one is already provided) with the following content:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/todoapp
```

**Note:** If you are using a cloud MongoDB instance, replace the `MONGODB_URI` with your connection string.

## Setup & Running

You need two terminal windows to run both the backend and frontend simultaneously.

### 1. Start the Backend Server

Navigate to the `backend` directory, install dependencies, and start the server:

```bash
cd backend
npm install
node server.js
```
*The server will start on `http://localhost:5000` and connect to MongoDB.*

### 2. Start the Frontend App

Open a new terminal window, navigate to the `frontend` directory, install dependencies, and start the Vite dev server:

```bash
cd frontend
npm install
npm run dev
```
*The frontend will run on a local URL (e.g., `http://localhost:5173`). Open that URL in your browser.*

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/todos?search=` | Get all tasks (supports optional search query) |
| `POST` | `/api/todos` | Create a new task |
| `PUT` | `/api/todos/:id` | Update task details |
| `PATCH` | `/api/todos/:id/status` | Update task status ('pending', 'completed') |
| `DELETE` | `/api/todos/:id` | Delete a task |

## Challenges Addressed

1. **Clean Architecture in Express:** Separating business logic into a `Service` layer keeps the `Controller` clean, making it easier to maintain and test down the line.
2. **Search Integration:** Search was implemented directly on the backend via a MongoDB regex query (`$regex`) which is more efficient than filtering everything on the client-side, especially as the list grows.
3. **Handling CORS:** Since the backend runs on port 5000 and Vite runs on a different port, CORS errors were mitigated by installing and applying the `cors` middleware in Express.
4. **State Management in React:** Simple component state `useState` was used effectively. For a larger app, Redux or Context API might be needed, but local state paired with Axios calls is perfectly optimal for this use case. 
5. **Modern Styling:** Built custom Vanilla CSS leveraging Flexbox, CSS variables, and keyframe animations to achieve a "premium" dynamic UI without the overhead of heavy component libraries.

## Deployment Instructions

As requested in the assignment:

### Backend (Render)
1. Push this repository to GitHub.
2. Create a new Web Service on Render and connect the repository.
3. Set the Root Directory to `backend`, Build Command to `npm install`, and Start Command to `node server.js`.
4. Add the `MONGODB_URI` environment variable.

### Frontend (Netlify)
1. On Netlify, add a new site and connect the repository.
2. Set the Base directory to `frontend`.
3. Set the Build command to `npm run build` and Publish directory to `dist`.
4. (Optional) If you have a deployed backend URL, update the `API_URL` inside `frontend/src/services/api.js` before building.
# assignment-8
