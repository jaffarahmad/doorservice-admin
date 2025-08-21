import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminProvider } from './context/AdminContext';
import PrivateRoute from './routes/PrivateRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Workers from './pages/Workers';
import WorkerDetails from './pages/WorkerDetails';
import AddWorker from './pages/AddWorker';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import { useAuth } from './context/AuthContext';

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AdminProvider>
        <Router>
          <AppLayout>
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={<Login />} />
              
              {/* Protected Routes */}
              <Route path="/" element={
                <PrivateRoute>
                  <Navigate to="/dashboard" replace />
                </PrivateRoute>
              } />
              
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              
              <Route path="/workers" element={
                <PrivateRoute>
                  <Workers />
                </PrivateRoute>
              } />
              
              <Route path="/workers/:id" element={
                <PrivateRoute>
                  <WorkerDetails />
                </PrivateRoute>
              } />
              
              <Route path="/add-worker" element={
                <PrivateRoute>
                  <AddWorker />
                </PrivateRoute>
              } />
              
              <Route path="/reports" element={
                <PrivateRoute>
                  <Reports />
                </PrivateRoute>
              } />
              
              <Route path="/settings" element={
                <PrivateRoute>
                  <Settings />
                </PrivateRoute>
              } />
              
              {/* Catch all route */}
              <Route path="*" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </AppLayout>
        </Router>
      </AdminProvider>
    </AuthProvider>
  );
};

export default App;
