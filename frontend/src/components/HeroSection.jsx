import React, { useEffect, useRef } from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  slideInTextLines,
  buttonFloatingAnimation,
  drawSVGPath,
} from './animations/gsapUtils';

const HeroSection = () => {
  const navigate = useNavigate();
  const headingRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const svg1Ref = useRef(null);
  const svg2Ref = useRef(null);

  useEffect(() => {
    console.log('🖨️ HeroSection mounted');
    try {
      // Animate heading and subtitle
      const textElements = [headingRef.current, subtitleRef.current].filter(
        Boolean
      );
      console.log('🖨️ Animating text elements:', textElements.length);
      if (textElements.length > 0) {
        slideInTextLines(textElements, 0.3);
      }

      // Animate buttons
      if (buttonsRef.current) {
        const buttons = buttonsRef.current.querySelectorAll('button');
        console.log('🖨️ Found buttons:', buttons.length);
        buttons.forEach((btn, idx) => {
          buttonFloatingAnimation(btn);
          btn.style.animationDelay = `${idx * 0.2}s`;
        });
      }

      // Animate SVG paths
      if (svg1Ref.current) {
        console.log('🖨️ Animating SVG 1');
        drawSVGPath(svg1Ref.current, 2.5);
      }
      if (svg2Ref.current) {
        console.log('🖨️ Animating SVG 2');
        drawSVGPath(svg2Ref.current, 2);
      }
    } catch (error) {
      console.error('🚨 HeroSection animation error:', error);
    }
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        color: 'white',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Decorative SVG elements */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        <svg
          ref={svg1Ref}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <circle cx="150" cy="150" r="100" />
          <path d="M 100 150 Q 150 100, 200 150 T 300 150" />
        </svg>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      >
        <svg
          ref={svg2Ref}
          width="300"
          height="300"
          viewBox="0 0 300 300"
          fill="none"
          stroke="white"
          strokeWidth="2"
        >
          <rect x="50" y="50" width="200" height="200" />
          <circle cx="150" cy="150" r="50" />
        </svg>
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            ref={headingRef}
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 'bold',
              marginBottom: 2,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
            }}
          >
            Project Management Portal
          </Typography>

          <Typography
            ref={subtitleRef}
            variant="h5"
            sx={{
              marginBottom: 4,
              opacity: 0.9,
              fontSize: { xs: '1rem', md: '1.25rem' },
            }}
          >
            Manage teams, organize projects, and track progress with ease
          </Typography>

          <Box
            ref={buttonsRef}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
            }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/projects')}
              sx={{
                backgroundColor: 'white',
                color: '#667eea',
                fontWeight: 'bold',
                padding: '12px 32px',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: '#f0f0f0',
                },
              }}
            >
              View Projects
            </Button>

            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/members')}
              sx={{
                borderColor: 'white',
                color: 'white',
                fontWeight: 'bold',
                padding: '12px 32px',
                fontSize: '1rem',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderColor: 'white',
                },
              }}
            >
              Manage Team
            </Button>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
