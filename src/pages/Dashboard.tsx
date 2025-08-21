import React, { useEffect, useState } from 'react';
import { Users, UserCheck, UserX, Star, Briefcase, TrendingUp } from 'lucide-react';
import StatsCard from '../components/StatsCard';
import { useAdmin } from '../context/AdminContext';
import { workerService } from '../services/worker';
import type { WorkerStats } from '../services/worker';

const Dashboard: React.FC = () => {
  const { workers } = useAdmin();
  const [stats, setStats] = useState<WorkerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await workerService.getWorkerStats();
        if (response.success && response.data) {
          setStats(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Calculate real-time stats from context data
  const realTimeStats = {
    totalWorkers: workers.length,
    activeWorkers: workers.filter(w => w.status === 'active').length,
    inactiveWorkers: workers.filter(w => w.status === 'inactive').length,
    suspendedWorkers: workers.filter(w => w.status === 'suspended').length,
    averageRating: workers.length > 0 
      ? workers.reduce((sum, w) => sum + w.rating, 0) / workers.length 
      : 0,
    totalCompletedJobs: workers.reduce((sum, w) => sum + w.completedJobs, 0)
  };

  const displayStats = stats || realTimeStats;

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="animate-fade-in">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Welcome back! Here's what's happening with your door service operations today.</p>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm text-gray-500">Last updated</p>
              <p className="text-sm font-medium text-gray-900">{new Date().toLocaleTimeString()}</p>
            </div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Total Workers"
          value={displayStats.totalWorkers}
          icon={Users}
          color="blue"
          change={{ value: 12, type: 'increase' }}
        />
        
        <StatsCard
          title="Active Workers"
          value={displayStats.activeWorkers}
          icon={UserCheck}
          color="green"
          change={{ value: 8, type: 'increase' }}
        />
        
        <StatsCard
          title="Inactive Workers"
          value={displayStats.inactiveWorkers}
          icon={UserX}
          color="yellow"
          change={{ value: 3, type: 'decrease' }}
        />
        
        <StatsCard
          title="Average Rating"
          value={displayStats.averageRating.toFixed(1)}
          icon={Star}
          color="purple"
          change={{ value: 2, type: 'increase' }}
        />
        
        <StatsCard
          title="Completed Jobs"
          value={displayStats.totalCompletedJobs.toLocaleString()}
          icon={Briefcase}
          color="green"
          change={{ value: 15, type: 'increase' }}
        />
        
        <StatsCard
          title="Growth Rate"
          value="23%"
          icon={TrendingUp}
          color="blue"
          change={{ value: 5, type: 'increase' }}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Workers */}
        <div className="card animate-slide-in">
          <div className="card-header">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Workers</h3>
              <span className="badge badge-info">{workers.length} total</span>
            </div>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {workers.slice(0, 5).map((worker, index) => (
                <div key={worker.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                      <span className="text-white font-semibold">
                        {worker.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{worker.name}</p>
                      <p className="text-sm text-gray-500">{worker.specialization}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="ml-1 text-sm font-medium text-gray-900">{worker.rating}</span>
                    </div>
                    <span className={`badge ${
                      worker.status === 'active' ? 'badge-success' : 
                      worker.status === 'inactive' ? 'badge-warning' : 'badge-danger'
                    }`}>
                      {worker.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview */}
        <div className="card animate-slide-in" style={{ animationDelay: '200ms' }}>
          <div className="card-header">
            <h3 className="text-lg font-semibold text-gray-900">Performance Metrics</h3>
          </div>
          <div className="card-body">
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Worker Satisfaction</span>
                  <span className="text-sm font-bold text-green-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full shadow-sm" style={{ width: '92%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Job Completion Rate</span>
                  <span className="text-sm font-bold text-blue-600">88%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full shadow-sm" style={{ width: '88%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Response Time</span>
                  <span className="text-sm font-bold text-yellow-600">76%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 h-3 rounded-full shadow-sm" style={{ width: '76%' }}></div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Customer Rating</span>
                  <span className="text-sm font-bold text-purple-600">4.8/5</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full shadow-sm" style={{ width: '95%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;