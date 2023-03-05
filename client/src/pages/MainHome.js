import React from "react";
import { Box, Fab, Stack } from "@mui/material";
import Sidebar from "../components/sidebar/Sidebar";
import Mainbar from "../components/Mainbar";
import AddIcon from "@mui/icons-material/Add";
import MobileSidebar from "../components/sidebar/MobileSidebar";
const MainHome = () => {
  const handleOpenNewTaskModal = () => {};
  return (
    <Box minHeight="100vh" height="100%" sx={{ overflowY: "hidden" }}>
      <Stack direction="row" justifyContent="space-between">
        <MobileSidebar />
        <Sidebar />
        <Mainbar />
      </Stack>
      <Fab
        size="small"
        color="primary"
        borderRadius="4px"
        sx={{ position: "fixed", bottom: 15, right: 25 }}
        onClick={handleOpenNewTaskModal}
      >
        <AddIcon sx={{ width: "1.2rem" }} />
      </Fab>
    </Box>
  );
};

export default MainHome;
