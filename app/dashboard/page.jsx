"use client";
import { useTheme } from "@mui/material/styles";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AppBarComponent from "@/components/AppBarComponent";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import GroupsIcon from "@mui/icons-material/Groups";
import Groups3Icon from "@mui/icons-material/Groups3";
import dataSource from "@/hooks/dataSource";
import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme({
  typography: {
    fontFamily: "Bree Serif, Arial",
  },
});

const DashboardPage = () => {
  const { data: session } = useSession();
  const currentUser = session?.user;
 

  const router = useRouter();
  const { getSummaries } = dataSource();
  const [summary, setSummary] = useState({});

  const findSummary = async () => {
    const response = await getSummaries();
    setSummary(response);
    //return response;
  };

  useEffect(() => {
    findSummary();
  }, []);

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
        <AppBarComponent index="1" />

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
              <Grid item xs={8}>
                 <Typography component="div" variant="h5" color="secondary">Dashboard Page</Typography>
                <Typography component="div" variant="h6" color="secondary">
                  Summaries for New Members
                </Typography>
              </Grid>

              <Grid item xs={4}></Grid>

              <Grid item xs={12} sm={6}
     md={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    
                     <Groups3Icon sx={{ height: 60, width: 60 }} color="primary"  /> 
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5" color="secondary"  >
                        {summary?.number_of_members}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        First Timers
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}
     md={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    <PeopleOutlineIcon sx={{ height: 60, width: 60 }}  color="primary"/>
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5"  color="secondary">
                        {summary?.number_of_visitors}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        Visitors
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}
     md={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    <GroupsIcon sx={{ height: 60, width: 60 }}  color="primary" />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }}>
                    <CardContent sx={{ flex: "1 0 auto" }}>
                      <Typography component="div" variant="h5"  color="secondary">
                        {summary?.number_of_stable_members}
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      >
                        Staying
                      </Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}
     md={3}>
                <Card sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      pl: 4,
                      pb: 1,
                    }}
                  >
                    <PersonAddIcon sx={{ height: 60, width: 60 }}  color="primary" />
                  </Box>
                  <Box sx={{ display: "flex", flexDirection: "column", pl: 4 }} >
                    <CardContent sx={{ flex: "1 0 auto" }}>
                     
                      <Button
                        variant="text"
                        onClick={() => {
                          router.push("/members/create");
                        }}
                        color="secondary"
                      >
                        Add Member
                      </Button>
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        component="div"
                      ></Typography>
                    </CardContent>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DashboardPage;
