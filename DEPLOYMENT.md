# Deployment Guide - Render

This guide provides step-by-step instructions for deploying the Student Management App to **Render**.

---

## Prerequisites
1. A **GitHub** account with this repository pushed.
2. A **MongoDB Atlas** account (for production database).
3. A **Cloudinary** account (for image uploads).
4. A **Render** account.

---

## Method 1: Standard Deployment (Recommended for Speed)

### 1. Deploy the Backend (Web Service)
1. In Render Dashboard, click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. **Configuration**:
   - **Name**: `student-mgmt-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. **Environment Variables**:
   Click **Advanced** > **Add Environment Variable**:
   - `PORT`: `3000`
   - `NODE_ENV`: `production`
   - `MONGO_URI`: (Your MongoDB Atlas connection string)
   - `JWT_SECRET`: (A random secure string)
   - `JWT_EXPIRES_IN`: `7d`
   - `CLOUDINARY_CLOUD_NAME`: (Your Cloudinary Cloud Name)
   - `CLOUDINARY_API_KEY`: (Your Cloudinary API Key)
   - `CLOUDINARY_API_SECRET`: (Your Cloudinary API Secret)
5. Click **Create Web Service**.

### 2. Deploy the Frontend (Static Site)
1. In Render Dashboard, click **New +** > **Static Site**.
2. Connect the same GitHub repository.
3. **Configuration**:
   - **Name**: `student-mgmt-frontend`
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/dist`
4. **Environment Variables**:
   - `VITE_API_BASE_URL`: (The URL of your backend Web Service, e.g., `https://student-mgmt-backend.onrender.com/api/students`)
5. Click **Create Static Site**.

---

## Method 2: Docker Deployment (Recommended for Consistency)

### 1. Deploy the Backend (Docker)
1. Click **New +** > **Web Service**.
2. Connect your repository.
3. Under **Runtime**, select **Docker**.
4. Set **Docker Context** to `.` (the root).
5. Set **Dockerfile Path** to `./Dockerfile`.
6. **Environment Variables**: Same as Method 1.

### 2. Deploy the Frontend (Docker)
1. Click **New +** > **Web Service**.
2. Connect your repository.
3. Under **Runtime**, select **Docker**.
4. Set **Docker Context** to `./frontend` and **Dockerfile Path** to `./frontend/Dockerfile`.
5. **Environment Variables**: Same as Method 1.

---

## Common Issues & Fixes

### 1. CORS Errors
If your frontend cannot talk to the backend:
- Ensure `VITE_API_BASE_URL` in the frontend config *exactly* matches the backend URL.
- Check the `origin` setting in `src/app.js` (CORS middleware). For production, it should be your frontend URL.

### 2. MongoDB Connection Timeout
- Ensure you have **Whitelisted all IP addresses** (`0.0.0.0/0`) in your MongoDB Atlas Network Access settings, as Render's outbound IPs are dynamic.

### 3. Image Upload Fails
- Verify your Cloudinary API credentials in the Render Environment Variables.

### 4. WebSocket Connection Issues
- Socket.IO requires a persistent connection. Render Web Services support this by default, but ensure you are using `https://` in your frontend connection URL.
