import React from 'react';
import { Trophy } from 'lucide-react';

const Leaderboard = ({ users, currentUser }) => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-soft dark:shadow-soft-dark border border-gray-100 dark:border-dark-border p-6 transition-colors duration-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center">
          <Trophy className="w-5 h-5 mr-2 text-yellow-500" />
          Leaderboard
        </h3>
      </div>
      
      <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
        {users.map((u, index) => (
          <div 
            key={u._id} 
            className={`flex items-center justify-between p-3 rounded-xl border ${u._id === currentUser._id ? 'border-indigo-200 dark:border-indigo-500/30 bg-indigo-50 dark:bg-indigo-500/10' : 'border-gray-50 dark:border-dark-border bg-white dark:bg-dark-bg hover:bg-gray-50 dark:hover:bg-dark-card/80'} transition-all hover:shadow-sm`}
          >
            <div className="flex items-center space-x-4">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm ${
                index === 0 ? 'bg-yellow-100 dark:bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' : 
                index === 1 ? 'bg-gray-200 dark:bg-gray-500/20 text-gray-700 dark:text-gray-400' : 
                index === 2 ? 'bg-orange-100 dark:bg-orange-500/20 text-orange-800 dark:text-orange-400' : 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400'
              }`}>
                #{index + 1}
              </div>
              <div>
                <p className={`text-sm font-semibold ${u._id === currentUser._id ? 'text-indigo-900 dark:text-indigo-300' : 'text-gray-900 dark:text-white'}`}>
                  {u.name} {u._id === currentUser._id && <span className="ml-1 text-xs text-indigo-500 font-medium">(You)</span>}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{u.badge}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900 dark:text-white">{u.rewards}</p>
              <p className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider">pts</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
