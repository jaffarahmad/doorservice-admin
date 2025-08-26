import React, { useState, useEffect } from 'react';
import { Plus, Download, Upload } from 'lucide-react';
import { Link } from 'react-router-dom';
import WorkerTable from '../components/WorkerTable';
import SearchFilter from '../components/SearchFilter';
import type { FilterOptions } from '../components/SearchFilter';
import { useAdmin } from '../context/AdminContext';
import type { Worker } from '../context/AdminContext';

const Workers: React.FC = () => {
  const { workers, updateWorker, deleteWorker, searchWorkers } = useAdmin();
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>(workers);
  const [currentSearch, setCurrentSearch] = useState('');
  const [currentFilters, setCurrentFilters] = useState<FilterOptions>({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [workerToDelete, setWorkerToDelete] = useState<string | null>(null);

  useEffect(() => {
    applyFiltersAndSearch();
  }, [workers, currentSearch, currentFilters]);

  const applyFiltersAndSearch = () => {
    let result = workers;

    // Apply search first
    if (currentSearch) {
      result = searchWorkers(currentSearch);
    }

    // Then apply filters
    if (currentFilters.status || currentFilters.specialization || currentFilters.rating) {
      result = result.filter(worker => {
        const statusMatch = !currentFilters.status || worker.status === currentFilters.status;
        const specializationMatch = !currentFilters.specialization || worker.specialization === currentFilters.specialization;
        const ratingMatch = !currentFilters.rating || worker.rating >= currentFilters.rating;
        
        return statusMatch && specializationMatch && ratingMatch;
      });
    }

    setFilteredWorkers(result);
  };

  const handleSearch = (query: string) => {
    setCurrentSearch(query);
  };

  const handleFilter = (filters: FilterOptions) => {
    setCurrentFilters(filters);
  };

  const handleStatusChange = (workerId: string, status: Worker['status']) => {
    updateWorker(workerId, { status });
  };

  const handleDeleteClick = (workerId: string) => {
    setWorkerToDelete(workerId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (workerToDelete) {
      deleteWorker(workerToDelete);
      setWorkerToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const cancelDelete = () => {
    setWorkerToDelete(null);
    setShowDeleteModal(false);
  };

  const exportWorkers = () => {
    const csvContent = [
      ['Name', 'Email', 'Phone', 'Specialization', 'Status', 'Rating', 'Completed Jobs', 'Location', 'Join Date'],
      ...filteredWorkers.map(worker => [
        worker.name,
        worker.email,
        worker.phone,
        worker.specialization,
        worker.status,
        worker.rating.toString(),
        worker.completedJobs.toString(),
        worker.location,
        worker.joinDate
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const specializations = [...new Set(workers.map(w => w.specialization))];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Workers</h1>
          <p className="text-gray-600">
            Manage your service workers. Total: {workers.length} workers
          </p>
        </div>
        
        <div className="flex items-center space-x-3 mt-4 sm:mt-0">
          <button
            onClick={exportWorkers}
            className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Download size={16} />
            <span>Export</span>
          </button>
          
          <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors">
            <Upload size={16} />
            <span>Import</span>
          </button>
          
          <Link
            to="/add-worker"
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} />
            <span>Add Worker</span>
          </Link>
        </div>
      </div>

      {/* Search and Filters */}
      <SearchFilter
        onSearch={handleSearch}
        onFilter={handleFilter}
        specializations={specializations}
      />

      {/* Results Summary */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Showing {filteredWorkers.length} of {workers.length} workers
          {currentSearch && (
            <span className="ml-1">
              for "{currentSearch}"
            </span>
          )}
        </p>
      </div>

      {/* Workers Table */}
      <WorkerTable
        workers={filteredWorkers}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteClick}
      />

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this worker? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workers;