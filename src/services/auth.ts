// Mock API service for authentication
// In a real application, replace these with actual API calls

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    role: string;
  };
  message?: string;
}

export const authService = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (credentials.email === 'admin@doorservice.com' && credentials.password === 'admin123') {
      return {
        success: true,
        token: 'mock-jwt-token-' + Date.now(),
        user: {
          id: '1',
          email: 'admin@doorservice.com',
          role: 'admin'
        }
      };
    }
    
    return {
      success: false,
      message: 'Invalid email or password'
    };
  },

  async logout(): Promise<void> {
    // In a real app, you might want to invalidate the token on the server
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
  },

  async validateToken(token: string): Promise<boolean> {
    // Simulate token validation
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock validation - in real app, send token to server for validation
    return token.startsWith('mock-jwt-token');
  },

  async changePassword(currentPassword: string): Promise<AuthResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock password change logic
    if (currentPassword === 'admin123') {
      return {
        success: true,
        message: 'Password changed successfully'
      };
    }
    
    return {
      success: false,
      message: 'Current password is incorrect'
    };
  }
};