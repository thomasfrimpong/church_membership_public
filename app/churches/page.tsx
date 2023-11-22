"use client";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import BasicTable from "./components/BasicTable";
import AppBarComponent from "@/components/AppBarComponent";
import { Typography } from "@mui/material";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Churches() {
  const { data: session } = useSession();
  const currentUser = session?.user;
  //console.log(currentUser);

  const theme = createTheme({
    palette: {
      primary: {
        main: currentUser?.brand_colour_1 || "#f5efdf",
      },
      secondary: {
        main: currentUser?.brand_colour_2 || "#f5efdf",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBarComponent index="4" />

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
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={10}>
                <Typography component="h1" variant="h5" color="secondary">
                  Churches List
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  sx={{ mt: 3 }}
                  variant="contained"
                  href="/churches/create"
                >
                  Add Church
                </Button>
              </Grid>
              <Grid item xs={12}>
                <BasicTable />
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
