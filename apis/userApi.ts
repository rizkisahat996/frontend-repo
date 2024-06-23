import axios from "axios";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { updateProfile } from "firebase/auth";

const API_BASE_URL = "http://127.0.0.1:5001/technical-backend/us-central1";

export const updateUserData = async (
  userId: string,
  data: any,
  token: string
) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/update-user-data`,
      { userId, ...data },
      { headers: { Authorization: token } }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchUserData = async (userId: string, token: string) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/fetch-user-data/${userId}`,
      {
        headers: { Authorization: token },
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (
  email: string,
  password: string,
  userData: any
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await setDoc(doc(db, "users", user.uid), {
      email: user.email,
      ...userData,
    });
    await updateProfile(user, { displayName: userData.name });
    return user;
  } catch (error) {
    throw error;
  }
};
