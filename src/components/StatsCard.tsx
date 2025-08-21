import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ size?: number; className?: string; }>;
  change?: {
    value: number;
    type: 'increase' | 'decrease';
  };
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  change, 
  color = 'blue' 
}) => {
  const colorClasses = {
    blue: { bg: 'bg-blue-500', text: 'text-blue-600', light: 'bg-blue-50', gradient: 'from-blue-500 to-blue-600' },
    green: { bg: 'bg-green-500', text: 'text-green-600', light: 'bg-green-50', gradient: 'from-green-500 to-green-600' },
    yellow: { bg: 'bg-yellow-500', text: 'text-yellow-600', light: 'bg-yellow-50', gradient: 'from-yellow-500 to-yellow-600' },
    red: { bg: 'bg-red-500', text: 'text-red-600', light: 'bg-red-50', gradient: 'from-red-500 to-red-600' },
    purple: { bg: 'bg-purple-500', text: 'text-purple-600', light: 'bg-purple-50', gradient: 'from-purple-500 to-purple-600' }
  };

  const colors = colorClasses[color];

  return (
    <div className="stats-card group animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-500 mb-2 uppercase tracking-wide">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
          
          {change && (
            <div className="flex items-center mt-3">
              <div className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                change.type === 'increase' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                <svg 
                  className={`w-3 h-3 mr-1 ${
                    change.type === 'increase' ? 'text-green-600' : 'text-red-600'
                  }`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  {change.type === 'increase' ? (
                    <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  ) : (
                    <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  )}
                </svg>
                {Math.abs(change.value)}%
              </div>
              <span className="text-xs text-gray-500 ml-2">from last month</span>
            </div>
          )}
        </div>
        
        <div className="stats-card-icon">
          <div className={`w-full h-full rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-200`}>
            <Icon className="text-white" size={28} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;