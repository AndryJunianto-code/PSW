import { Box, Divider, InputBase, Stack, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import dayjs from "dayjs";
import getMonth from "../utils/getMonth";

const Subbar = ({ viewMode, setCurrentMonth, monthIndex, setMonthIndex }) => {
  const handlePrevMonth = (e) => setMonthIndex(monthIndex - 1);
  const handleNextMonth = (e) => setMonthIndex(monthIndex + 1);
  const handleReset = (e) => setMonthIndex(dayjs().month());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <Box borderBottom={"1px solid #f0f0f0"} pl="0.8rem" py="0.2rem">
      <Stack direction="row" alignItems="center" width="11.3rem">
        <SearchOutlinedIcon
          sx={{
            width: "15px",
            height: "15px",
            color: "#616161",
            marginRight: "0.2rem",
          }}
        />
        <InputBase placeholder="Search tasks..." sx={{ fontSize: "0.7rem" }} />
        <Divider sx={{ marginX: "0.6rem" }} orientation="vertical" flexItem />
        {viewMode === "Calendar" && (
          <Stack
            direction={"row"}
            alignItems={"center"}
            sx={{ cursor: "pointer" }}
          >
            <Typography variant="body2" mr="0.3rem" onClick={handleReset}>
              Today
            </Typography>
            <ChevronLeftOutlinedIcon onClick={handlePrevMonth} />
            <ChevronRightOutlinedIcon onClick={handleNextMonth} />
            <Typography variant="body2" width="15rem">
              {dayjs(new Date(dayjs().year(), monthIndex)).format("MMMM YYYY")}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Box>
  );
};

export default Subbar;
