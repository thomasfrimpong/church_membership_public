import React, { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import dataSource from "@/hooks/dataSource";
import { Church } from "@/utils/interfaces";
import dataEntry from "@/hooks/dataEntry";

export default function BasicTable() {
  const [churchList, setChurchList] = useState<Church[]>([]);
  const { currentDate } = dataEntry();
  const { getChurches } = dataSource();

  useEffect(() => {
    const getChurchList = async () => {
      const response = await getChurches();

      setChurchList(response);
    };
    getChurchList();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <b>Name Of Church</b>
            </TableCell>
            <TableCell>
              <b>Location</b>&nbsp;
            </TableCell>
            <TableCell align="right">
              <b>Phone Number</b>&nbsp;
            </TableCell>

            <TableCell align="right">
              <b>Date Added</b>&nbsp;
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {churchList.map((church) => (
            <TableRow
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              key={church._id}
            >
              <TableCell component="th" scope="row">
                {church?.church_name}
              </TableCell>
              <TableCell>{church?.location}</TableCell>
              <TableCell align="right">{church?.phone_number}</TableCell>
              <TableCell align="right">
                {currentDate(church?.createdAt)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
