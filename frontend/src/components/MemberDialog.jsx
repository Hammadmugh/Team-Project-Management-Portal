import React, { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  CircularProgress,
} from '@mui/material';
import { dialogFadeInScale } from './animations/gsapUtils';

const MemberDialog = ({
  open,
  onClose,
  onSave,
  isEditing,
  initialData,
  loading,
}) => {
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    if (isEditing && initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: '',
        email: '',
        role: '',
      });
    }
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

  const handleSave = () => {
    if (
      formData.name.trim() &&
      formData.email.trim() &&
      formData.role.trim()
    ) {
      onSave(formData);
    }
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
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.25rem' }}>
        {isEditing ? 'Edit Member' : 'Add Team Member'}
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Member Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleInputChange}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            fullWidth
            placeholder="e.g., Developer, Designer, Manager"
            variant="outlined"
          />
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={onClose} disabled={loading}>
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={
            loading ||
            !formData.name.trim() ||
            !formData.email.trim() ||
            !formData.role.trim()
          }
        >
          {loading ? <CircularProgress size={24} /> : isEditing ? 'Update' : 'Add'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MemberDialog;
