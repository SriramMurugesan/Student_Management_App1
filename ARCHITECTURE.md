# Project Architecture - VibeStack Student Management System

This document outlines the directory structure and core architectural patterns used in this application.

---

## 📂 Backend Structure (`/`)
The backend is built with **Node.js, Express, and MongoDB**, following a Clean Architecture pattern.

- **`src/server.js`**: Application entry point. Initializes the HTTP server and Socket.IO.
- **`src/app.js`**: Express configuration, middleware registration (CORS, JSON, Logger), and route mounting.
- **`src/models/`**: Mongoose schemas.
  - `student.model.js`: Student schema with Cloudinary image fields.
  - `User.js`: Authentication schema with BCrypt hashing.
- **`src/controllers/`**: Business logic.
  - `student.controller.js`: Handles CRUD and emits WebSocket events.
  - `auth.controller.js`: Handles JWT signup and login.
- **`src/routes/`**: API endpoint definitions.
- **`src/middlewares/`**: Custom logic executed before controllers.
  - `auth.middleware.js`: Protects routes with JWT verification.
  - `upload.middleware.js`: Handles Multer + Cloudinary file uploads.
- **`src/config/`**: External service configurations (DB, Cloudinary).
- **`src/utils/`**: Shared utilities (WebSocket manager, response handlers).

---

## 📂 Frontend Structure (`/frontend`)
The frontend is a **React (Vite)** single-page application.

- **`frontend/src/App.jsx`**: Main routing configuration and Auth protected routes.
- **`frontend/src/pages/`**: Full-page components.
  - `DashboardPage.jsx`: Real-time student list with search.
  - `FormPage.jsx`: New student registration and editing.
  - `Login.jsx` & `Signup.jsx`: Security pages.
- **`frontend/src/components/`**: Reusable UI components (Navbar, StudentCard, StudentForm).
- **`frontend/src/services/`**: API communication layers.
  - `studentService.js`: CRUD requests with Auth headers.
  - `authService.js`: Login, Signup, and Token management.

---

## 🐳 Containerization
- **`Dockerfile`**: Defines the backend environment.
- **`frontend/Dockerfile`**: A multi-stage Dockerfile that builds the React app and serves it via **Nginx**.
- **`docker-compose.yml`**: Orchestrates the frontend, backend, and network settings for local development.

---

## 🛠 Key Workflow Instructions

### 1. Adding a New API Feature
1. Create/Update the **Model** in `src/models/`.
2. Define the **Route** in `src/routes/`.
3. Implement the logic in the **Controller** in `src/controllers/`.
4. Create the **Service** in `frontend/src/services/`.

### 2. Protecting a Frontend Route
In `App.jsx`, wrap your component inside the `<PrivateRoute>` component:
```jsx
<Route path="/secure" element={<PrivateRoute><SecurePage /></PrivateRoute>} />
```

### 3. Adding a New Real-time Event
1. In the backend controller, use `getIO().emit('event:name', data)`.
2. In the frontend component (`useEffect`), add `socket.on('event:name', (data) => { ... })`.
