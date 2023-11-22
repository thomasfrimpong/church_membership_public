"use client";
import { useState, useContext, useEffect } from "react";
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
  CircularProgress,
  Typography,
} from "@mui/material";
import AppBarComponent from "@/components/AppBarComponent";
import { useRouter } from "next/navigation";
import dataEntry from "@/hooks/dataEntry";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import dataSource from "@/hooks/dataSource";
import { Church } from "@/utils/interfaces";
import { AuthenticationContext } from "@/app/context/AuthContext";
import { useSession } from "next-auth/react";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function CreateAdmin() {
  const router = useRouter();
  const { addAdmin } = dataEntry();
  const { getChurches } = dataSource();
  const [church, setChurch] = useState("");
  const [churchList, setChurchList] = useState<Church[]>([]);
  const { error, loading } = useContext(AuthenticationContext);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
  });

  useEffect(() => {
    const getChurchList = async () => {
      const churches = await getChurches();
      setChurchList(churches);
    };
    getChurchList();
    console.log(churchList);
  }, []);

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
    console.log(inputs);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setChurch(event.target.value);
  };

  const onSubmit = async (data: any) => {
    console.log(data);
    addAdmin({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone_number: data.phone_number,
      church_id: church,
    });
  };
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
          {error && (
            <Alert severity="error">
              Admin registration failed. Please try again..
            </Alert>
          )}

          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Card sx={{ width: "750px", ml: 18, mt: 10 }}>
              <CardContent>
                <Grid container spacing={3}>
                  <Grid xs={4} item></Grid>
                  <Grid item xs={4}>
                    <Typography component="h1" variant="h5" color="secondary">
                      Add User
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
                          type="text"
                          id="email"
                          label="Email"
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
                        <InputLabel id="demo-simple-select-label">
                          Church
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={church}
                          label="Church"
                          required
                          sx={{ mt: 1, width: "320px" }}
                          onChange={handleChange}
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          {churchList.map((church) => (
                            <MenuItem value={church._id}>
                              {church.church_name}
                            </MenuItem>
                          ))}
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
