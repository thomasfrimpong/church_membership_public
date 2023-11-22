"use client";
import { useState, useContext, useEffect } from "react";
import Box from "@mui/material/Box";
import SnackBarComponent from "./SnackBarComponent";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { TextField, Button, Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { AuthenticationContext } from "@/app/context/AuthContext";
import dataEntry from "@/hooks/dataEntry";

const UpdateAdminModal = (props: any) => {
  //console.log("modal props", props);

  const { error, loading } = useContext(AuthenticationContext);
  const { updateUser } = dataEntry();
  const [formData, setFormData] = useState({
    // Set default values here
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    id: "",
  });

  const updateFormData = () => {
    setFormData({
      firstName: props.admin?.first_name || "",
      lastName: props.admin?.last_name || "",
      phoneNumber: props.admin?.phone_number || "",
      email: props.admin?.email || "",
      id: props.admin?._id || "",
    });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to handle form submission
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const first_name = data.get("firstName");
    const last_name = data.get("lastName");
    const phone_number = data.get("phoneNumber");
    const email = data.get("email");
    const id = formData.id;
    const response = await updateUser({
      id,
      first_name,
      last_name,
      email,
      phone_number,
    });
    //console.log(response);
    if (response?.status == 200) {
      props.handleClose();
    }
    // Log the form data (you can send it to an API, perform validation, etc.)
  };

  useEffect(updateFormData, [props]);

  return (
    <>
      {/* <SnackBarComponent message="Admin updated successfully" /> */}
      <Dialog
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">Edit Admin Details </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <Stack spacing={2} margin={2}>
              <TextField
                name="firstName"
                label="first name"
                value={formData.firstName}
                onChange={handleInputChange}
                variant="outlined"
                required
              ></TextField>
              <TextField
                name="lastName"
                label="last name"
                value={formData.lastName}
                onChange={handleInputChange}
                variant="outlined"
              ></TextField>

              <TextField
                name="phoneNumber"
                label="phone Number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                variant="outlined"
              ></TextField>

              <TextField
                variant="outlined"
                name="email"
                label="email"
                value={formData.email}
                onChange={handleInputChange}
              ></TextField>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="inherit" /> : "Update"}
              </Button>
            </Stack>
          </Box>
        </DialogContent>
        {/* <DialogActions></DialogActions> */}
      </Dialog>
    </>
  );
};

export default UpdateAdminModal;
