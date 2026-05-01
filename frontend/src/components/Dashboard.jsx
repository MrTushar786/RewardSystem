import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Analytics from './Analytics';
import EmployeeDirectory from './EmployeeDirectory';
import { Briefcase, Calendar, TrendingUp, TrendingDown, Award, Star, Cpu, AlertTriangle, Activity, Users } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(loggedInUser));
      fetchLeaderboard();
    }
  }, [navigate]);

  const fetchLeaderboard = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      setAllUsers(response.data);
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  };

  if (!user) return null;

  const StatCard = ({ icon: Icon, title, value, subtitle, trend, trendValue, colorClass }) => (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-5 flex flex-col justify-between hover:shadow-soft transition-shadow duration-200">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-2.5 rounded-lg ${colorClass}`}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <div className={`flex items-center text-xs font-semibold px-2 py-1 rounded-full ${trend === 'up' ? 'text-status-green bg-green-50 dark:bg-green-500/10' : 'text-status-red bg-red-50 dark:bg-red-500/10'}`}>
            {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
            {trendValue}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{value}</h3>
        {subtitle && <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  const attentionUsers = allUsers.filter(u => u.attendance < 75 || u.performance < 60);

  return (
    <div className="min-h-screen bg-lightBg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans transition-colors duration-200">
      <Navbar user={user} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Overview Dashboard</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Welcome back, {user.name}. Here is your enterprise workforce summary.</p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-white dark:bg-dark-card border border-gray-300 dark:border-dark-border text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors shadow-sm">
              Export Report
            </button>
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              View Profile
            </button>
          </div>
        </div>

        {/* Global KPI Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard 
            icon={Briefcase} 
            title="Experience" 
            value={user.experience} 
            subtitle={user.company}
            colorClass="bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
          />
          <StatCard 
            icon={Calendar} 
            title="Attendance" 
            value={`${user.attendance}%`} 
            subtitle="Current Year"
            trend={user.attendance > 85 ? 'up' : 'down'}
            trendValue={user.attendance > 85 ? '+2.4%' : '-1.5%'}
            colorClass="bg-green-50 text-green-600 dark:bg-green-500/20 dark:text-green-400"
          />
          <StatCard 
            icon={TrendingUp} 
            title="Performance" 
            value={`${user.performance}`} 
            subtitle="Latest Appraisal"
            trend={user.performance > 80 ? 'up' : 'down'}
            trendValue={user.performance > 80 ? '+8 pts' : '-2 pts'}
            colorClass="bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
          />
          <StatCard 
            icon={Award} 
            title="Total Points" 
            value={user.rewards} 
            subtitle={`${user.badge} Tier`}
            colorClass="bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
          />
          <StatCard 
            icon={Activity} 
            title="Team Productivity" 
            value="89%" 
            subtitle="Company Average"
            trend="up"
            trendValue="+4.2%"
            colorClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
          />
        </div>

        {/* Attention Section */}
        {attentionUsers.length > 0 && (
          <div className="bg-red-50/50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 rounded-xl p-5 shadow-sm">
            <h3 className="text-sm text-red-800 dark:text-red-400 font-bold flex items-center mb-3">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Action Required: Employee Metrics Below Threshold
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {attentionUsers.map(u => (
                <div key={u._id} className="bg-white dark:bg-dark-card border border-red-100 dark:border-red-500/20 p-3 rounded-lg flex justify-between items-center shadow-sm">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white text-sm">{u.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{u.designation}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-xs font-bold ${u.attendance < 75 ? 'text-status-red' : 'text-gray-600 dark:text-gray-300'}`}>Att: {u.attendance}%</p>
                    <p className={`text-xs font-bold ${u.performance < 60 ? 'text-status-red' : 'text-gray-600 dark:text-gray-300'}`}>Perf: {u.performance}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: AI Explanation & Badge Status */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 relative overflow-hidden transition-colors duration-200">
              <div className="absolute top-0 right-0 p-4 opacity-5 dark:opacity-[0.03]">
                <Star className="w-32 h-32 text-indigo-900 dark:text-white" />
              </div>
              <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-1 relative z-10 uppercase tracking-wider">
                Current Tier Status
              </h3>
              <div className="flex items-end space-x-2 mt-2 relative z-10">
                <span className="text-4xl font-extrabold text-gray-900 dark:text-white">
                  {user.badge}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 relative z-10">You've earned <strong className="text-indigo-600 dark:text-indigo-400">{user.rewards}</strong> points this cycle.</p>
              
              <div className="mt-8 pt-6 border-t border-gray-100 dark:border-dark-border relative z-10">
                <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                  <Cpu className="w-4 h-4 mr-2 text-indigo-500" />
                  AI Recommendation Engine
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-yellow-400 mr-2"></span>
                      Att &gt; 90% + Perf &gt; 85%
                    </div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border px-2 py-0.5 rounded">Gold</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-slate-400 mr-2"></span>
                      Att &gt; 75%
                    </div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border px-2 py-0.5 rounded">Silver</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                      <span className="w-2 h-2 rounded-full bg-orange-700 mr-2"></span>
                      Default Fallback
                    </div>
                    <span className="text-xs font-bold text-gray-900 dark:text-white border border-gray-200 dark:border-dark-border px-2 py-0.5 rounded">Bronze</span>
                  </div>
                </div>
              </div>
            </div>

            <Leaderboard users={allUsers} currentUser={user} />
          </div>

          {/* Right Column: Analytics & Directory */}
          <div className="lg:col-span-2 space-y-6">
            <Analytics users={allUsers} />
            
            <EmployeeDirectory users={allUsers} />
          </div>
        </div>

      </main>
    </div>
  );
};

export default Dashboard;
