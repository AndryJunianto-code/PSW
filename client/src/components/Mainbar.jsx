import { useState } from "react";
import { Box } from "@mui/material";
import Modebar from "./Modebar";
import ListView from "./ListView";
import Subbar from "./Subbar";
import BoardView from "./BoardView";
import CalendarView from "./calendar/CalendarView";
import Notification from "./notification/Notification";
const Mainbar = () => {
  const [viewMode, setViewMode] = useState("List");

  return (
    <Box flex={12} minHeight="100vh">
      <Box position="fixed" width="100%" backgroundColor="white">
        {viewMode === "Notification" ? (
          <Notification />
        ) : (
          <>
            <Modebar viewMode={viewMode} setViewMode={setViewMode} />
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
