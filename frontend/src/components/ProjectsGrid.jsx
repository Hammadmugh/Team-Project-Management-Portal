import React, { useEffect, useRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useNavigate } from 'react-router-dom';
import { cardSlideIn, cardHoverAnimation, cardHoverAnimationReverse } from './animations/gsapUtils';

const ProjectsGrid = ({ projects, loading, onEdit, onDelete }) => {
  const gridRef = useRef(null);
  const navigate = useNavigate();
  const [animatedCards, setAnimatedCards] = useState(new Set());

  useEffect(() => {
    if (gridRef.current && projects.length > 0) {
      const cards = gridRef.current.querySelectorAll('[data-project-card]');
      cardSlideIn(cards, 0.08);
    }
  }, [projects]);

  const handleCardHover = (e) => {
    cardHoverAnimation(e.currentTarget);
  };

  const handleCardHoverOut = (e) => {
    cardHoverAnimationReverse(e.currentTarget);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (projects.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="textSecondary">
          No projects found. Create one to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid ref={gridRef} container spacing={3}>
      {projects.map((project) => (
        <Grid item xs={12} sm={6} md={4} key={project._id}>
          <Card
            data-project-card
            onMouseEnter={handleCardHover}
            onMouseLeave={handleCardHoverOut}
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
              border: '1px solid #e0e0e0',
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {project.title}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 2, minHeight: '40px' }}
              >
                {project.description}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                <Chip
                  label={project.status || 'active'}
                  color={project.status === 'completed' ? 'error' : 'success'}
                  size="small"
                  variant="outlined"
                />
                {project.techStack?.length > 0 && (
                  <Chip
                    label={`${project.techStack.length} techs`}
                    size="small"
                    variant="outlined"
                  />
                )}
              </Box>

              {project.techStack?.length > 0 && (
                <Box sx={{ mb: 1 }}>
                  <Typography variant="caption" color="textSecondary">
                    Stack: {project.techStack.slice(0, 2).join(', ')}
                    {project.techStack.length > 2 ? '...' : ''}
                  </Typography>
                </Box>
              )}
            </CardContent>

            <CardActions sx={{ pt: 0 }}>
              <Button
                size="small"
                startIcon={<VisibilityIcon />}
                onClick={() => navigate(`/projects/${project._id}`)}
                sx={{ color: '#667eea' }}
              >
                View
              </Button>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => onEdit(project)}
                sx={{ color: '#764ba2' }}
              >
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(project._id)}
                sx={{ color: '#ff6b6b' }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectsGrid;
