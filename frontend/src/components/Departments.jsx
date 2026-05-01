import React from 'react';
import { Users, Building2, Briefcase } from 'lucide-react';

const Departments = ({ users = [] }) => {
  // Group users by designation to treat it as departments
  const departmentData = users.reduce((acc, user) => {
    const dept = user.designation || 'General';
    if (!acc[dept]) {
      acc[dept] = { count: 0, totalAtt: 0, totalPerf: 0 };
    }
    acc[dept].count += 1;
    acc[dept].totalAtt += user.attendance;
    acc[dept].totalPerf += user.performance;
    return acc;
  }, {});

  const departments = Object.keys(departmentData).map(dept => {
    const data = departmentData[dept];
    return {
      name: dept,
      count: data.count,
      avgAttendance: Math.round(data.totalAtt / data.count),
      avgPerformance: Math.round(data.totalPerf / data.count)
    };
  });

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 transition-colors duration-200">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Departments Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.length > 0 ? departments.map((dept, idx) => (
          <div key={idx} className="border border-gray-100 dark:border-dark-border rounded-lg p-5 hover:shadow-soft transition-shadow">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
                <Building2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">{dept.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{dept.count} Employees</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg Performance</span>
                <span className="font-semibold text-gray-900 dark:text-white">{dept.avgPerformance}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400">Avg Attendance</span>
                <span className="font-semibold text-gray-900 dark:text-white">{dept.avgAttendance}%</span>
              </div>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center text-gray-500 dark:text-gray-400 py-8">
            No department data available.
          </div>
        )}
      </div>
    </div>
  );
};

export default Departments;
