import React, { useEffect, useRef } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Grid,
  Avatar,
  CircularProgress,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { cardSlideIn, cardHoverAnimation, cardHoverAnimationReverse } from './animations/gsapUtils';

const MembersGrid = ({ members, loading, onEdit, onDelete }) => {
  const gridRef = useRef(null);

  useEffect(() => {
    if (gridRef.current && members.length > 0) {
      const cards = gridRef.current.querySelectorAll('[data-member-card]');
      cardSlideIn(cards, 0.08);
    }
  }, [members]);

  const handleCardHover = (e) => {
    cardHoverAnimation(e.currentTarget);
  };

  const handleCardHoverOut = (e) => {
    cardHoverAnimationReverse(e.currentTarget);
  };

  const getAvatarColor = () => {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#00f2fe'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (members.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h6" color="textSecondary">
          No team members found. Add one to get started!
        </Typography>
      </Box>
    );
  }

  return (
    <Grid ref={gridRef} container spacing={3}>
      {members.map((member) => (
        <Grid item xs={12} sm={6} md={4} key={member._id}>
          <Card
            data-member-card
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
            <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  margin: '0 auto 16px',
                  backgroundColor: getAvatarColor(),
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                {member.name?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                {member.name}
              </Typography>

              <Typography
                variant="body2"
                color="textSecondary"
                sx={{ mb: 2, wordBreak: 'break-all' }}
              >
                {member.email}
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', mb: 1 }}>
                <Chip
                  label={member.role || 'Team Member'}
                  color="primary"
                  size="small"
                  variant="outlined"
                />
              </Box>
            </CardContent>

            <CardActions sx={{ pt: 0, justifyContent: 'center' }}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => onEdit(member)}
                sx={{ color: '#667eea' }}
              >
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => onDelete(member._id)}
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

export default MembersGrid;
