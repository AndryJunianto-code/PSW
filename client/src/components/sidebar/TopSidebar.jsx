import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Typography,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import React from "react";
import { useDataContext } from "../../context/Context";

const TopSidebar = () => {
  const { setViewMode } = useDataContext();
  const goToNotification = () => setViewMode("Notification");
  return (
    <List>
      <Link to="/notification" className={"link"}>
        <ListItem disablePadding onClick={goToNotification}>
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
      </Link>
      <ListItem disablePadding sx={{ marginTop: "-0.5rem" }}>
        <ListItemButton disableGutters>
          <ListItemIcon>
            <DashboardOutlinedIcon
              sx={{ fontSize: "1.3rem", marginLeft: "0.1rem" }}
            />
          </ListItemIcon>
          <ListItemText
            primary={
              <Typography variant="body2" marginLeft={"-1rem"}>
                Dashboard
              </Typography>
            }
          ></ListItemText>
        </ListItemButton>
      </ListItem>
    </List>
  );
};

export default TopSidebar;
