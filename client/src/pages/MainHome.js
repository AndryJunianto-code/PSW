import React, { useState } from "react";
import { Box, Stack } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Mainbar from "../components/Mainbar";
import AddIcon from "@mui/icons-material/Add";
import MobileSidebar from "../components/sidebar/MobileSidebar";
import DetailedTaskModal from "../components/detailedtask/DetailedTaskModal";
import { useDataContext } from "../context/Context";
const MainHome = () => {
  const { detailedTaskSelected } = useDataContext();
  return (
    <Box minHeight="100vh" height="100%" sx={{ overflow: "hidden" }}>
      <Stack direction="row">
        <MobileSidebar />
        <Sidebar />
        <Mainbar />
      </Stack>
      {detailedTaskSelected.open === true && <DetailedTaskModal />}
    </Box>
  );
};

export default MainHome;
