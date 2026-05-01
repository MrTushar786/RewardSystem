import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';
import Leaderboard from './Leaderboard';
import Analytics from './Analytics';
import { Briefcase, Calendar, TrendingUp, TrendingDown, Award, Star, Cpu, Activity, ArrowLeft } from 'lucide-react';

const EmployeeDashboard = () => {
  const [user, setUser] = useState(null); // The logged-in user
  const [targetUser, setTargetUser] = useState(null); // The user being viewed
  const [allUsers, setAllUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('Dashboard');
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (!loggedInUser) {
      navigate('/login');
    } else {
      setUser(JSON.parse(loggedInUser));
      fetchLeaderboard(JSON.parse(loggedInUser));
    }
  }, [navigate, id]);

  const fetchLeaderboard = async (currentUser) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      const usersData = response.data;
      setAllUsers(usersData);
      
      if (id && currentUser.role === 'Admin') {
        const found = usersData.find(u => u._id === id);
        if (found) {
          setTargetUser(found);
        } else {
          navigate('/admin-dashboard'); // Fallback if user not found
        }
      } else {
        setTargetUser(currentUser);
      }
    } catch (err) {
      console.error("Failed to fetch leaderboard", err);
    }
  };

  if (!user || !targetUser) return null;

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

  return (
    <div className="min-h-screen bg-lightBg dark:bg-dark-bg text-gray-800 dark:text-gray-200 font-sans transition-colors duration-200">
      <Navbar user={user} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-2">
          <div>
            {id && user.role === 'Admin' ? (
              <button 
                onClick={() => navigate('/admin-dashboard')}
                className="flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors mb-2"
              >
                <ArrowLeft className="w-4 h-4 mr-1" /> Back to Admin Dashboard
              </button>
            ) : null}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{id && user.role === 'Admin' ? `${targetUser.name}'s Dashboard` : 'Employee Dashboard'}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {id && user.role === 'Admin' 
                ? `Viewing personal summary and analytics for ${targetUser.name}.` 
                : `Welcome back, ${targetUser.name}. Here is your personal summary.`}
            </p>
          </div>
          <div className="flex space-x-3">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm">
              View Profile
            </button>
          </div>
        </div>

        {activeTab === 'Dashboard' && (
          <>
            {/* KPI Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <StatCard 
                icon={Briefcase} 
                title="Experience" 
                value={targetUser.experience} 
                subtitle={targetUser.company}
                colorClass="bg-blue-50 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400"
              />
              <StatCard 
                icon={Calendar} 
                title="Attendance" 
                value={`${targetUser.attendance}%`} 
                subtitle="Current Year"
                trend={targetUser.attendance > 85 ? 'up' : 'down'}
                trendValue={targetUser.attendance > 85 ? '+2.4%' : '-1.5%'}
                colorClass="bg-green-50 text-green-600 dark:bg-green-500/20 dark:text-green-400"
              />
              <StatCard 
                icon={TrendingUp} 
                title="Performance" 
                value={`${targetUser.performance}`} 
                subtitle="Latest Appraisal"
                trend={targetUser.performance > 80 ? 'up' : 'down'}
                trendValue={targetUser.performance > 80 ? '+8 pts' : '-2 pts'}
                colorClass="bg-purple-50 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400"
              />
              <StatCard 
                icon={Award} 
                title="Total Points" 
                value={targetUser.rewards} 
                subtitle={`${targetUser.badge} Tier`}
                colorClass="bg-orange-50 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400"
              />
              <StatCard 
                icon={Activity} 
                title="Productivity" 
                value="92%" 
                subtitle="Average Output"
                trend="up"
                trendValue="+5.2%"
                colorClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/20 dark:text-indigo-400"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Badge Status */}
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
                      {targetUser.badge}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 relative z-10">
                    {id && user.role === 'Admin' ? `${targetUser.name} has earned ` : "You've earned "}
                    <strong className="text-indigo-600 dark:text-indigo-400">{targetUser.rewards}</strong> points this cycle.
                  </p>
                </div>
              </div>

              {/* Right Column: Personal Analytics */}
              <div className="lg:col-span-2 space-y-6">
                <Analytics users={[targetUser]} />
              </div>
            </div>
          </>
        )}

        {activeTab === 'Analytics' && <Analytics users={[targetUser]} />}
        {activeTab === 'Rewards' && <Leaderboard users={allUsers} currentUser={targetUser} />}

      </main>
    </div>
  );
};

export default EmployeeDashboard;
