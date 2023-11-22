"use client";
import React, { useState, useContext } from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  TextField,
  Button,
  Alert,
  Checkbox,
  CircularProgress,
} from "@mui/material";

import { AuthenticationContext } from "@/app/context/AuthContext";

const SignInForm = () => {
  const router = useRouter();
  const { loading, error, setAuthState } = useContext(AuthenticationContext);

  // const { data: session } = useSession();
  // // console.log(session);
  // if (session) {
  //   redirect("/dashboard");
  // }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    setAuthState({
      success: false,
      loading: true,
      error: false,
      showSnackbar: false,
    });

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      console.log(res);
      if (res?.error) {
        setAuthState({
          success: false,
          loading: false,
          error: true,
          showSnackbar: false,
        });
        return;
      }
      setAuthState({
        success: true,
        loading: false,
        error: false,
        showSnackbar: false,
      });
      router.replace("dashboard");
    } catch (error) {
      console.log(error);
      setAuthState({
        success: false,
        loading: false,
        error: false,
        showSnackbar: false,
      });
    }
  };

  function Copyright(props: any) {
    return (
      <Typography
        variant="body2"
        color="text.secondary"
        align="center"
        {...props}
      >
        {"Copyright © "}
        <Link color="inherit" href="https://mui.com/">
          Adoglobe Technologies
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    );
  }

  return (
    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
      {error ? (
        <Alert severity="error">
          Incorrect email or password. Please try again..
        </Alert>
      ) : null}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="current-password"
      />
      {/* <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      /> */}

      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={loading}
      >
        {loading ? <CircularProgress color="inherit" /> : "Log In"}
      </Button>
      <Grid container>
        <Grid item xs>
          <Link href="#" variant="body2">
            Forgot password?
          </Link>
        </Grid>
        <Grid item></Grid>
      </Grid>
      <Copyright sx={{ mt: 5 }} />
    </Box>
  );
};

export default SignInForm;
