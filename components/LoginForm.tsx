"use client";

import React, { useState } from "react";
import { Button, TextField, Typography, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "../store/userSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../apis/firebase";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Login successful:', userCredential.user);
      router.push("/"); // Redirect to home page after successful login
    } catch (err) {
      console.error("Login error:", err);
      setError("Failed to login");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <TextField
        label="Email"
        type="email"
        value={email}
        fullWidth
        margin="normal"
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        fullWidth
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
        Login
      </Button>
      {error && <Typography color="error">{error}</Typography>}
    </Box>
  );
}
