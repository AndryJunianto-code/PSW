import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDataContext } from "../../context/Context";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import TopSidebar from "./TopSidebar";
import SidebarSpaces from "./SidebarSpaces";
import SidebarBottom from "./SidebarBottom";

const MobileSidebar = () => {
  const { openDrawer, toggleDrawer } = useDataContext();
  return (
    <Drawer anchor={"left"} open={openDrawer} onClose={toggleDrawer(false)}>
      <Box pl="0.7rem" pt="1rem" pr="5rem">
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h6" fontWeight="600" letterSpacing="0.1rem">
            TaskInk
          </Typography>
        </Stack>
        <TopSidebar />
      </Box>
      <Divider />
      <SidebarSpaces />
      <SidebarBottom />
    </Drawer>
  );
};

export default MobileSidebar;
