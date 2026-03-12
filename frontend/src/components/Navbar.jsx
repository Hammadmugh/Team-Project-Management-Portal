import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useTheme,
  useMediaQuery
} from '@mui/material';

import { useNavigate, useLocation } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

const Navbar = ({ isAuthenticated, onLogout }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    handleMenuClose();
    onLogout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}
      >

        <Toolbar sx={{ px: 2 }}>

          {/* Logo */}
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              cursor: 'pointer',
              marginRight: 'auto',
              fontSize: { xs: '1rem', sm: '1.25rem', md: '1.5rem' }
            }}
            onClick={() => navigate('/')}
          >
            📊 Project Portal
          </Typography>

          {isAuthenticated ? (

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>

              {/* Desktop Navigation */}
              <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1 }}>

                <Button
                  color="inherit"
                  onClick={() => navigate('/')}
                  sx={{
                    fontWeight: isActive('/') ? 'bold' : 'normal',
                    borderBottom: isActive('/') ? '3px solid white' : 'none'
                  }}
                >
                  Dashboard
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate('/projects')}
                  sx={{
                    fontWeight: isActive('/projects') ? 'bold' : 'normal',
                    borderBottom: isActive('/projects') ? '3px solid white' : 'none'
                  }}
                >
                  Projects
                </Button>

                <Button
                  color="inherit"
                  onClick={() => navigate('/members')}
                  sx={{
                    fontWeight: isActive('/members') ? 'bold' : 'normal',
                    borderBottom: isActive('/members') ? '3px solid white' : 'none'
                  }}
                >
                  Members
                </Button>

                <Button
                  color="inherit"
                  onClick={handleMenuOpen}
                  startIcon={<MenuIcon />}
                >
                  Menu
                </Button>

              </Box>

              {/* Mobile Hamburger */}
              <Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
                <Button
                  color="inherit"
                  onClick={() => setMobileMenuOpen(true)}
                  sx={{ minWidth: 'auto' }}
                >
                  <MenuIcon />
                </Button>
              </Box>

              {/* Desktop Menu */}
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ mr: 1 }} />
                  Logout
                </MenuItem>
              </Menu>

            </Box>

          ) : (

            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => navigate('/login')}
                sx={{ fontWeight: 'bold' }}
              >
                Login
              </Button>
            </Box>

          )}

        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="left"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 250 }}>

          <List>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/');
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/projects');
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText primary="Projects" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  navigate('/members');
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText primary="Members" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  handleLogout();
                  setMobileMenuOpen(false);
                }}
              >
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>

          </List>

        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;