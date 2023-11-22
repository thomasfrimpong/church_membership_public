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
import AppBarComponent from "@/components/AppBarComponent";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import dataSource from "@/hooks/dataSource";
import { AuthenticationContext } from "@/app/context/AuthContext";
import SnackBarComponent from "@/components/SnackBarComponent";
import CircularProgress from "@mui/material/CircularProgress";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.

export default function AddMember() {
  const { error, loading } = useContext(AuthenticationContext);
  const { data: session } = useSession();

  const currentUser = session?.user;
  const [decision, setDecision] = useState("");
  const { addMember } = dataSource();
  const values = {
    first_name: "",
    last_name: "",
    phone_number: "",
    address: "",
    invitee: "",
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
    const response = await addMember({
      first_name: data.first_name,
      last_name: data.last_name,
      phone_number: data.phone_number,
      address: data.address,
      decision: decision,
      invitee: data.invitee,
    });

    //console.log(response);

    if (response == 201) {
      reset();
      setDecision("");
    }
  };

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setDecision(event.target.value);
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
              Member registration failed. Please try again..
            </Alert>
          ) : null}
          <SnackBarComponent message="Member added successfully" />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <Typography component="h1" variant="h5" color="secondary">
                      Add Member
                    </Typography>
                  </Grid>

                  <Grid item xs={2}></Grid>
                  <Grid item xs={3}></Grid>
                  <Grid item xs={4}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="first_name"
                          label="First Name"
                          {...register("first_name", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.first_name && (
                          <p style={{ color: "#c40c21" }}>
                            First Name is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="last_name"
                          label="Last Name"
                          {...register("last_name", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.last_name && (
                          <p style={{ color: "#c40c21" }}>
                            Last Name is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="number"
                          id="phone_number"
                          label="Phone Number"
                          {...register("phone_number", {
                            required: true,
                          })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.phone_number && (
                          <p style={{ color: "#c40c21" }}>
                            Phone Number is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="address"
                          label="Address"
                          {...register("address", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.address && (
                          <p style={{ color: "#c40c21" }}>
                            Address is required
                          </p>
                        )}
                      </FormControl>
                      <FormControl fullWidth>
                        <TextField
                          type="text"
                          id="invitee"
                          label="Invited By"
                          {...register("invitee", { required: true })}
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChangeInput}
                        />
                        {errors.invitee && (
                          <p style={{ color: "#c40c21" }}>
                            Invitee is required
                          </p>
                        )}
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Decision
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={decision}
                          label="Decision"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value="visit">Visit</MenuItem>
                          <MenuItem value="stay">Stay</MenuItem>
                        </Select>
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
