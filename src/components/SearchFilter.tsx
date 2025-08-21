import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  specializations?: string[];
}

export interface FilterOptions {
  status?: string;
  specialization?: string;
  rating?: number;
}

const SearchFilter: React.FC<SearchFilterProps> = ({ 
  onSearch, 
  onFilter, 
  specializations = ['Plumbing', 'Electrical', 'Carpentry', 'Cleaning', 'HVAC', 'Painting'] 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    status: '',
    specialization: '',
    rating: undefined
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (key: keyof FilterOptions, value: string | number) => {
    const newFilters = {
      ...filters,
      [key]: value === '' ? undefined : value
    };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      status: '',
      specialization: '',
      rating: undefined
    };
    setFilters(clearedFilters);
    onFilter({});
  };

  const hasActiveFilters = filters.status || filters.specialization || filters.rating;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search workers by name, email, location..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filter Toggle */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              showFilters || hasActiveFilters
                ? 'bg-blue-50 border-blue-300 text-blue-700'
                : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
            <span>Filters</span>
            {hasActiveFilters && (
              <span className="bg-blue-600 text-white text-xs rounded-full px-2 py-0.5">
                {Object.values(filters).filter(Boolean).length}
              </span>
            )}
          </button>
          
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X size={16} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Status Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={filters.status || ''}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            {/* Specialization Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>
              <select
                value={filters.specialization || ''}
                onChange={(e) => handleFilterChange('specialization', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">All Specializations</option>
                {specializations.map((spec) => (
                  <option key={spec} value={spec}>
                    {spec}
                  </option>
                ))}
              </select>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Minimum Rating
              </label>
              <select
                value={filters.rating || ''}
                onChange={(e) => handleFilterChange('rating', e.target.value ? parseFloat(e.target.value) : '')}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
                <option value="3.0">3.0+ Stars</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;