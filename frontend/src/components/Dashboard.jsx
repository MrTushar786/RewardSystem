import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Analytics from './Analytics';
import EmployeeDirectory from './EmployeeDirectory';
import Departments from './Departments';
import Reports from './Reports';
import { Briefcase, Calendar, TrendingUp, TrendingDown, Award, Star, Cpu, AlertTriangle, Activity, Users } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
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

  const employees = allUsers.filter(u => u.role !== 'Admin');
  const totalEmployees = employees.length;
  const avgAttendance = totalEmployees ? Math.round(employees.reduce((acc, curr) => acc + curr.attendance, 0) / totalEmployees) : 0;
  const avgPerformance = totalEmployees ? Math.round(employees.reduce((acc, curr) => acc + curr.performance, 0) / totalEmployees) : 0;
  const totalRewards = employees.reduce((acc, curr) => acc + curr.rewards, 0);
  const goldPerformers = employees.filter(u => u.badge === 'Gold').length;
  const silverPerformers = employees.filter(u => u.badge === 'Silver').length;
  const bronzePerformers = employees.filter(u => u.badge === 'Bronze').length;

  const attentionUsers = employees.filter(u => u.attendance < 75 || u.performance < 60);

  return (
    <div className="min-h-screen bg-lightBg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans transition-colors duration-200">
      <Navbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Admin Dashboard</h1>
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

        {activeTab === 'Dashboard' && (
          <>
            {/* Global KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard 
                icon={Users} 
                title="Total Headcount" 
                value={totalEmployees} 
                subtitle="Active Employees"
                colorClass="bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
              />
              <StatCard 
                icon={Calendar} 
                title="Avg. Attendance" 
                value={`${avgAttendance}%`} 
                subtitle="Company Wide"
                trend={avgAttendance >= 85 ? 'up' : 'down'}
                trendValue={avgAttendance >= 85 ? 'Healthy' : 'Needs Review'}
                colorClass="bg-green-50 text-green-600 dark:bg-green-500/20 dark:text-green-400"
              />
              <StatCard 
                icon={TrendingUp} 
                title="Avg. Performance" 
                value={`${avgPerformance}/100`} 
                subtitle="Latest Appraisal"
                trend={avgPerformance >= 80 ? 'up' : 'down'}
                trendValue={avgPerformance >= 80 ? 'On Track' : 'Below Target'}
                colorClass="bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
              />
              <StatCard 
                icon={Award} 
                title="Rewards Issued" 
                value={totalRewards} 
                subtitle="Total Points Distributed"
                colorClass="bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
              />
              <StatCard 
                icon={Star} 
                title="Top Performers" 
                value={goldPerformers} 
                subtitle="Gold Tier Staff"
                trend="up"
                trendValue="High Impact"
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
                  <h3 className="text-sm font-bold text-gray-500 dark:text-gray-400 mb-4 relative z-10 uppercase tracking-wider">
                    Enterprise Tier Distribution
                  </h3>
                  
                  <div className="space-y-4 relative z-10">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-yellow-400 mr-3 shadow-sm"></span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Gold Tier</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{goldPerformers} Employees</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-slate-400 mr-3 shadow-sm"></span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Silver Tier</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{silverPerformers} Employees</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <span className="w-3 h-3 rounded-full bg-orange-700 mr-3 shadow-sm"></span>
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">Bronze Tier</span>
                      </div>
                      <span className="text-sm font-bold text-gray-700 dark:text-gray-300">{bronzePerformers} Employees</span>
                    </div>
                  </div>
                  
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

                <Leaderboard users={employees} currentUser={user} />
              </div>

              {/* Right Column: Analytics & Directory */}
              <div className="lg:col-span-2 space-y-6">
                <Analytics users={employees} />
                <EmployeeDirectory users={employees} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Employees' && <EmployeeDirectory users={allUsers} />}
        {activeTab === 'Analytics' && <Analytics users={allUsers} />}
        {activeTab === 'Rewards' && <Leaderboard users={allUsers} currentUser={user} />}
        {activeTab === 'Departments' && <Departments users={employees} />}
        {activeTab === 'Reports' && <Reports />}

      </main>
    </div>
  );
};

export default Dashboard;
