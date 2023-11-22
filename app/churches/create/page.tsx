"use client";
import { useState, useContext } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import { useForm } from "react-hook-form";
import {
  TextField,
  Button,
  Alert,
  Typography,
  CircularProgress,
} from "@mui/material";
import AppBarComponent from "@/components/AppBarComponent";
import dataSource from "@/hooks/dataSource";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useSession } from "next-auth/react";
// TODO remove, this demo shouldn't need to reset the theme.

export default function CreateChurch() {
  const { error, loading } = useContext(AuthenticationContext);
  const { data: session } = useSession();
  const currentUser = session?.user;

  const { addChurch } = dataSource();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [inputs, setInputs] = useState({
    church_name: "",
    location: "",
    email: "",
    phone_number: "",
    brand_colour_1: "",
    brand_colour_2: "",
  });

  const onSubmit = async (data: any) => {
    // Handle form submission
    console.log(data);
    addChurch({
      church_name: data.church_name,
      location: data.location,
      email: data.email,
      phone_number: data.phone_number,
      brand_colour_1: data.brand_colour_1,
      brand_colour_2: data.brand_colour_2,
    });
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

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
        <AppBarComponent index="7" />

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
          {error ? (
            <Alert severity="error">
              Church registration failed. Please try again..
            </Alert>
          ) : null}
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <Typography component="h1" variant="h5" color="secondary">
                      Add Church
                    </Typography>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="church_name"
                          label="Name Of Church"
                          {...register("church_name", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.church_name && (
                          <p style={{ color: "#c40c21" }}>
                            Name of Church required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="location"
                          label="Location"
                          {...register("location", {
                            required: true,
                          })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.location && (
                          <p style={{ color: "#c40c21" }}>
                            Location is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="email"
                          label="Church Email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.email && (
                          <p style={{ color: "#c40c21" }}> Email is required</p>
                        )}
                        {errors.email?.type === "pattern" && (
                          <p style={{ color: "#c40c21" }}>
                            Invalid email format
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          id="phone_number"
                          label="Phone Number"
                          {...register("phone_number", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.phone_number && (
                          <p style={{ color: "#c40c21" }}>
                            {" "}
                            Phone Number is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="brand_colour_1"
                          label="Brand Colour (dark)"
                          {...register("brand_colour_1", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.brand_colour_1 && (
                          <p style={{ color: "#c40c21" }}>
                            {" "}
                            Brand Colour 1 is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="brand_colour_2"
                          label="Brand Colour (light)"
                          {...register("brand_colour_2", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.brand_colour_2 && (
                          <p style={{ color: "#c40c21" }}>
                            {" "}
                            Brand Colour 2 is required
                          </p>
                        )}
                      </FormControl>

                      <FormControl fullWidth>
                        <Button
                          type="submit"
                          variant="contained"
                          color="primary"
                          sx={{ mt: 3, width: "320px", mb: 6, mr: 5 }}
                          disabled={loading}
                        >
                          {loading ? (
                            <CircularProgress color="inherit" />
                          ) : (
                            "Submit"
                          )}
                        </Button>
                      </FormControl>
                    </form>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
