import React, { useEffect, useState, useRef } from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import GroupIcon from '@mui/icons-material/Group';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AssignmentIcon from '@mui/icons-material/Assignment';
import HeroSection from '../components/HeroSection';
import StatsWidget from '../components/StatsWidget';
import { projectsAPI, membersAPI } from '../services/api';
import { pageTransitionIn } from '../components/animations/gsapUtils';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeProjects: 0,
    completedProjects: 0,
    teamSize: 0,
  });
  const pageRef = useRef(null);

  useEffect(() => {
    console.log('🖨️ Dashboard mounted');
    pageTransitionIn(pageRef.current);
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      console.log('🖨️ Fetching dashboard stats...');
      const [projectsRes, membersRes] = await Promise.all([
        projectsAPI.getProjects(),
        membersAPI.getMembers(),
      ]);

      const projects = projectsRes.data?.data || [];
      const members = membersRes.data?.data || [];

      console.log('🖨️ Stats fetched - Projects:', projects.length, 'Members:', members.length);

      const activeCount = projects.filter((p) => p.status === 'active').length;
      const completedCount = projects.filter(
        (p) => p.status === 'completed'
      ).length;

      setStats({
        totalProjects: projects.length,
        activeProjects: activeCount,
        completedProjects: completedCount,
        teamSize: members.length,
      });
    } catch (error) {
      console.error('🚨 Error fetching stats:', error);
      // Keep the original state on error - don't break the page
    }
  };

  return (
    <Box ref={pageRef} sx={{ minHeight: '100vh', background: '#f8f9fa' }}>
      <Box sx={{ padding: '10px', background: '#e8f5e9', borderBottom: '2px solid #4caf50' }}>
        <Typography sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
          ✅ Dashboard Loaded Successfully
        </Typography>
      </Box>
      <HeroSection />

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ mb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 1,
              color: '#333',
            }}
          >
            Your Statistics
          </Typography>
          <Typography
            variant="body1"
            color="textSecondary"
            sx={{ mb: 4 }}
          >
            Get a quick overview of your project management metrics
          </Typography>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              icon={FolderIcon}
              label="Total Projects"
              value={stats.totalProjects}
              color="#667eea"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              icon={AssignmentIcon}
              label="Active Projects"
              value={stats.activeProjects}
              color="#f093fb"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              icon={CheckCircleIcon}
              label="Completed"
              value={stats.completedProjects}
              color="#4facfe"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatsWidget
              icon={GroupIcon}
              label="Team Members"
              value={stats.teamSize}
              color="#00f2fe"
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard;
