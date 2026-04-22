import React from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Users, ShieldCheck, Zap, ArrowRight } from 'lucide-react';
import Button from '../components/Button';

const LandingPage = () => {
  const features = [
    { 
      title: 'Real-time Tracking', 
      desc: 'Manage your students with instant updates and modern state management.', 
      icon: Zap 
    },
    { 
      title: 'Clean Architecture', 
      desc: 'Built with scalable patterns following professional engineering standards.', 
      icon: ShieldCheck 
    },
    { 
      title: 'Efficient CRUD', 
      desc: 'Streamlined Create, Read, Update, and Delete operations for maximum productivity.', 
      icon: Users 
    },
  ];

  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)]">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-medium mb-8 animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
            </span>
            <span>Production Ready Frontend</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6">
            Manage Students with <br />
            <span className="text-primary-600 italic">VibeStack</span> Precision.
          </h1>
          
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            The ultimate Student Management System built for modern educators. 
            Clean, fast, and architected for seamless backend integration.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button size="lg" className="w-full sm:w-auto h-14 px-8 space-x-2">
                <span>View Dashboard</span>
                <LayoutDashboard className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/add">
              <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 px-8 group">
                <span>Register Student</span>
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white px-4 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {features.map((f, i) => (
              <div key={i} className="flex flex-col items-center text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors">
                <div className="bg-primary-50 p-4 rounded-xl text-primary-600 mb-6">
                  <f.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
