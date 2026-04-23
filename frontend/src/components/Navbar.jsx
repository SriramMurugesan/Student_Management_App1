import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, Home, UserPlus, LogIn, UserPlus2, LogOut } from 'lucide-react';
import { authService } from '../services/authService';

/**
 * Responsive Navigation Bar with Glassmorphism effect.
 */
const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = authService.getCurrentUser();

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
    window.location.reload();
  };

  const navLinks = [
    { name: 'Home', path: '/', icon: Home },
    ...(user ? [
      { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
      { name: 'Add Student', path: '/add', icon: UserPlus },
    ] : []),
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="bg-primary-600 p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
              <GraduationCap className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-primary-900">
              VibeStack SMS
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.path;
              
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`flex items-center space-x-1.5 transition-all text-sm font-medium ${
                    isActive 
                      ? 'text-primary-600 border-b-2 border-primary-600 py-1' 
                      : 'text-gray-500 hover:text-primary-600 py-1'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!user ? (
              <>
                <Link to="/login" className="flex items-center space-x-1.5 text-sm font-medium text-gray-500 hover:text-primary-600 transition-colors">
                  <LogIn className="w-4 h-4" />
                  <span>Login</span>
                </Link>
                <Link to="/signup" className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors flex items-center space-x-1.5">
                  <UserPlus2 className="w-4 h-4" />
                  <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 mr-2 pr-4 border-r border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-gray-700">{user.name}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-1.5 text-sm font-medium text-gray-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Trigger (Placeholder) */}
          <div className="md:hidden flex items-center">
             <button className="text-gray-500 hover:text-primary-600">
                <LayoutDashboard className="w-6 h-6" />
             </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
