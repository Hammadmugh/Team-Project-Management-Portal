import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Chip,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { dialogFadeInScale } from './animations/gsapUtils';
import { membersAPI } from '../services/api';

const ProjectDialog = ({
  open,
  onClose,
  onSave,
  isEditing,
  initialData,
  loading,
}) => {
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: [],
    status: 'active',
    teamMembers: [],
  });
  const [techInput, setTechInput] = useState('');
  const [availableMembers, setAvailableMembers] = useState([]);
  const [membersLoading, setMembersLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchAvailableMembers();
    }
  }, [open]);

  const fetchAvailableMembers = async () => {
    try {
      setMembersLoading(true);
      const response = await membersAPI.getMembers();
      setAvailableMembers(response.data?.data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setMembersLoading(false);
    }
  };

  useEffect(() => {
    if (isEditing && initialData) {
      // Extract team member IDs properly (handle both objects and string IDs)
      const teamMemberIds = Array.isArray(initialData.teamMembers)
        ? initialData.teamMembers.map((member) =>
            typeof member === 'string' ? member : member._id
          )
        : [];
      
      setFormData({
        title: initialData.title || '',
        description: initialData.description || '',
        techStack: initialData.techStack || [],
        status: initialData.status || 'active',
        teamMembers: teamMemberIds,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        techStack: [],
        status: 'active',
        teamMembers: [],
      });
    }
    setTechInput('');
  }, [isEditing, initialData]);

  useEffect(() => {
    if (open && dialogRef.current) {
      const dialogContent = dialogRef.current.querySelector('[role="dialog"]');
      if (dialogContent) {
        dialogFadeInScale(dialogContent);
      }
    }
  }, [open]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleMemberChange = (e) => {
    const { value } = e.target;
    setFormData({
      ...formData,
      teamMembers: Array.isArray(value) ? value : [value],
    });
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack.includes(techInput.trim())) {
      setFormData({
        ...formData,
        techStack: [...formData.techStack, techInput.trim()],
      });
      setTechInput('');
    }
  };

  const handleRemoveTech = (tech) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== tech),
    });
  };

  const handleSave = () => {
    if (formData.title.trim() && formData.description.trim()) {
      onSave(formData);
    }
  };

  const getSelectedMemberNames = () => {
    return formData.teamMembers
      .map((memberId) => {
        const member = availableMembers.find((m) => m._id === memberId);
        return member?.name || memberId;
      })
      .filter(Boolean);
  };

  return (
    <Dialog
      ref={dialogRef}
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          m: { xs: 2, sm: 0 },
          zIndex: 1400,
        },
      }}
      slotProps={{
        backdrop: {
          sx: {
            zIndex: 1399,
          },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
        {isEditing ? 'Edit Project' : 'Create New Project'}
      </DialogTitle>

      <DialogContent sx={{ pt: 2, px: { xs: 2, sm: 3 } }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Project Title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            fullWidth
            multiline
            rows={3}
            variant="outlined"
          />

          <FormControl fullWidth>
            <InputLabel id="team-members-label">Team Members</InputLabel>
            <Select
              labelId="team-members-label"
              id="team-members-select"
              multiple
              value={formData.teamMembers}
              onChange={handleMemberChange}
              label="Team Members"
              disabled={membersLoading}
              renderValue={() => {
                const selectedNames = getSelectedMemberNames();
                return selectedNames.length > 0
                  ? selectedNames.join(', ')
                  : 'Select members...';
              }}
            >
              {membersLoading ? (
                <MenuItem disabled>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Loading members...
                </MenuItem>
              ) : availableMembers.length === 0 ? (
                <MenuItem disabled>No members available</MenuItem>
              ) : (
                availableMembers.map((member) => (
                  <MenuItem key={member._id} value={member._id}>
                    {member.name} ({member.role})
                  </MenuItem>
                ))
              )}
            </Select>
          </FormControl>

          {formData.teamMembers.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {getSelectedMemberNames().map((memberName) => (
                <Chip
                  key={memberName}
                  label={memberName}
                  color="primary"
                  variant="outlined"
                  size="small"
                />
              ))}
            </Box>
          )}

          <Box>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 500 }}>
              Tech Stack
            </label>
            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
              <TextField
                size="small"
                placeholder="Add technology"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTech();
                  }
                }}
                fullWidth
              />
              <Button
                variant="outlined"
                onClick={handleAddTech}
                sx={{ minWidth: '100px' }}
              >
                Add
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {formData.techStack.map((tech) => (
                <Chip
                  key={tech}
                  label={tech}
                  onDelete={() => handleRemoveTech(tech)}
                  color="primary"
                  variant="outlined"
                />
              ))}
            </Box>
          </Box>

          <TextField
            select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleInputChange}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </TextField>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={loading || !formData.title.trim() || !formData.description.trim()}
        >
          {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProjectDialog;
