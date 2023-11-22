"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Wallpaper from "@/components/Wallpaper";
import SignInForm from "@/components/SignInForm";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function SignInSide() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />

        <Wallpaper />

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Typography component="h2" variant="h6">
              Church Membership Form
            </Typography>
            <SignInForm />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
