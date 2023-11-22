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
import { TextField, Button, Alert, Typography } from "@mui/material";
import { AuthenticationContext } from "@/app/context/AuthContext";
import SnackBarComponent from "@/components/SnackBarComponent";
import CircularProgress from "@mui/material/CircularProgress";
import dataEntry from "@/hooks/dataEntry";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function ChangePassword() {
  const { error, loading } = useContext(AuthenticationContext);

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

  const { changePassword } = dataEntry();
  const values = {
    current_password: "",
    new_password: "",
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: values,
  });

  const [inputs, setInputs] = useState(values);

  const onSubmit = async (data: any) => {
    // Handle form submission
    console.log(data);
    const response = await changePassword({
      current_password: data.current_password,
      new_password: data.new_password,
    });

    console.log(response);

    if (response == 200) {
      reset();
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />

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
              Current password is incorrect. Please try again..
            </Alert>
          ) : null}
          <SnackBarComponent message="Password updated successfully" />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <Typography component="h1" variant="h5" color="secondary">
                      Change Password
                    </Typography>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <TextField
                          type="password"
                          id="current_passsword"
                          label="Current Password"
                          {...register("current_password", {
                            required: true,
                          })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.current_password && (
                          <p style={{ color: "#c40c21" }}>
                            Current password is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="password"
                          id="new_password"
                          label="New Password"
                          {...register("new_password", {
                            required: true,
                            pattern:
                              /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
                          })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.new_password && (
                          <p style={{ color: "#c40c21" }}>
                            New password is required
                          </p>
                        )}
                        {errors.new_password?.type === "pattern" && (
                          <p style={{ color: "#c40c21" }}>
                            Please password must be minimum 8 characters one
                            upercase letter, one lowercase letter one digit and
                            one special character.
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
                            "Change Password"
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
