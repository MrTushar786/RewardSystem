import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  ScatterChart, Scatter, ZAxis, Cell,
  AreaChart, Area,
  PieChart, Pie
} from 'recharts';
import { TrendingUp, Users } from 'lucide-react';

const Analytics = ({ users }) => {
  if (!users || users.length === 0) return <div className="text-gray-500 dark:text-gray-400 py-10 text-center font-medium">Loading enterprise analytics...</div>;

  // 1. Scatter Data (Performance vs Attendance)
  const scatterData = users.map(u => ({
    name: u.name,
    attendance: u.attendance,
    performance: u.performance,
    rewards: u.rewards,
    badge: u.badge
  }));

  // 2. Badge Distribution (Pie Chart)
  const badgeCounts = users.reduce((acc, user) => {
    acc[user.badge] = (acc[user.badge] || 0) + 1;
    return acc;
  }, { Gold: 0, Silver: 0, Bronze: 0 });

  const pieData = [
    { name: 'Gold Tier', value: badgeCounts.Gold, fill: '#EAB308' },
    { name: 'Silver Tier', value: badgeCounts.Silver, fill: '#94A3B8' },
    { name: 'Bronze Tier', value: badgeCounts.Bronze, fill: '#D97706' },
  ];

  // 3. Department Bar Chart (Mocking departments since backend uses 'company' field for T-System)
  // Let's divide users semi-randomly based on their name length or just create a mock aggregation
  const deptData = [
    { name: 'Engineering', perf: 88, att: 92 },
    { name: 'Sales', perf: 82, att: 85 },
    { name: 'Marketing', perf: 78, att: 88 },
    { name: 'HR', perf: 90, att: 95 },
  ];

  // 4. Monthly Trend (Area Chart - Mocked last 6 months)
  const trendData = [
    { month: 'Nov', score: 75 },
    { month: 'Dec', score: 78 },
    { month: 'Jan', score: 76 },
    { month: 'Feb', score: 82 },
    { month: 'Mar', score: 85 },
    { month: 'Apr', score: 89 },
  ];

  const getScatterColor = (badge) => {
    if (badge === 'Gold') return '#EAB308';
    if (badge === 'Silver') return '#94A3B8';
    return '#D97706';
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-dark-card p-3 border border-gray-200 dark:border-dark-border shadow-soft dark:shadow-soft-dark rounded-lg">
          <p className="font-bold text-gray-900 dark:text-white mb-1">{label || payload[0].payload.name}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm font-medium" style={{ color: entry.color || entry.fill }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const ChartCard = ({ title, icon: Icon, children }) => (
    <div className="bg-white dark:bg-dark-card border border-gray-100 dark:border-dark-border rounded-xl p-5 shadow-sm hover:shadow-soft transition-shadow duration-200">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 flex items-center">
          {Icon && <Icon className="w-4 h-4 mr-2 text-indigo-500" />}
          {title}
        </h4>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          {children}
        </ResponsiveContainer>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      
      {/* 1. Monthly Performance Trend */}
      <ChartCard title="Company Performance Trend (6 Mo)" icon={TrendingUp}>
        <AreaChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#4F46E5" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:opacity-10" />
          <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1' }} />
          <Area type="monotone" dataKey="score" name="Avg Score" stroke="#4F46E5" strokeWidth={3} fillOpacity={1} fill="url(#colorScore)" />
        </AreaChart>
      </ChartCard>

      {/* 2. Reward Tier Distribution */}
      <ChartCard title="Reward Tier Distribution" icon={Users}>
        <PieChart>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={90}
            paddingAngle={5}
            dataKey="value"
            stroke="none"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ChartCard>

      {/* 3. Department Comparison */}
      <ChartCard title="Department Benchmarks" icon={TrendingUp}>
        <BarChart data={deptData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barSize={24}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:opacity-10" />
          <XAxis dataKey="name" tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="perf" name="Performance" fill="#4F46E5" radius={[4, 4, 0, 0]} />
          <Bar dataKey="att" name="Attendance" fill="#38BDF8" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartCard>

      {/* 4. Scatter Mapping */}
      <ChartCard title="Individual AI Mapping (Att. vs Perf.)" icon={Users}>
        <ScatterChart margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" className="dark:opacity-10" />
          <XAxis type="number" dataKey="attendance" name="Attendance" unit="%" domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={{ stroke: '#e2e8f0' }} tickLine={false} />
          <YAxis type="number" dataKey="performance" name="Performance" domain={[50, 100]} tick={{ fill: '#64748b', fontSize: 12 }} axisLine={false} tickLine={false} />
          <ZAxis type="number" range={[60, 200]} />
          <Tooltip cursor={{ strokeDasharray: '3 3', stroke: '#cbd5e1' }} content={<CustomTooltip />} />
          <Scatter name="Employees" data={scatterData}>
            {scatterData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getScatterColor(entry.badge)} opacity={0.8} />
            ))}
          </Scatter>
        </ScatterChart>
      </ChartCard>

    </div>
  );
};

export default Analytics;
