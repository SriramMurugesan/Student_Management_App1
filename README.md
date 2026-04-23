# VibeStack Student Management System (SMS)

A production-ready MERN stack application with real-time features, secure authentication, and cloud-based file storage.

## 🚀 Key Features
- **Real-time Updates**: Powered by Socket.IO for instant UI synchronization.
- **Secure Authentication**: JWT-based auth with salted password hashing (BCrypt).
- **Profile Photo Uploads**: Direct integration with Cloudinary for cloud image storage.
- **Containerized**: Full Docker support for development and production.
- **Premium UI**: Modern Dashboard built with React, Tailwind CSS, and Lucide icons.

## 🛠 Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Socket.IO-Client, Axios, React Router.
- **Backend**: Node.js, Express, MongoDB (Mongoose), Socket.IO, Multer, Cloudinary SDK.
- **DevOps**: Docker, Docker Compose, Render.

## 📦 Getting Started

### 1. Clone & Install
```bash
git clone https://github.com/SriramMurugesan/Student_Management_App1.git
npm install
cd frontend && npm install
```

### 2. Environment Setup
Create a `.env` in the root directory:
```env
PORT=3000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret
```

Create a `.env` in the `frontend` directory:
```env
VITE_API_BASE_URL=http://localhost:3000/api/students
```

### 3. Run with Docker (Recommended)
```bash
docker-compose up --build
```

### 4. Run Locally
```bash
# Terminal 1: Backend
npm start

# Terminal 2: Frontend
cd frontend
npm run dev
```

## 🌍 Deployment
Detailed step-by-step deployment instructions for Render (Standard and Docker modes) can be found in **[DEPLOYMENT.md](./DEPLOYMENT.md)**.

## 📝 License
This project is licensed under the ISC License.