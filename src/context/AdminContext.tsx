import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export interface Worker {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialization: string;
  status: 'active' | 'inactive' | 'suspended';
  rating: number;
  completedJobs: number;
  joinDate: string;
  location: string;
  avatar?: string;
}

interface AdminContextType {
  workers: Worker[];
  addWorker: (worker: Omit<Worker, 'id'>) => void;
  updateWorker: (id: string, updates: Partial<Worker>) => void;
  deleteWorker: (id: string) => void;
  getWorkerById: (id: string) => Worker | undefined;
  searchWorkers: (query: string) => Worker[];
  filterWorkers: (status?: string, specialization?: string) => Worker[];
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

interface AdminProviderProps {
  children: ReactNode;
}

// Mock data
const mockWorkers: Worker[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1234567890',
    specialization: 'Plumbing',
    status: 'active',
    rating: 4.8,
    completedJobs: 156,
    joinDate: '2023-01-15',
    location: 'New York, NY'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1234567891',
    specialization: 'Electrical',
    status: 'active',
    rating: 4.9,
    completedJobs: 203,
    joinDate: '2022-11-20',
    location: 'Los Angeles, CA'
  },
  {
    id: '3',
    name: 'Mike Davis',
    email: 'mike.davis@email.com',
    phone: '+1234567892',
    specialization: 'Carpentry',
    status: 'inactive',
    rating: 4.6,
    completedJobs: 89,
    joinDate: '2023-03-10',
    location: 'Chicago, IL'
  },
  {
    id: '4',
    name: 'Emily Brown',
    email: 'emily.brown@email.com',
    phone: '+1234567893',
    specialization: 'Cleaning',
    status: 'active',
    rating: 4.7,
    completedJobs: 312,
    joinDate: '2022-08-05',
    location: 'Houston, TX'
  }
];

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [workers, setWorkers] = useState<Worker[]>(mockWorkers);

  const addWorker = (workerData: Omit<Worker, 'id'>) => {
    const newWorker: Worker = {
      ...workerData,
      id: Date.now().toString()
    };
    setWorkers(prev => [...prev, newWorker]);
  };

  const updateWorker = (id: string, updates: Partial<Worker>) => {
    setWorkers(prev => prev.map(worker => 
      worker.id === id ? { ...worker, ...updates } : worker
    ));
  };

  const deleteWorker = (id: string) => {
    setWorkers(prev => prev.filter(worker => worker.id !== id));
  };

  const getWorkerById = (id: string) => {
    return workers.find(worker => worker.id === id);
  };

  const searchWorkers = (query: string) => {
    if (!query.trim()) return workers;
    
    const lowercaseQuery = query.toLowerCase();
    return workers.filter(worker => 
      worker.name.toLowerCase().includes(lowercaseQuery) ||
      worker.email.toLowerCase().includes(lowercaseQuery) ||
      worker.specialization.toLowerCase().includes(lowercaseQuery) ||
      worker.location.toLowerCase().includes(lowercaseQuery)
    );
  };

  const filterWorkers = (status?: string, specialization?: string) => {
    return workers.filter(worker => {
      const statusMatch = !status || worker.status === status;
      const specializationMatch = !specialization || worker.specialization === specialization;
      return statusMatch && specializationMatch;
    });
  };

  const value = {
    workers,
    addWorker,
    updateWorker,
    deleteWorker,
    getWorkerById,
    searchWorkers,
    filterWorkers
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

// Explicit export for better module resolution