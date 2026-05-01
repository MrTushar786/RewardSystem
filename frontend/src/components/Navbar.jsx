import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Building2, Moon, Sun, LayoutDashboard, Users, BarChart3, Gift, Briefcase, FileText, Bell, Search, ChevronDown } from 'lucide-react';

const Navbar = ({ user, activeTab, setActiveTab }) => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  const NavLink = ({ icon: Icon, text, active }) => (
    <button 
      onClick={() => setActiveTab && setActiveTab(text)}
      className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${active ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-400' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-dark-card dark:hover:text-white'}`}>
      {Icon && <Icon className="w-4 h-4" />}
      <span>{text}</span>
    </button>
  );

  return (
    <nav className="bg-white dark:bg-dark-bg shadow-sm border-b border-gray-200 dark:border-dark-border sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-6">
            <div className="flex items-center cursor-pointer mr-2" onClick={() => navigate('/dashboard')}>
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center mr-2 shadow-sm">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-gray-900 dark:text-white tracking-tight">T-System</span>
            </div>
            
            <div className="hidden lg:flex space-x-1">
              <NavLink text="Dashboard" active={activeTab === 'Dashboard' || !activeTab} />
              <NavLink text="Employees" active={activeTab === 'Employees'} />
              <NavLink text="Analytics" active={activeTab === 'Analytics'} />
              <NavLink text="Rewards" active={activeTab === 'Rewards'} />
              <NavLink text="Departments" active={activeTab === 'Departments'} />
              <NavLink text="Reports" active={activeTab === 'Reports'} />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center relative mr-2">
              <Search className="w-4 h-4 text-gray-400 absolute left-3" />
              <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 w-48 transition-all dark:text-white" />
            </div>

            <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 relative rounded-full hover:bg-gray-50 dark:hover:bg-dark-card transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-dark-bg"></span>
            </button>

            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full text-gray-400 hover:text-indigo-600 hover:bg-gray-50 dark:hover:bg-dark-card dark:hover:text-indigo-400 transition-colors"
              title="Toggle Dark Mode"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>

            <div className="h-5 w-px bg-gray-200 dark:bg-dark-border mx-1"></div>
            
            <div className="flex items-center cursor-pointer hover:bg-gray-50 dark:hover:bg-dark-card p-1.5 rounded-lg transition-colors group">
              <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-500/30">
                {user?.name?.charAt(0) || 'U'}
              </div>
              <div className="hidden md:flex flex-col ml-3 mr-1">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-tight">{user?.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400 leading-tight">{user?.designation}</span>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 hidden md:block" />
            </div>
            
            <button
              onClick={handleLogout}
              className="ml-1 p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors flex items-center"
              title="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
