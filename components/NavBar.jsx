import React from "react";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import ChurchIcon from "@mui/icons-material/Church";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { useSession } from "next-auth/react";
import LockIcon from "@mui/icons-material/Lock";
import { createTheme, ThemeProvider } from "@mui/material/styles"; 

// const defaultTheme = createTheme({ typography: {
  
//   fontSize: 13,
// },});

const NavBar = ({ selectedIndex }) => {
  const { data: session } = useSession();
 
  const currentUser = session?.user; 
  const admin_type =  currentUser?.type_of_admin; 

 
  const theme = createTheme({
    palette: {
      primary: {
        main: currentUser?.brand_colour_1 || "#f5efdf",
      },
      secondary: {
        main: currentUser?.brand_colour_2 || "#f5efdf",
      },
    },typography: {
  
      fontSize: 13,
    }
  });
  

  return (
     <ThemeProvider theme={theme}>
    <List component="nav">
      <Box
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        <ListItemButton selected={selectedIndex === "1"} href="/dashboard">
          <ListItemIcon>
            <DashboardIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" sx={{ fontSize: "medium" }} />
        </ListItemButton>

        <ListItemButton selected={selectedIndex === "2"} href="/members">
          <ListItemIcon>
            <PeopleAltIcon  color="secondary"/>
          </ListItemIcon>
          <ListItemText primary="Church Members" sx={{ fontSize: "medium" }} />
        </ListItemButton>

        <ListItemButton
          component="a"
          href="/admins"
          selected={selectedIndex === "3"}
        >
          <ListItemIcon>
            <AdminPanelSettingsIcon color="secondary" />
          </ListItemIcon>
          <ListItemText primary="Church Admins" sx={{ fontSize: "medium" }} />
        </ListItemButton>
        {admin_type == "super_admin" && (
          <>
            <Divider />

            <ListItemButton
              component="a"
              href="/churches"
              selected={selectedIndex === "4"}
            >
              <ListItemIcon>
                <ChurchIcon  color="secondary"/>
              </ListItemIcon>
              <ListItemText
                primary="Churches"
                sx={{ fontSize: 5, fontWeight: "medium" }}
              />
            </ListItemButton>
            <ListItemButton selected={selectedIndex === "5"} href="/users">
              <ListItemIcon>
                <AdminPanelSettingsIcon color="secondary" />
              </ListItemIcon>
              <ListItemText primary="All Users" />
            </ListItemButton>
          </>
        )}
      </Box>
      <Divider sx={{ my: 1 }} />
      <ListItemButton selected={selectedIndex === "6"} href="/password">
        <ListItemIcon>
          <LockIcon color="secondary" />
        </ListItemIcon>
        <ListItemText primary="Change Password" sx={{ fontSize: "medium" }} />
      </ListItemButton>
    </List>
   </ThemeProvider> 
  );
};

export default NavBar;
