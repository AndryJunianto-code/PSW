import React from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Mainbar from "../components/Mainbar";
const MainHome = () => {
  return (
    <Box minHeight="100vh" height="100%" sx={{ overflowY: "hidden" }}>
      <Stack direction="row" justifyContent="space-between">
        <Sidebar />
        <Mainbar />
      </Stack>
    </Box>
  );
};

export default MainHome;
