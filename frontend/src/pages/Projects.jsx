import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Button,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ProjectsGrid from '../components/ProjectsGrid';
import ProjectDialog from '../components/ProjectDialog';
import { projectsAPI } from '../services/api';
import { pageTransitionIn } from '../components/animations/gsapUtils';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', type: 'success' });
  const pageRef = useRef(null);

  useEffect(() => {
    pageTransitionIn(pageRef.current);
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await projectsAPI.getProjects();
      setProjects(response.data?.data || []);
    } catch (error) {
      showAlert('Error fetching projects', 'error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setIsEditing(false);
    setSelectedProject(null);
    setDialogOpen(true);
  };

  const handleEditProject = (project) => {
    setIsEditing(true);
    setSelectedProject(project);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedProject(null);
    setIsEditing(false);
  };

  const handleSaveProject = async (projectData) => {
    try {
      setDialogLoading(true);

      if (isEditing) {
        await projectsAPI.updateProject(selectedProject._id, projectData);
        showAlert('Project updated successfully', 'success');
      } else {
        await projectsAPI.createProject(projectData);
        showAlert('Project created successfully', 'success');
      }

      handleCloseDialog();
      fetchProjects();
    } catch (error) {
      showAlert('Error saving project', 'error');
      console.error('Error:', error);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    if (!window.confirm('Are you sure you want to delete this project?')) {
      return;
    }

    try {
      await projectsAPI.deleteProject(projectId);
      showAlert('Project deleted successfully', 'success');
      fetchProjects();
    } catch (error) {
      showAlert('Error deleting project', 'error');
      console.error('Error:', error);
    }
  };

  const showAlert = (message, type) => {
    setAlert({ open: true, message, type });
    setTimeout(() => setAlert({ open: false, message: '', type: 'success' }), 3000);
  };

  return (
    <Box
      ref={pageRef}
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 4,
          }}
        >
          <Box>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 1,
                color: '#333',
              }}
            >
              Projects
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage and track all your projects
            </Typography>
          </Box>

          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            sx={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              fontWeight: 'bold',
              px: 3,
            }}
          >
            New Project
          </Button>
        </Box>

        {alert.open && (
          <Alert
            severity={alert.type}
            onClose={() => setAlert({ ...alert, open: false })}
            sx={{ mb: 3 }}
          >
            {alert.message}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ProjectsGrid
            projects={projects}
            loading={false}
            onEdit={handleEditProject}
            onDelete={handleDeleteProject}
          />
        )}
      </Container>

      <ProjectDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveProject}
        isEditing={isEditing}
        initialData={selectedProject}
        loading={dialogLoading}
      />
    </Box>
  );
};

export default Projects;
