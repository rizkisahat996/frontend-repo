"use client";

import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import { store } from "../store/store";
import theme from "@/theme/theme";
import Navbar from "@/components/Navbar";
import React, { useState } from "react";
import "../public/css/index.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeNav, setActiveNav] = useState<boolean>(false);
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <Provider store={store}>
            <ThemeProvider theme={theme}>
              <Navbar />
              {children}
            </ThemeProvider>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
