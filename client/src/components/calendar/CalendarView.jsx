import { Box, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import getMonth from "../../utils/getMonth";
import Day from "./Day";

const CalendarView = () => {
  const [currentMonth, setCurrentMonth] = useState(getMonth(2));

  return (
    <Box backgroundColor="gray.bgLight" mt="5rem" height="90vh">
      <div className="gridSystem">
        {currentMonth &&
          currentMonth.map((row, i) => (
            <React.Fragment key={i}>
              {row.map((day, idx) => (
                <Day day={day} key={idx} rowIdx={i} />
              ))}
            </React.Fragment>
          ))}
      </div>
    </Box>
  );
};

export default CalendarView;
