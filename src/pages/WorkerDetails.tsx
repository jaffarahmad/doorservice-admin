import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Star,
  Briefcase,
  Edit,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';

const WorkerDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getWorkerById, updateWorker, deleteWorker } = useAdmin();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const worker = id ? getWorkerById(id) : null;

  if (!worker) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Worker Not Found</h2>
          <p className="text-gray-600 mb-6">The worker you're looking for doesn't exist.</p>
          <Link
            to="/workers"
            className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft size={16} />
            <span>Back to Workers</span>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="text-green-600" size={20} />;
      case 'inactive':
        return <XCircle className="text-gray-600" size={20} />;
      case 'suspended':
        return <AlertCircle className="text-red-600" size={20} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'suspended':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStatusChange = (newStatus: 'active' | 'inactive' | 'suspended') => {
    updateWorker(worker.id, { status: newStatus });
  };

  const handleDelete = () => {
    deleteWorker(worker.id);
    navigate('/workers');
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={16}
            className={`${i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
        <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/workers"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Worker Details</h1>
            <p className="text-gray-600">View and manage worker information</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Edit size={16} />
            <span>Edit</span>
          </button>
          <button
            onClick={() => setShowDeleteModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            <Trash2 size={16} />
            <span>Delete</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-xl font-bold">
                    {worker.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{worker.name}</h2>
                  <p className="text-gray-600">{worker.specialization}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    {getStatusIcon(worker.status)}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(worker.status)}`}>
                      {worker.status.charAt(0).toUpperCase() + worker.status.slice(1)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium text-gray-900">{worker.email}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium text-gray-900">{worker.phone}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-medium text-gray-900">{worker.location}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="text-gray-400" size={20} />
                  <div>
                    <p className="text-sm text-gray-600">Join Date</p>
                    <p className="font-medium text-gray-900">
                      {new Date(worker.joinDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Metrics */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Star className="text-yellow-400" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{worker.rating}</p>
                <p className="text-sm text-gray-600">Average Rating</p>
                {renderStars(worker.rating)}
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Briefcase className="text-blue-600" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900">{worker.completedJobs}</p>
                <p className="text-sm text-gray-600">Completed Jobs</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <p className="text-2xl font-bold text-gray-900">98%</p>
                <p className="text-sm text-gray-600">Success Rate</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status Management */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Management</h3>
            <div className="space-y-3">
              <button
                onClick={() => handleStatusChange('active')}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  worker.status === 'active'
                    ? 'bg-green-600 text-white'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                <CheckCircle size={16} />
                <span>Set Active</span>
              </button>
              
              <button
                onClick={() => handleStatusChange('inactive')}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  worker.status === 'inactive'
                    ? 'bg-gray-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <XCircle size={16} />
                <span>Set Inactive</span>
              </button>
              
              <button
                onClick={() => handleStatusChange('suspended')}
                className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  worker.status === 'suspended'
                    ? 'bg-red-600 text-white'
                    : 'bg-red-100 text-red-700 hover:bg-red-200'
                }`}
              >
                <AlertCircle size={16} />
                <span>Suspend</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Response Time</span>
                <span className="font-medium">&lt; 2 hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completion Rate</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Customer Satisfaction</span>
                <span className="font-medium">4.8/5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Earnings</span>
                <span className="font-medium">$12,450</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete <strong>{worker.name}</strong>? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
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

export default WorkerDetails;