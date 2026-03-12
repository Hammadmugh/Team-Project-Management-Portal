import React, { useEffect, useRef } from 'react';
import { Box, Card, CardContent, Typography } from '@mui/material';
import { countUpAnimation, cardSlideIn } from './animations/gsapUtils';

const StatsWidget = ({ icon: Icon, label, value, color = '#667eea' }) => {
  const countRef = useRef(null);
  const cardRef = useRef(null);

  useEffect(() => {
    if (countRef.current) {
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        countUpAnimation(countRef.current, value, 2);
      }, 100);
    }

    // Card slide in animation
    if (cardRef.current) {
      cardSlideIn([cardRef.current], 0);
    }
  }, [value]);

  return (
    <Card
      ref={cardRef}
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
        border: `2px solid ${color}30`,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 12px 24px ${color}30`,
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 2,
            color,
          }}
        >
          <Icon sx={{ fontSize: '2.5rem' }} />
        </Box>

        <Typography
          ref={countRef}
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color,
            marginBottom: 1,
          }}
        >
          0
        </Typography>

        <Typography
          variant="body2"
          sx={{
            textTransform: 'uppercase',
            letterSpacing: 1,
            fontWeight: 500,
            color: '#666',
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatsWidget;
