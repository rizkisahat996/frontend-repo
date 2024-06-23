"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import UpdateButton from "../components/UpdateButton";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Home() {
  const { userData } = useSelector((state: RootState) => state.user);
  console.log(userData);

  return (
    <main className="pd-container">
      <Box>
        <Typography variant="h1">Welcome</Typography>
        <UpdateButton />
        {userData && (
          <Typography>User Data: {JSON.stringify(userData)}</Typography>
        )}
      </Box>
    </main>
  );
}
