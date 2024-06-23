"use client";

import React from "react";
import { Typography, Container } from "@mui/material";
import RegisterForm from "@/components/RegisterForm";
import { withAuth } from "@/components/withAuth";

function Register() {
  return (
    <Container className="pd-container" component="main">
      <Typography component="h1" variant="h5">
        Register
      </Typography>
      <RegisterForm />
    </Container>
  );
}

export default withAuth(Register, false);