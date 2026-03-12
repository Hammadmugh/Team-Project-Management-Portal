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
import MembersGrid from '../components/MembersGrid';
import MemberDialog from '../components/MemberDialog';
import { membersAPI } from '../services/api';
import { pageTransitionIn } from '../components/animations/gsapUtils';

const Members = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [dialogLoading, setDialogLoading] = useState(false);
  const [alert, setAlert] = useState({ open: false, message: '', type: 'success' });
  const pageRef = useRef(null);

  useEffect(() => {
    pageTransitionIn(pageRef.current);
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersAPI.getMembers();
      setMembers(response.data?.data || []);
    } catch (error) {
      showAlert('Error fetching members', 'error');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setIsEditing(false);
    setSelectedMember(null);
    setDialogOpen(true);
  };

  const handleEditMember = (member) => {
    setIsEditing(true);
    setSelectedMember(member);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedMember(null);
    setIsEditing(false);
  };

  const handleSaveMember = async (memberData) => {
    try {
      setDialogLoading(true);

      if (isEditing) {
        await membersAPI.updateMember(selectedMember._id, memberData);
        showAlert('Member updated successfully', 'success');
      } else {
        await membersAPI.createMember(memberData);
        showAlert('Member added successfully', 'success');
      }

      handleCloseDialog();
      fetchMembers();
    } catch (error) {
      showAlert('Error saving member', 'error');
      console.error('Error:', error);
    } finally {
      setDialogLoading(false);
    }
  };

  const handleDeleteMember = async (memberId) => {
    if (!window.confirm('Are you sure you want to delete this member?')) {
      return;
    }

    try {
      await membersAPI.deleteMember(memberId);
      showAlert('Member deleted successfully', 'success');
      fetchMembers();
    } catch (error) {
      showAlert('Error deleting member', 'error');
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
              Team Members
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage and organize your team
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
            Add Member
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
          <MembersGrid
            members={members}
            loading={false}
            onEdit={handleEditMember}
            onDelete={handleDeleteMember}
          />
        )}
      </Container>

      <MemberDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        onSave={handleSaveMember}
        isEditing={isEditing}
        initialData={selectedMember}
        loading={dialogLoading}
      />
    </Box>
  );
};

export default Members;
