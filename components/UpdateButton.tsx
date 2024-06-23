"use client";

import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { updateUserData } from "../apis/userApi";
import { setLoading, setError } from "../store/userSlice";
import { useAuth } from "@/context/AuthContext";

const UpdateButton: React.FC = () => {
  const dispatch = useDispatch();
  const { user, getUserToken } = useAuth();
  const { loading, error } = useSelector((state: RootState) => state.user);
  const [detailedError, setDetailedError] = useState<string | null>(null);

  const handleUpdate = async () => {
    if (!user) {
      dispatch(setError("Unauthorized: Please login first"));
      return;
    }

    dispatch(setLoading(true));
    setDetailedError(null);

    try {
      const token = await getUserToken();
      if (!token) {
        throw new Error("Failed to get authentication token");
      }

      console.log("Token:", token);

      const response = await updateUserData(
        user.uid,
        { someData: "value" },
        token
      );
      console.log("Update response:", response);

      dispatch(setError(null));
    } catch (err) {
      console.error("Update error:", err);
      if (err instanceof Error) {
        setDetailedError(err.message);
      } else {
        setDetailedError("An unknown error occurred");
      }
      dispatch(setError("Error updating user data"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Button onClick={handleUpdate} disabled={loading}>
        Update User Data
      </Button>
      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}
      {detailedError && (
        <Typography color="error">Detailed error: {detailedError}</Typography>
      )}
    </div>
  );
};

export default UpdateButton;
