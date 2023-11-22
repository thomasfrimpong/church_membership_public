"use client";
import React, { useEffect, useState, useContext } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Member } from "@/utils/interfaces";
import dataEntry from "@/hooks/dataEntry";
import LinearIndeterminate from "@/app/loading";
import EditNoteIcon from "@mui/icons-material/EditNote";
import UpdateMemberModal from "@/components/UpdateMemberModal";
import Image from "next/image";
import dataResources from "@/hooks/dataResources";

export default function BasicTable() {
  const [loading, setLoading] = useState(true);
  const [members, setMembers] = useState<Member[]>([]);
  const { getMembers, searchMember, currentDate } = dataEntry();
  const [member, setMember] = useState<Member>();
  const [isLoaded, setLoaded] = useState(false);
  const { debounce } = dataResources();

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchMembers = async () => {
      const list = await getMembers();
      //

      setMembers(list);
      setLoaded(true);
    };
    fetchMembers();
    setLoading(false);
  }, [open]);

  const searchInput = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const data = await searchMember({
      query_param: e.target.value,
    });
    //console.log(data);

    if (data?.length) {
      setMembers(data);
    } else {
      const data = await getMembers();

      setMembers(data);
    }
  };

  if (loading) {
    return <LinearIndeterminate />;
  }
  if (isLoaded && members.length == 0) {
    return (
      <>
        <Image
          src="/No-record.png"
          width={100}
          height={100}
          style={{ display: "block", margin: "150px auto 50px auto" }}
          alt="Empty records"
        />
      </>
    );
  } else {
    return (
      <>
        <Paper sx={{ width: "100%", overflow: "hidden", mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}></TableCell>
                  <TableCell align="center" colSpan={8}>
                    <TextField
                      id="filled-search"
                      label="Search By First or Last Name"
                      type="search"
                      variant="standard"
                      onChange={searchInput}
                    />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>First Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Last Name</b>
                  </TableCell>
                  <TableCell>
                    <b>Phone Number</b>&nbsp;
                  </TableCell>

                  <TableCell align="right">
                    <b>Address</b>&nbsp;
                  </TableCell>
                  <TableCell align="right">
                    <b>Invited By</b>&nbsp;
                  </TableCell>
                  <TableCell align="right">
                    <b>Decision</b>&nbsp;
                  </TableCell>
                  <TableCell align="right">
                    <b>Date Added</b>&nbsp;
                  </TableCell>
                  <TableCell align="right">
                    <b>Edit Record</b>
                    &nbsp;
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {members.map((member) => (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    key={member._id}
                  >
                    <TableCell component="th" scope="row">
                      {member.first_name}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {member.last_name}
                    </TableCell>

                    <TableCell>{member.phone_number}</TableCell>

                    <TableCell align="right">{member.address}</TableCell>
                    <TableCell align="right">{member.invitee}</TableCell>
                    <TableCell align="right">{member.decision}</TableCell>
                    <TableCell align="right">
                      {currentDate(member.createdAt)}
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="text"
                        onClick={() => {
                          setMember(member);
                          handleOpen();
                        }}
                      >
                        <EditNoteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
        <UpdateMemberModal
          open={open}
          handleClose={handleClose}
          member={member}
        />
      </>
    );
  }
}
