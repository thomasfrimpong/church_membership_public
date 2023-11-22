"use client";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import AppBarComponent from "@/components/AppBarComponent";
import BasicTable from "./components/BasicTable";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function Members() {
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
        <AppBarComponent index="2" />

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
                  New Members List
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Button
                  sx={{ mt: 3 }}
                  variant="contained"
                  href="/members/create"
                  color="primary"
                >
                  Add Member
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
