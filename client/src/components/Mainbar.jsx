import React from "react";
import { Box } from "@mui/material";
import Modebar from "./Modebar";
import ListView from "./ListView";
import Subbar from "./Subbar";
const Mainbar = () => {
  return (
    <Box flex={12} minHeight="100vh">
      <Box position="fixed" width="100%" backgroundColor="white">
        <Modebar />
        <Subbar />
      </Box>
      <ListView />
    </Box>
  );
};

export default Mainbar;
