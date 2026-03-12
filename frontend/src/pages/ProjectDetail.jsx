import React, { useEffect, useState, useRef } from 'react';
import {
  Box,
  Container,
  Paper,
  Typography,
  Chip,
  Grid,
  Card,
  CardContent,
  Button,
  CircularProgress,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import TimelineView from '../components/TimelineView';
import { projectsAPI, membersAPI } from '../services/api';
import { pageTransitionIn } from '../components/animations/gsapUtils';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableMembers, setAvailableMembers] = useState([]);
  const [selectedMemberId, setSelectedMemberId] = useState('');
  const [addMemberDialogOpen, setAddMemberDialogOpen] = useState(false);
  const [addingMember, setAddingMember] = useState(false);
  const pageRef = useRef(null);

  useEffect(() => {
    console.log('🖨️ ProjectDetail mounted with projectId:', projectId);
    pageTransitionIn(pageRef.current);
    fetchProject();
    fetchMembers();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      console.log('🖨️ Fetching project:', projectId);
      setLoading(true);
      const response = await projectsAPI.getProject(projectId);
      console.log('🖨️ Full API response:', response);
      console.log('🖨️ Project data:', response.data?.data);
      console.log('🖨️ Team members:', response.data?.data?.teamMembers);
      console.log('🖨️ Team members length:', response.data?.data?.teamMembers?.length);
      setProject(response.data?.data);
    } catch (err) {
      console.error('🚨 Error fetching project:', err);
      setError('Error fetching project details');
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      console.log('🖨️ Fetching members...');
      const response = await membersAPI.getMembers();
      console.log('🖨️ Members fetched:', response.data?.data);
      setAvailableMembers(response.data?.data || []);
    } catch (err) {
      console.error('🚨 Error fetching members:', err);
    }
  };

  const handleAddMember = async () => {
    if (!selectedMemberId) return;

    try {
      setAddingMember(true);
      console.log('🖨️ Adding member to project:', { projectId, selectedMemberId });
      const response = await projectsAPI.addTeamMember(projectId, selectedMemberId);
      console.log('🖨️ Full response after adding member:', response);
      console.log('🖨️ Response data:', response.data);
      console.log('🖨️ Updated project:', response.data?.data);
      console.log('🖨️ Updated teamMembers:', response.data?.data?.teamMembers);
      setAddMemberDialogOpen(false);
      setSelectedMemberId('');
      await fetchProject();
    } catch (err) {
      console.error('🚨 Error adding member:', err);
      console.error('🚨 Error details:', err.response?.data);
      alert('Error adding member to project');
    } finally {
      setAddingMember(false);
    }
  };

  const handleRemoveMember = async (memberId) => {
    if (!window.confirm('Remove this member from the project?')) return;

    try {
      await projectsAPI.removeTeamMember(projectId, memberId);
      await fetchProject();
    } catch (err) {
      console.error('Error removing member:', err);
      alert('Error removing member from project');
    }
  };

  const getAvailableMembersToAdd = () => {
    const currentMemberIds = project?.teamMembers?.map((m) => m._id || m) || [];
    return availableMembers.filter((m) => !currentMemberIds.includes(m._id));
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

  if (!project) {
    return (
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Alert severity="warning">Project not found</Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
        >
          Back to Projects
        </Button>
      </Container>
    );
  }

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
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/projects')}
          sx={{ mb: 4 }}
        >
          Back to Projects
        </Button>

        <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: '12px' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1 }}>
                {project.title}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <Chip
                  label={project.status || 'active'}
                  color={project.status === 'completed' ? 'error' : 'success'}
                  variant="outlined"
                />
              </Box>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              color: '#666',
              lineHeight: 1.8,
            }}
          >
            {project.description}
          </Typography>

          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Created
                  </Typography>
                  <Typography variant="body2">
                    {project.createdAt
                      ? new Date(project.createdAt).toLocaleDateString()
                      : 'N/A'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Status
                  </Typography>
                  <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                    {project.status || 'Active'}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Team Members
                  </Typography>
                  <Typography variant="body2">
                    {project.teamMembers?.length || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={3}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Technologies
                  </Typography>
                  <Typography variant="body2">
                    {project.techStack?.length || 0}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>

          {project.techStack?.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                Tech Stack
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.techStack.map((tech) => (
                  <Chip
                    key={tech}
                    label={tech}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          )}

          <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Team Members ({project.teamMembers?.length || 0})
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                size="small"
                onClick={() => setAddMemberDialogOpen(true)}
                disabled={getAvailableMembersToAdd().length === 0}
              >
                Add Member
              </Button>
            </Box>
            {project.teamMembers?.length > 0 ? (
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {project.teamMembers.map((member) => (
                  <Chip
                    key={member._id || member}
                    label={member.name || member}
                    variant="outlined"
                    color="primary"
                    onDelete={() => handleRemoveMember(member._id || member)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </Box>
            ) : (
              <Typography color="textSecondary">No team members assigned yet</Typography>
            )}
          </Box>
        </Paper>

        <Paper elevation={3} sx={{ p: 4, borderRadius: '12px' }}>
          <TimelineView project={project} />
        </Paper>

        <Dialog
          open={addMemberDialogOpen}
          onClose={() => {
            setAddMemberDialogOpen(false);
            setSelectedMemberId('');
          }}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Add Team Member</DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <FormControl fullWidth>
              <InputLabel id="member-select-label">Select Member</InputLabel>
              <Select
                labelId="member-select-label"
                id="member-select"
                value={selectedMemberId}
                onChange={(e) => setSelectedMemberId(e.target.value)}
                label="Select Member"
              >
                {getAvailableMembersToAdd().map((member) => (
                  <MenuItem key={member._id} value={member._id}>
                    {member.name} ({member.role})
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button
              onClick={() => {
                setAddMemberDialogOpen(false);
                setSelectedMemberId('');
              }}
              disabled={addingMember}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAddMember}
              variant="contained"
              disabled={!selectedMemberId || addingMember}
            >
              {addingMember ? <CircularProgress size={24} /> : 'Add'}
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ProjectDetail;
