import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import FormPage from './pages/FormPage';
import Login from './pages/Login';
import Signup from './pages/Signup';

/**
 * Protected Route Component
 */
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
};

/**
 * Main Application Component
 * Handles Routing and Global Layout.
 */
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 selection:bg-primary-100 selection:text-primary-900">
        <Navbar />
        
        <main className="animate-in fade-in duration-500">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            <Route path="/dashboard" element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            } />
            
            <Route path="/add" element={
              <PrivateRoute>
                <FormPage />
              </PrivateRoute>
            } />
            
            <Route path="/edit/:id" element={
              <PrivateRoute>
                <FormPage />
              </PrivateRoute>
            } />
            
            {/* Fallback Route */}
            <Route path="*" element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-6xl font-bold text-primary-600">404</h1>
                <p className="text-xl text-gray-500 mt-4">Page not found</p>
                <a href="/" className="mt-6 text-primary-600 hover:underline">Go back home</a>
              </div>
            } />
          </Routes>
        </main>

        <footer className="py-12 border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} VibeStack Student Management System. Built with React & Tailwind.
            </p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
