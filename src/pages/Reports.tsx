import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Users,
  DollarSign,
  Star,
  Clock
} from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { useAdmin } from '../context/AdminContext';

const Reports: React.FC = () => {
  const { workers } = useAdmin();
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');

  // Mock data for charts and reports
  const reportData = {
    overview: {
      totalRevenue: 45230,
      totalJobs: 1247,
      averageRating: 4.7,
      responseTime: '1.2 hours'
    },
    performance: {
      topWorkers: workers.slice(0, 5).sort((a, b) => b.rating - a.rating),
      completionRates: [95, 88, 92, 87, 94],
      customerSatisfaction: 4.8
    },
    financial: {
      monthlyRevenue: [12000, 15000, 18000, 22000, 25000, 28000],
      expenses: [8000, 9500, 11000, 13000, 14500, 16000],
      profit: [4000, 5500, 7000, 9000, 10500, 12000]
    }
  };

  const exportReport = (type: string) => {
    // Mock export functionality
    const data = JSON.stringify(reportData, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const renderOverviewReport = () => (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Revenue"
          value={`$${reportData.overview.totalRevenue.toLocaleString()}`}
          icon={DollarSign}
          color="green"
          change={{ value: 12, type: 'increase' }}
        />
        <StatsCard
          title="Total Jobs"
          value={reportData.overview.totalJobs.toLocaleString()}
          icon={BarChart3}
          color="blue"
          change={{ value: 8, type: 'increase' }}
        />
        <StatsCard
          title="Average Rating"
          value={reportData.overview.averageRating}
          icon={Star}
          color="yellow"
          change={{ value: 3, type: 'increase' }}
        />
        <StatsCard
          title="Avg Response Time"
          value={reportData.overview.responseTime}
          icon={Clock}
          color="purple"
          change={{ value: 15, type: 'decrease' }}
        />
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trend</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-2" />
              <p>Revenue chart would be displayed here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Distribution</h3>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Users size={48} className="mx-auto mb-2" />
              <p>Job distribution chart would be displayed here</p>
              <p className="text-sm">Integration with charting library needed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPerformanceReport = () => (
    <div className="space-y-6">
      {/* Top Performers */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Workers</h3>
        <div className="space-y-4">
          {reportData.performance.topWorkers.map((worker, index) => (
            <div key={worker.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex items-center justify-center w-8 h-8 bg-blue-600 text-white rounded-full font-bold">
                  {index + 1}
                </div>
                <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium">{worker.name.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{worker.name}</p>
                  <p className="text-sm text-gray-600">{worker.specialization}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="ml-1 font-medium">{worker.rating}</span>
                </div>
                <p className="text-sm text-gray-600">{worker.completedJobs} jobs</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Completion Rates by Specialization</h3>
          <div className="space-y-3">
            {['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'HVAC'].map((spec, index) => (
              <div key={spec} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{spec}</span>
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${reportData.performance.completionRates[index]}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {reportData.performance.completionRates[index]}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Customer Satisfaction</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-green-600 mb-2">
              {reportData.performance.customerSatisfaction}/5
            </div>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  className={`${i < Math.floor(reportData.performance.customerSatisfaction) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-gray-600">Based on 1,247 customer reviews</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderFinancialReport = () => (
    <div className="space-y-6">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard
          title="Monthly Revenue"
          value="$28,000"
          icon={TrendingUp}
          color="green"
          change={{ value: 15, type: 'increase' }}
        />
        <StatsCard
          title="Monthly Expenses"
          value="$16,000"
          icon={DollarSign}
          color="red"
          change={{ value: 8, type: 'increase' }}
        />
        <StatsCard
          title="Net Profit"
          value="$12,000"
          icon={BarChart3}
          color="blue"
          change={{ value: 25, type: 'increase' }}
        />
      </div>

      {/* Financial Chart Placeholder */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Financial Trends (Last 6 Months)</h3>
        <div className="h-80 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <TrendingUp size={64} className="mx-auto mb-4" />
            <p className="text-lg mb-2">Financial trends chart would be displayed here</p>
            <p className="text-sm">Shows revenue, expenses, and profit over time</p>
            <p className="text-sm">Integration with charting library needed</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Reports & Analytics</h1>
          <p className="text-gray-600">Track performance, revenue, and worker statistics</p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
            <option value="year">This Year</option>
          </select>
          
          <button
            onClick={() => exportReport(selectedReport)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Report Navigation */}
      <div className="mb-6">
        <nav className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'performance', label: 'Performance', icon: TrendingUp },
            { id: 'financial', label: 'Financial', icon: DollarSign }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedReport(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  selectedReport === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Report Content */}
      <div>
        {selectedReport === 'overview' && renderOverviewReport()}
        {selectedReport === 'performance' && renderPerformanceReport()}
        {selectedReport === 'financial' && renderFinancialReport()}
      </div>
    </div>
  );
};

export default Reports;