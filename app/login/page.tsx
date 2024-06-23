"use client";

import React from "react";
import { Typography, Container } from "@mui/material";
import LoginForm from "@/components/LoginForm";
import { withAuth } from "@/components/withAuth";

function Login() {
  return (
    <Container className="pd-container" component="main">
      <Typography component="h1" variant="h5">
        Login
      </Typography>
      <LoginForm />
    </Container>
  );
}

export default withAuth(Login, false);