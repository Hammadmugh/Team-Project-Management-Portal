import React, { useEffect, useRef } from 'react';
import {
  Box,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  Card,
  CardContent,
  Chip,
} from '@mui/material';
import { stepperStepAnimation } from './animations/gsapUtils';

const TimelineView = ({ project }) => {
  const stepsRef = useRef([]);

  useEffect(() => {
    if (stepsRef.current) {
      const steps = stepsRef.current.querySelectorAll('[data-timeline-step]');
      steps.forEach((step, idx) => {
        stepperStepAnimation(step, idx, 0.2);
      });
    }
  }, [project]);

  const steps = [
    {
      label: 'Project Created',
      description: `Project "${project?.title}" was created on ${
        project?.createdAt
          ? new Date(project.createdAt).toLocaleDateString()
          : 'N/A'
      }`,
      status: 'completed',
    },
    {
      label: 'Team Assigned',
      description: `${
        project?.members?.length || 0
      } team members assigned to this project`,
      status: project?.members?.length > 0 ? 'completed' : 'pending',
    },
    {
      label: 'In Progress',
      description:
        project?.status === 'active'
          ? 'Project is currently active and being worked on'
          : 'Project has been completed',
      status: project?.status === 'active' ? 'in-progress' : 'completed',
    },
    {
      label: 'Completion',
      description:
        project?.status === 'completed'
          ? `Project was completed on ${
              project?.updatedAt
                ? new Date(project.updatedAt).toLocaleDateString()
                : 'N/A'
            }`
          : 'Awaiting project completion',
      status: project?.status === 'completed' ? 'completed' : 'pending',
    },
  ];

  return (
    <Box ref={stepsRef} sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: 'bold', mb: 4 }}>
        Project Timeline
      </Typography>

      <Stepper orientation="vertical">
        {steps.map((step, idx) => (
          <Step key={idx} data-timeline-step active={true}>
            <StepLabel
              sx={{
                '& .MuiStepLabel-label': {
                  fontSize: '1.1rem',
                  fontWeight: '500',
                },
              }}
            >
              {step.label}
              <Box sx={{ ml: 2, display: 'inline-block' }}>
                <Chip
                  label={step.status}
                  size="small"
                  color={
                    step.status === 'completed'
                      ? 'success'
                      : step.status === 'in-progress'
                        ? 'warning'
                        : 'default'
                  }
                  variant="outlined"
                />
              </Box>
            </StepLabel>

            <StepContent>
              <Card sx={{ mb: 2, background: '#f5f7fa' }}>
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default TimelineView;
