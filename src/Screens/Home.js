import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Basvurular from "../Components/Basvurular";
import Ilanver from "../Components/Ilanver";
import Profil from "../Components/Profil";
import Ilanlarim from "../Components/Ilanlarim";

const drawerWidth = 240;

export default function Home() {
  const [currentLocation, setCurrentLocation] = React.useState("Başvurular");
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
        color="inherit"
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            EşitCV Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#301934",
            color: "white",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Divider />
        <List>
          {["Başvurular", "İlan Ver", "İlanlarım", "Profil", "Çıkış Yap"].map(
            (text, index) => (
              <ListItem
                key={text}
                disablePadding
                onClick={(e) => {
                  if (text === "Çıkış Yap") {
                    localStorage.removeItem("userData");
                    window.location.href = "/";
                  }
                  setCurrentLocation(e.target.innerText);
                }}
              >
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? (
                      <InboxIcon htmlColor="#FFFFFF" />
                    ) : (
                      <MailIcon htmlColor="#FFFFFF" />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
      </Drawer>
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <div>
          {currentLocation === "Başvurular" ? (
            <Basvurular />
          ) : currentLocation === "İlan Ver" ? (
            <Ilanver />
          ) : currentLocation === "İlanlarım" ? (
            <Ilanlarim />
          ) : currentLocation === "Profil" ? (
            <Profil />
          ) : null}
        </div>
      </Box>
    </Box>
  );
}
