import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, Edit, Trash2, Star } from 'lucide-react';
import type { Worker } from '../context/AdminContext';

interface WorkerTableProps {
  workers: Worker[];
  onEdit?: (worker: Worker) => void;
  onDelete?: (workerId: string) => void;
  onStatusChange?: (workerId: string, status: Worker['status']) => void;
}

const WorkerTable: React.FC<WorkerTableProps> = ({ 
  workers, 
  onEdit, 
  onDelete, 
  onStatusChange 
}) => {
  const getStatusBadge = (status: Worker['status']) => {
    const statusClasses = {
      active: 'badge-success',
      inactive: 'badge-warning',
      suspended: 'badge-danger'
    };

    return (
      <span className={`badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-1 text-sm text-gray-600">{rating}</span>
      </div>
    );
  };

  if (workers.length === 0) {
    return (
      <div className="card p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No workers found</h3>
        <p className="text-gray-500">Get started by adding your first worker to the system.</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Worker</th>
              <th>Contact</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Jobs Completed</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker, index) => (
              <tr key={worker.id} className="animate-slide-in" style={{ animationDelay: `${index * 50}ms` }}>
                <td>
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-sm">
                        <span className="text-white font-semibold text-lg">
                          {worker.name.charAt(0)}
                        </span>
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{worker.name}</div>
                      <div className="text-sm text-gray-500 flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {worker.location}
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900">{worker.email}</div>
                    <div className="text-sm text-gray-500">{worker.phone}</div>
                  </div>
                </td>
                <td>
                  <span className="badge badge-info">
                    {worker.specialization}
                  </span>
                </td>
                <td>
                  {onStatusChange ? (
                    <select
                      value={worker.status}
                      onChange={(e) => onStatusChange(worker.id, e.target.value as Worker['status'])}
                      className="form-input text-sm py-1 px-2 w-auto"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="suspended">Suspended</option>
                    </select>
                  ) : (
                    getStatusBadge(worker.status)
                  )}
                </td>
                <td>
                  {renderStars(worker.rating)}
                </td>
                <td>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-gray-900">{worker.completedJobs}</span>
                    <span className="text-xs text-gray-500">jobs</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-1">
                    <Link
                      to={`/workers/${worker.id}`}
                      className="p-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-all duration-200"
                      title="View Details"
                    >
                      <Eye size={16} />
                    </Link>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(worker)}
                        className="p-2 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-lg transition-all duration-200"
                        title="Edit Worker"
                      >
                        <Edit size={16} />
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(worker.id)}
                        className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-all duration-200"
                        title="Delete Worker"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default WorkerTable;