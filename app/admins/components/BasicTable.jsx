"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import LinearIndeterminate from "@/app/loading";
import SnackBarComponent from "@/components/SnackBarComponent";
import dataEntry from "@/hooks/dataEntry";
import EditNoteIcon from "@mui/icons-material/EditNote";
import Button from "@mui/material/Button";
import UpdateAdminModal from "@/components/UpdateAdminModal";
import Image from "next/image";

export default function BasicTable() {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const { getAdmins, currentDate } = dataEntry();
  const [user, setUser] = useState();
  const [isLoaded,setLoaded]=useState(false)
  

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAdmins();

      setUserList(users);
      setLoaded(true)
    };
    fetchUsers();
    

    setLoading(false);
  }, [open]);

  if (loading) {
    return <LinearIndeterminate />;
  }
 
  
  if (isLoaded && userList.length == 0) {
    return (
      <>
      <div style={{ textAlign: 'center', marginTop: '150px' }}>
        <Image
          src="/No-record.png"
          width={100}
          height={100}
          
          alt="Empty records"
        />
        </div>
      </>
    );
  } else {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name Of User</b>
            </TableCell>
            <TableCell align="right">
              <b>Phone Number</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Email</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Church Name</b>&nbsp;
            </TableCell>

            <TableCell align="right">
              <b>Date Added</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Edit Record</b>&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {userList.map((user) => (
            <>
              <TableRow
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                key={user._id}
              >
                <TableCell component="th" scope="row">
                  {user.first_name} {user.last_name}
                </TableCell>
                <TableCell align="right">{user.phone_number}</TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">
                  {user.church_id.church_name}
                </TableCell>
                <TableCell align="right">
                  {currentDate(user.createdAt)}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant="text"
                    onClick={() => {
                      
                      setUser(user);
                      handleOpen();
                    }}
                  >
                    <EditNoteIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
      <UpdateAdminModal open={open} handleClose={handleClose} admin={user} />
      <SnackBarComponent message="Action successfull"/>
    </TableContainer>
  );
                  }
}
