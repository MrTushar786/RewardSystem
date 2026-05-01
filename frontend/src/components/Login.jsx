import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { LogIn, Building2, AlertCircle, ShieldCheck, Mail, Key } from 'lucide-react';

const Login = () => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your Employee ID or Name');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://localhost:5001/api/users/login', { name: name.trim() });
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Could not connect to authentication server');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-lightBg dark:bg-dark-bg font-sans transition-colors duration-200">
      
      {/* Left Side - Brand Presentation (Hidden on small screens) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-indigo-900 overflow-hidden items-center justify-center">
        {/* Abstract Corporate Pattern Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="rgba(255,255,255,0.1)" />
            <path d="M0 50 C 50 100 80 100 100 0 Z" fill="rgba(255,255,255,0.05)" />
          </svg>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/90 to-blue-900/90 mix-blend-multiply"></div>
        
        <div className="relative z-10 px-16 text-white max-w-2xl">
          <div className="mb-8 inline-flex items-center space-x-3 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <ShieldCheck className="w-5 h-5 text-indigo-300" />
            <span className="text-sm font-medium text-indigo-100 tracking-wide">Enterprise Secure Login</span>
          </div>
          <h1 className="text-5xl font-extrabold mb-6 tracking-tight leading-tight">
            T-System <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-blue-200">
              Workforce Analytics
            </span>
          </h1>
          <p className="text-lg text-indigo-200 leading-relaxed mb-12 max-w-lg">
            Access your secure employee portal to manage performance, track rewards, and view real-time department analytics powered by AI.
          </p>
          
          <div className="flex items-center space-x-6 text-sm text-indigo-300 font-medium">
            <div className="flex items-center"><Building2 className="w-4 h-4 mr-2" /> Corporate Network</div>
            <div className="flex items-center"><ShieldCheck className="w-4 h-4 mr-2" /> SOC2 Compliant</div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 bg-white dark:bg-dark-bg">
        <div className="w-full max-w-md">
          
          <div className="lg:hidden mb-10 flex items-center space-x-3">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center shadow-glow">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">T-System</span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back</h2>
            <p className="text-gray-500 dark:text-gray-400">Sign in to your enterprise account.</p>
          </div>

          {error && (
            <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-700 dark:text-red-400 px-4 py-3 rounded-lg mb-6 flex items-start text-sm shadow-sm">
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Employee ID / Username</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-dark-border rounded-xl text-gray-900 dark:text-white bg-white dark:bg-dark-card focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 focus:border-transparent transition-all shadow-sm"
                  placeholder="e.g. Ranvir Kumar"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded cursor-pointer" />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                  Forgot ID?
                </a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-all flex justify-center items-center shadow-soft hover:shadow-glow disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
              ) : (
                <>
                  Sign in
                </>
              )}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-dark-border"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-dark-bg text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button className="flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-dark-border rounded-xl shadow-sm bg-white dark:bg-dark-card text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google SSO
              </button>
              <button className="flex justify-center items-center py-2.5 px-4 border border-gray-300 dark:border-dark-border rounded-xl shadow-sm bg-white dark:bg-dark-card text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                <svg className="h-5 w-5 mr-2" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V10H10V0Z" fill="#F25022"/>
                  <path d="M21 0H11V10H21V0Z" fill="#7FBA00"/>
                  <path d="M10 11H0V21H10V11Z" fill="#00A4EF"/>
                  <path d="M21 11H11V21H21V11Z" fill="#FFB900"/>
                </svg>
                Microsoft
              </button>
            </div>
          </div>
          
          <div className="mt-12 pt-6 border-t border-gray-100 dark:border-dark-border flex justify-between items-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              &copy; {new Date().getFullYear()} T-System HRMS.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-xs text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">Terms</a>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
