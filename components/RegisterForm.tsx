'use client';

import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setLoggedIn, setUserData } from '../store/userSlice';
import { registerUser } from '../apis/userApi';
import { useRouter } from 'next/navigation';

const RegisterForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await registerUser(email, password, { name });
      dispatch(setLoggedIn(true));
      dispatch(setUserData({ id: user.uid, email: user.email, name }));
      router.push('/');
    } catch (err) {
      setError('Failed to register');
    }
  };

  return (
    <Box component="form" onSubmit={handleRegister} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <TextField
        margin="normal"
        required
        fullWidth
        label="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        Register
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
};

export default RegisterForm;