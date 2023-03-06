import { Box, IconButton, Stack, Typography, Divider } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";

import TopSidebar from "./TopSidebar";
import SidebarSpaces from "./SidebarSpaces";
import SidebarBottom from "./SidebarBottom";
const Sidebar = () => {
  return (
    <Box
      flex={2}
      width="100%"
      minHeight="100vh"
      borderRight={"1px solid #f0f0f0"}
      sx={{
        display: { xs: "none", lg: "flex" },
      }}
    >
      <Box position="fixed" top="0.4rem" width="14.2747%">
        <Box px="0.7rem">
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
      </Box>
    </Box>
  );
};

export default Sidebar;
