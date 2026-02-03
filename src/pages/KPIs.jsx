import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Users,
  Phone,
  FileText,
  DollarSign,
  Target,
  BarChart3,
  Edit3,
  Check,
  X,
  Plus,
  Minus
} from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { useStore } from '../store/useStore';
import { GROWTH_PLAN } from '../data/growthPlan';
import toast from 'react-hot-toast';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-dark-card border border-dark-border rounded-lg p-3 shadow-lg">
        <p className="text-sm font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {entry.name}: {entry.name.includes('MRR') || entry.name.includes('Revenue')
              ? `$${entry.value.toLocaleString()}`
              : entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function KPIs() {
  const { kpis, updateKPI, getCurrentMonth } = useStore();
  const [editingKPI, setEditingKPI] = useState(null);
  const [editValue, setEditValue] = useState('');

  const currentMonth = getCurrentMonth();

  // Prepare chart data
  const chartData = GROWTH_PLAN.kpiMetrics[0].targets.map((_, index) => ({
    month: `Month ${index + 1}`,
    'Target MRR': GROWTH_PLAN.kpiMetrics[0].targets[index],
    'Actual MRR': kpis.mrr[index] || 0,
    'Target Clients': GROWTH_PLAN.kpiMetrics[1].targets[index],
    'Actual Clients': kpis.clients[index] || 0,
    'Target Calls': GROWTH_PLAN.kpiMetrics[2].targets[index],
    'Actual Calls': kpis.calls[index] || 0,
    'Target Posts': GROWTH_PLAN.kpiMetrics[3].targets[index],
    'Actual Posts': kpis.posts[index] || 0,
  }));

  const kpiCards = [
    {
      key: 'mrr',
      title: 'Monthly Revenue',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      current: kpis.mrr[currentMonth - 1] || 0,
      target: GROWTH_PLAN.kpiMetrics[0].targets[currentMonth - 1],
      format: (v) => `$${v.toLocaleString()}`,
      unit: 'MRR'
    },
    {
      key: 'clients',
      title: 'Active Clients',
      icon: Users,
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      current: kpis.clients[currentMonth - 1] || 0,
      target: GROWTH_PLAN.kpiMetrics[1].targets[currentMonth - 1],
      format: (v) => v,
      unit: 'clients'
    },
    {
      key: 'calls',
      title: 'Discovery Calls',
      icon: Phone,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      current: kpis.calls[currentMonth - 1] || 0,
      target: GROWTH_PLAN.kpiMetrics[2].targets[currentMonth - 1],
      format: (v) => v,
      unit: 'calls'
    },
    {
      key: 'posts',
      title: 'Posts Published',
      icon: FileText,
      color: 'from-orange-500 to-yellow-500',
      bgColor: 'from-orange-500/20 to-yellow-500/20',
      current: kpis.posts[currentMonth - 1] || 0,
      target: GROWTH_PLAN.kpiMetrics[3].targets[currentMonth - 1],
      format: (v) => v,
      unit: 'posts'
    }
  ];

  const handleStartEdit = (kpi, currentValue) => {
    setEditingKPI(kpi);
    setEditValue(currentValue.toString());
  };

  const handleSaveEdit = (kpiKey) => {
    const value = parseInt(editValue) || 0;
    updateKPI(kpiKey, currentMonth - 1, value);
    setEditingKPI(null);
    toast.success('KPI updated!', { icon: '📊' });
  };

  const handleQuickUpdate = (kpiKey, delta) => {
    const currentValue = kpis[kpiKey][currentMonth - 1] || 0;
    const newValue = Math.max(0, currentValue + delta);
    updateKPI(kpiKey, currentMonth - 1, newValue);
    toast.success(`${kpiKey.toUpperCase()} ${delta > 0 ? 'increased' : 'decreased'}!`, {
      icon: delta > 0 ? '📈' : '📉'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">KPI Dashboard</h1>
          <p className="text-gray-500">Track your key performance indicators for Month {currentMonth}</p>
        </div>
        <div className="flex items-center gap-2">
          <Target className="w-5 h-5 text-accent-primary" />
          <span className="text-sm text-gray-500">$10K MRR Goal</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => {
          const Icon = kpi.icon;
          const progress = kpi.target > 0 ? Math.min(100, (kpi.current / kpi.target) * 100) : 0;
          const isOnTrack = progress >= (currentMonth / 6) * 100;

          return (
            <motion.div
              key={kpi.key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="card hover-lift"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${kpi.bgColor}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1">
                  <motion.button
                    onClick={() => handleQuickUpdate(kpi.key, -1)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Minus className="w-4 h-4 text-gray-500" />
                  </motion.button>
                  <motion.button
                    onClick={() => handleQuickUpdate(kpi.key, 1)}
                    className="p-1 hover:bg-white/10 rounded transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Plus className="w-4 h-4 text-gray-500" />
                  </motion.button>
                </div>
              </div>

              {editingKPI === kpi.key ? (
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="number"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                    className="input w-24 text-lg font-bold"
                    autoFocus
                  />
                  <button
                    onClick={() => handleSaveEdit(kpi.key)}
                    className="p-1 bg-accent-success/20 text-accent-success rounded"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setEditingKPI(null)}
                    className="p-1 bg-accent-danger/20 text-accent-danger rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div
                  className="text-2xl font-bold mb-1 cursor-pointer hover:text-accent-primary transition-colors flex items-center gap-2"
                  onClick={() => handleStartEdit(kpi.key, kpi.current)}
                >
                  {kpi.format(kpi.current)}
                  <Edit3 className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100" />
                </div>
              )}

              <div className="text-sm text-gray-500 mb-3">{kpi.title}</div>

              <div className="h-2 bg-dark-input rounded-full overflow-hidden mb-2">
                <motion.div
                  className={`h-full rounded-full bg-gradient-to-r ${kpi.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Target: {kpi.format(kpi.target)}</span>
                <span className={isOnTrack ? 'text-accent-success' : 'text-accent-warning'}>
                  {Math.round(progress)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card"
      >
        <h2 className="text-lg font-semibold mb-4">Revenue Growth Trajectory</h2>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="targetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
              <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(v) => `$${(v/1000)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="Target MRR"
                stroke="#6366f1"
                fill="url(#targetGradient)"
                strokeWidth={2}
                strokeDasharray="5 5"
              />
              <Area
                type="monotone"
                dataKey="Actual MRR"
                stroke="#10b981"
                fill="url(#actualGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Clients & Calls Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold mb-4">Clients & Calls Progress</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Bar dataKey="Target Clients" fill="#6366f1" opacity={0.5} radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual Clients" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual Calls" fill="#a855f7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Content Performance */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <h2 className="text-lg font-semibold mb-4">Content Performance</h2>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
                <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                <YAxis stroke="#6b7280" fontSize={12} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Target Posts"
                  stroke="#f59e0b"
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="Actual Posts"
                  stroke="#f97316"
                  strokeWidth={2}
                  dot={{ fill: '#f97316', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Monthly Targets Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card overflow-x-auto"
      >
        <h2 className="text-lg font-semibold mb-4">6-Month Target Breakdown</h2>
        <table className="w-full min-w-[600px]">
          <thead>
            <tr className="border-b border-dark-border">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Metric</th>
              {[1, 2, 3, 4, 5, 6].map((month) => (
                <th
                  key={month}
                  className={`text-center py-3 px-4 text-sm font-medium ${
                    month === currentMonth ? 'text-accent-primary' : 'text-gray-500'
                  }`}
                >
                  Month {month}
                  {month === currentMonth && (
                    <span className="block text-xs text-accent-primary">(Current)</span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {GROWTH_PLAN.kpiMetrics.map((metric) => {
              const kpiKey = metric.id;
              return (
                <tr key={metric.id} className="border-b border-dark-border/50">
                  <td className="py-3 px-4">
                    <span className="font-medium">{metric.name}</span>
                    <span className="text-xs text-gray-500 block">{metric.unit}</span>
                  </td>
                  {metric.targets.map((target, index) => {
                    const actual = kpis[kpiKey]?.[index] || 0;
                    const isAchieved = actual >= target;
                    const isCurrent = index === currentMonth - 1;

                    return (
                      <td
                        key={index}
                        className={`text-center py-3 px-4 ${isCurrent ? 'bg-accent-primary/10' : ''}`}
                      >
                        <div className="text-sm font-medium">
                          {metric.unit === 'dollars' ? `$${actual.toLocaleString()}` : actual}
                        </div>
                        <div className={`text-xs ${isAchieved ? 'text-accent-success' : 'text-gray-500'}`}>
                          / {metric.unit === 'dollars' ? `$${target.toLocaleString()}` : target}
                        </div>
                        {isAchieved && <span className="text-accent-success text-xs">✓</span>}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
}
