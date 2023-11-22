"use client";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

import AppBarComponent from "@/components/AppBarComponent";
import ChangePassword from "./components/page";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Members() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBarComponent index="6" />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container>
            <Grid item xs={12}>
              <ChangePassword />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
