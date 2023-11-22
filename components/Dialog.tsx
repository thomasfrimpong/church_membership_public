"use client";
import { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import { Stack, TextField } from "@mui/material";

export default function AlertDialog() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">User Registration </DialogTitle>
        <DialogContent>
          <Stack spacing={2} margin={2}>
            <TextField label="username" variant="outlined"></TextField>
            <TextField label="username" variant="outlined"></TextField>
            <TextField label="username" variant="outlined"></TextField>
            <TextField label="username" variant="outlined"></TextField>
            <Button color="primary" variant="contained"></Button>
          </Stack>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="success">
            Yes
          </Button>
          <Button onClick={handleClose} autoFocus color="error">
            Agree
          </Button> */}
        </DialogActions>
      </Dialog>
    </>
  );
}
