import React from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

const Departments = () => {
  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Departments Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Engineering */}
        <div className="border border-gray-100 dark:border-dark-border rounded-lg p-5 hover:shadow-soft transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Engineering</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">45 Employees</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg Performance</span>
              <span className="font-semibold text-gray-900 dark:text-white">88%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg Attendance</span>
              <span className="font-semibold text-gray-900 dark:text-white">92%</span>
            </div>
          </div>
        </div>

        {/* Product */}
        <div className="border border-gray-100 dark:border-dark-border rounded-lg p-5 hover:shadow-soft transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg">
              <Briefcase className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Product Management</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">12 Employees</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg Performance</span>
              <span className="font-semibold text-gray-900 dark:text-white">91%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg Attendance</span>
              <span className="font-semibold text-gray-900 dark:text-white">95%</span>
            </div>
          </div>
        </div>

        {/* HR */}
        <div className="border border-gray-100 dark:border-dark-border rounded-lg p-5 hover:shadow-soft transition-shadow">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-green-50 dark:bg-green-500/10 rounded-lg">
              <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white">Human Resources</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">8 Employees</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg Performance</span>
              <span className="font-semibold text-gray-900 dark:text-white">85%</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Avg Attendance</span>
              <span className="font-semibold text-gray-900 dark:text-white">98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Departments;
