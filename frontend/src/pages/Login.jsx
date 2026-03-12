import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  CircularProgress,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { slideInTextLines } from '../components/animations/gsapUtils';

const Login = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', type: 'success' });
  const navigate = useNavigate();
  const formRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  useEffect(() => {
    // Check if already authenticated
    if (localStorage.getItem('token')) {
      navigate('/');
    }

    // Animate form elements (wrapped in try-catch for safety)
    try {
      const textElements = [titleRef.current, subtitleRef.current].filter(Boolean);
      if (textElements.length > 0) {
        slideInTextLines(textElements, 0.2);
      }
    } catch (error) {
      console.warn('Animation error:', error);
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAlert({ open: false, message: '', type: 'success' });

    try {
      const endpoint = isLogin
        ? authAPI.login(email, password)
        : authAPI.register(email, password);

      const response = await endpoint;

      if (response.data?.data?.token) {
        localStorage.setItem('token', response.data.data.token);
        if (response.data.data.id || response.data.data._id) {
          localStorage.setItem('userId', response.data.data.id || response.data.data._id);
        }

        setAlert({
          open: true,
          message: isLogin ? 'Login successful!' : 'Registration successful!',
          type: 'success',
        });

        onLoginSuccess();

        setTimeout(() => {
          navigate('/');
        }, 500);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || 'An error occurred. Please try again.';
      setAlert({
        open: true,
        message,
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={10}
          sx={{
            p: 4,
            borderRadius: '16px',
            background: 'white',
          }}
        >
          <Typography
            ref={titleRef}
            variant="h4"
            sx={{
              fontWeight: 'bold',
              textAlign: 'center',
              mb: 1,
              color: '#333',
            }}
          >
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="body2"
            color="textSecondary"
            sx={{
              textAlign: 'center',
              mb: 3,
            }}
          >
            {isLogin
              ? 'Sign in to access your projects'
              : 'Register to get started'}
          </Typography>

          {alert.open && (
            <Alert severity={alert.type} sx={{ mb: 2 }}>
              {alert.message}
            </Alert>
          )}

          <Box
            ref={formRef}
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
            }}
          >
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />

            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              required
              variant="outlined"
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontWeight: 'bold',
                py: 1.5,
                fontSize: '1rem',
              }}
            >
              {loading ? <CircularProgress size={24} /> : isLogin ? 'Sign In' : 'Register'}
            </Button>
          </Box>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              {' '}
              <Button
                onClick={() => {
                  setIsLogin(!isLogin);
                  setEmail('');
                  setPassword('');
                  setAlert({ open: false, message: '', type: 'success' });
                }}
                sx={{
                  color: '#667eea',
                  fontWeight: 'bold',
                  textTransform: 'none',
                  p: 0,
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </Button>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;
