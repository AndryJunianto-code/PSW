import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import React from "react";

const TopSidebar = () => {
  return (
    <List>
      <ListItem disablePadding>
        <ListItemButton disableGutters>
          <ListItemIcon>
            <HomeOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" marginLeft={"-1rem"}>
                Home
              </Typography>
            }
          ></ListItemText>
        </ListItemButton>
      </ListItem>
      <ListItem disablePadding sx={{ marginTop: "-0.5rem" }}>
        <ListItemButton disableGutters>
          <ListItemIcon>
            <NotificationsOutlinedIcon />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" marginLeft={"-1rem"}>
                Notifications
              </Typography>
            }
          ></ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default TopSidebar;
