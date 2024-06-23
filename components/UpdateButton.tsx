'use client';

import React from 'react';
import { Button, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { updateUserData } from '../apis/userApi';
import { setLoading, setError } from '../store/userSlice';
import { useAuth } from '../hooks/useAuth';

const UpdateButton: React.FC = () => {
  const dispatch = useDispatch();
  const { user, getToken } = useAuth();
  const { loading, error } = useSelector((state: RootState) => state.user);

  const handleUpdate = async () => {
    if (!user) {
      dispatch(setError('Unauthorized: Please login first'));
      return;
    }
  
    dispatch(setLoading(true));
    try {
      const token = await getToken();
      if (!token) {
        throw new Error('Failed to get authentication token');
      }
      await updateUserData(user.uid, { someData: 'value' }, token);
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError('Error updating user data'));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Button onClick={handleUpdate} disabled={loading || !user}>
        Update User Data
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
    </div>
  );
};

export default UpdateButton;