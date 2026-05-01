import React, { useState } from 'react';
import { Search, Filter, ShieldAlert, ArrowUpDown } from 'lucide-react';

const EmployeeDirectory = ({ users }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterTier, setFilterTier] = useState('All');

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          user.designation.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTier = filterTier === 'All' || user.badge === filterTier;
    return matchesSearch && matchesTier;
  });

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'Gold': return 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-500/10 dark:text-yellow-400 dark:border-yellow-500/20';
      case 'Silver': return 'bg-slate-50 text-slate-700 border-slate-200 dark:bg-slate-500/10 dark:text-slate-300 dark:border-slate-500/20';
      case 'Bronze': return 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-500/10 dark:text-orange-400 dark:border-orange-500/20';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  };

  const getScoreColor = (score) => {
    if (score >= 85) return 'text-status-green font-semibold';
    if (score >= 75) return 'text-status-yellow font-semibold';
    return 'text-status-red font-semibold';
  };

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border overflow-hidden transition-colors duration-200">
      <div className="p-5 border-b border-gray-100 dark:border-dark-border flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h3 className="text-base font-bold text-gray-900 dark:text-white flex items-center">
          Employee Directory
          <span className="ml-3 bg-indigo-50 dark:bg-indigo-500/10 text-indigo-700 dark:text-indigo-400 text-xs py-0.5 px-2.5 rounded-full font-medium border border-indigo-100 dark:border-indigo-500/20">
            {filteredUsers.length} active
          </span>
        </h3>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search employees..." 
              className="pl-9 pr-4 py-1.5 border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-dark-bg dark:text-white transition-colors w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <select 
              className="pl-9 pr-8 py-1.5 border border-gray-300 dark:border-dark-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none bg-white dark:bg-dark-bg dark:text-white transition-colors"
              value={filterTier}
              onChange={(e) => setFilterTier(e.target.value)}
            >
              <option value="All">All Tiers</option>
              <option value="Gold">Gold</option>
              <option value="Silver">Silver</option>
              <option value="Bronze">Bronze</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-gray-50/50 dark:bg-dark-bg/50 text-gray-500 dark:text-gray-400 border-b border-gray-100 dark:border-dark-border">
            <tr>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"><div className="flex items-center">Employee <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">Department</th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"><div className="flex items-center">Att. <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider cursor-pointer hover:text-gray-700 dark:hover:text-gray-200"><div className="flex items-center">Perf. <ArrowUpDown className="w-3 h-3 ml-1" /></div></th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider">Reward Tier</th>
              <th className="px-5 py-3 font-semibold text-xs uppercase tracking-wider text-right">Points</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border text-gray-700 dark:text-gray-300">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u, i) => (
                <tr key={u._id || i} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors">
                  <td className="px-5 py-3">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold text-xs mr-3 border border-indigo-200 dark:border-indigo-500/30">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{u.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{u.designation} • {u.experience}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-sm">{u.company}</td>
                  <td className="px-5 py-3">
                    <span className={getScoreColor(u.attendance)}>{u.attendance}%</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={getScoreColor(u.performance)}>{u.performance}/100</span>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-semibold border ${getBadgeColor(u.badge)}`}>
                      {u.badge}
                    </span>
                  </td>
                  <td className="px-5 py-3 text-right font-bold text-gray-900 dark:text-white">
                    {u.rewards}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-5 py-12 text-center text-gray-500 dark:text-gray-400">
                  <ShieldAlert className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No employees found matching your criteria.</p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeDirectory;
