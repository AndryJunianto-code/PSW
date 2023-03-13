import { useState } from "react";
import { Box } from "@mui/material";
import Modebar from "./Modebar";
import ListView from "./listview/ListView";
import Subbar from "./Subbar";
import BoardView from "./BoardView";
import CalendarView from "./calendar/CalendarView";
import Notification from "./notification/Notification";
import { useDataContext } from "../context/Context";
const Mainbar = () => {
  const { viewMode } = useDataContext();
  return (
    <Box flex={12} minHeight="100vh">
      <Box position="fixed" width="100%" backgroundColor="white">
        {viewMode === "Notification" ? (
          <Notification />
        ) : (
          <>
            <Modebar />
            <Subbar />
          </>
        )}
      </Box>
      {viewMode === "List" ? (
        <ListView />
      ) : viewMode === "Board" ? (
        <BoardView />
      ) : viewMode === "Calendar" ? (
        <CalendarView />
      ) : (
        ""
      )}
    </Box>
  );
};

export default Mainbar;
