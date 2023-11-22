"use client";
import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dataSource from "@/hooks/dataSource";
import { User } from "@/utils/interfaces";
import LinearIndeterminate from "@/app/loading";
import SnackBarComponent from "@/components/SnackBarComponent";
import dataEntry from "@/hooks/dataEntry";

export default function BasicTable() {
  const [loading, setLoading] = useState(true);
  const [userList, setUserList] = useState([]);
  const { getUsers } = dataSource();
  const { currentDate } = dataEntry();

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getUsers();

      setUserList(users);
    };
    fetchUsers();
    setLoading(false);
  }, []);
  if (loading) {
    return <LinearIndeterminate />;
  }
  
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
          </TableRow>
        </TableHead>

        <TableBody>
          {userList.map((user) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={user._id}
            >
              <TableCell component="th" scope="row">
                {user.first_name} {user.last_name}
              </TableCell>
              <TableCell align="right">{user.phone_number}</TableCell>
              <TableCell align="right">{user.email}</TableCell>
              <TableCell align="right">{user.church_id.church_name}</TableCell>
              <TableCell align="right">{currentDate(user.createdAt)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SnackBarComponent message="User added successfully" />
    </TableContainer>
  );
}
