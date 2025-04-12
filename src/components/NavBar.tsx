
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <nav className="bg-white shadow-md py-4 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center mb-4 md:mb-0">
          <Logo size="small" />
        </div>
        
        {user && (
          <>
            <div className="flex flex-wrap justify-center space-x-0 space-y-2 md:space-y-0 md:space-x-4">
              <NavLink 
                to="/dashboard" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Dashboard
              </NavLink>
              <NavLink 
                to="/internships" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Internships
              </NavLink>
              <NavLink 
                to="/hiring" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Hiring
              </NavLink>
              <NavLink 
                to="/calendar" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Calendar
              </NavLink>
              <NavLink 
                to="/resources" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Resources
              </NavLink>
              <NavLink 
                to="/community" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Community
              </NavLink>
              <NavLink 
                to="/saved" 
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive 
                      ? 'bg-ipblue-100 text-ipblue-700' 
                      : 'text-gray-700 hover:bg-ipblue-50 hover:text-ipblue-600'
                  }`
                }
              >
                Saved
              </NavLink>
            </div>
            
            <div className="mt-4 md:mt-0">
              <Button variant="outline" onClick={handleLogout} className="border-ipblue-600 text-ipblue-600 hover:bg-ipblue-50">
                Logout
              </Button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
