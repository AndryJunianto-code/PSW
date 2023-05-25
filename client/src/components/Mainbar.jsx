import { useState } from "react";
import { Box } from "@mui/material";
import Modebar from "./Modebar";
import ListView from "./listview/ListView";
import Subbar from "./Subbar";
import BoardView from "./BoardView";
import CalendarView from "./calendar/CalendarView";
import { useDataContext } from "../context/Context";
import dayjs from "dayjs";
const Mainbar = () => {
  const { viewMode } = useDataContext();
  const [monthIndexBig, setMonthIndexBig] = useState(dayjs().month());
  return (
    <Box flex={12} minHeight="100vh">
      <Box position="fixed" width="100%" backgroundColor="white">
        <>
          <Modebar />
          <Subbar viewMode={viewMode} monthIndexBig={monthIndexBig} />
        </>
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
