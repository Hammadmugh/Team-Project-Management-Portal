import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Members from './pages/Members';
import Login from './pages/Login';
import ProjectDetail from './pages/ProjectDetail';

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f8f9fa',
    },
  },
  typography: {
    fontFamily: "'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif",
  },
});

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log('🖨️ App rendering', { isAuthenticated, loading });

  useEffect(() => {
    console.log('🖨️ useEffect running');
    // Check if user is already logged in
    const token = localStorage.getItem('token');
    console.log('🖨️ Token found:', !!token);
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    console.log('🖨️ Login success');
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    console.log('🖨️ Logout');
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };

  if (loading) {
    console.log('🖨️ Still loading');
    return (
      <div style={{ 
        fontSize: '32px', 
        fontWeight: 'bold',
        color: '#667eea',
        padding: '40px',
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        ⏳ Loading...
      </div>
    );
  }

  console.log('🖨️ Rendering main app, isAuthenticated:', isAuthenticated);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} />
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" replace />
              ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
              )
            }
          />

          <Route
            path="/"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Projects />
              </ProtectedRoute>
            }
          />

          <Route
            path="/projects/:projectId"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <ProjectDetail />
              </ProtectedRoute>
            }
          />

          <Route
            path="/members"
            element={
              <ProtectedRoute isAuthenticated={isAuthenticated}>
                <Members />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;