"use client";

import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { withAuth } from "../../components/withAuth";
import { useAuth } from "../../hooks/useAuth";
import { fetchUserData } from "../../apis/userApi";

interface UserData {
  name: string;
  email: string;
  // Add other properties as needed
}

const ProfilePage = () => {
  const { user, getToken } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const token = await getToken();
          console.log(token);
        
          if (token) {
            const data = await fetchUserData(user.uid, token);
            setUserData(data);
          }
        } catch (err) {
          setError("Failed to fetch user data");
        }
      }
    };
    fetchData();
  }, [user, getToken]);

  if (error) {
    return <Typography>{error}</Typography>;
  }

  if (!userData) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h4">User Profile</Typography>
      <Typography>Name: {userData.name}</Typography>
      <Typography>Email: {userData.email}</Typography>
      {/* Display other user data as needed */}
    </div>
  );
};

export default withAuth(ProfilePage);