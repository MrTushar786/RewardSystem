import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';

const Reports = () => {
  const reports = [
    { id: 1, name: 'Monthly Performance Review', date: 'Oct 2026', type: 'PDF' },
    { id: 2, name: 'Q3 Attendance Summary', date: 'Sep 2026', type: 'Excel' },
    { id: 3, name: 'Reward Distribution Analytics', date: 'Oct 2026', type: 'PDF' },
    { id: 4, name: 'Department KPI Matrix', date: 'Aug 2026', type: 'CSV' },
  ];

  return (
    <div className="bg-white dark:bg-dark-card rounded-xl shadow-sm border border-gray-200 dark:border-dark-border p-6 transition-colors duration-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Available Reports</h2>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm flex items-center">
          <FileText className="w-4 h-4 mr-2" />
          Generate New
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-dark-bg text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="p-4 font-semibold rounded-tl-lg">Report Name</th>
              <th className="p-4 font-semibold">Date Generated</th>
              <th className="p-4 font-semibold">Format</th>
              <th className="p-4 font-semibold rounded-tr-lg text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-dark-border">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 dark:hover:bg-dark-bg transition-colors group">
                <td className="p-4">
                  <div className="flex items-center text-sm font-medium text-gray-900 dark:text-white">
                    <FileText className="w-4 h-4 mr-3 text-indigo-500" />
                    {report.name}
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2" />
                    {report.date}
                  </div>
                </td>
                <td className="p-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                    {report.type}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-sm group-hover:border-indigo-200 dark:group-hover:border-indigo-500/30 transition-all">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
