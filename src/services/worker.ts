// Mock API service for worker management
// In a real application, replace these with actual API calls

import type { Worker } from '../context/AdminContext';

export interface WorkerStats {
  totalWorkers: number;
  activeWorkers: number;
  inactiveWorkers: number;
  suspendedWorkers: number;
  averageRating: number;
  totalCompletedJobs: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
}

export const workerService = {
  async getAllWorkers(): Promise<ApiResponse<Worker[]>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // This would normally fetch from your API
    // For now, we'll return empty array as the context handles mock data
    return {
      success: true,
      data: []
    };
  },

  async getWorkerById(): Promise<ApiResponse<Worker>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock response - in real app, fetch from API
    return {
      success: true,
      data: undefined // Will be handled by context
    };
  },

  async createWorker(workerData: Omit<Worker, 'id'>): Promise<ApiResponse<Worker>> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock successful creation
    const newWorker: Worker = {
      ...workerData,
      id: Date.now().toString()
    };
    
    return {
      success: true,
      data: newWorker,
      message: 'Worker created successfully'
    };
  },

  async updateWorker(): Promise<ApiResponse<Worker>> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      message: 'Worker updated successfully'
    };
  },

  async deleteWorker(): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      message: 'Worker deleted successfully'
    };
  },

  async getWorkerStats(): Promise<ApiResponse<WorkerStats>> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    // Mock stats - in real app, calculate from API data
    const mockStats: WorkerStats = {
      totalWorkers: 4,
      activeWorkers: 3,
      inactiveWorkers: 1,
      suspendedWorkers: 0,
      averageRating: 4.75,
      totalCompletedJobs: 760
    };
    
    return {
      success: true,
      data: mockStats
    };
  },

  async searchWorkers(): Promise<ApiResponse<Worker[]>> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // This would normally search via API
    return {
      success: true,
      data: [] // Will be handled by context
    };
  },

  async updateWorkerStatus(): Promise<ApiResponse<void>> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      message: `Worker status updated to ${status}`
    };
  }
};