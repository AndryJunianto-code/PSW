import React, { useEffect, useState } from "react";
import {
  Box,
  ClickAwayListener,
  Divider,
  Grow,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import getMonth from "../../utils/getMonth";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import ChevronLeftOutlinedIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import CalendarModalDay from "./CalendarModalDay";
import dayjs from "dayjs";

const CalendarModal = ({
  calendarAnchorRef,
  setOpenCalendar,
  openCalendar,
  task,
}) => {
  const [currentMonth, setCurrentMonth] = useState(getMonth());
  const [monthIndex, setMonthIndex] = useState(dayjs().month());
  const handleCloseCalendar = (event) => {
    if (
      calendarAnchorRef.current &&
      calendarAnchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpenCalendar(false);
  };
  const handlePrevMonth = (e) => setMonthIndex(monthIndex - 1);
  const handleNextMonth = (e) => setMonthIndex(monthIndex + 1);
  const handleReset = (e) => setMonthIndex(dayjs().month());

  useEffect(() => {
    setCurrentMonth(getMonth(monthIndex));
  }, [monthIndex]);
  return (
    <Popper
      open={openCalendar}
      anchorEl={calendarAnchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
      disablePortal
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "bottom-start" ? "left top" : "left bottom",
          }}
        >
          <Paper>
            <ClickAwayListener onClickAway={handleCloseCalendar}>
              <Box width="20rem" height="14rem">
                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  px="1rem"
                  py="0.3rem"
                >
                  <CalendarTodayOutlinedIcon
                    sx={{
                      width: "13px",
                      height: "14px",
                      color: "gray.fontMDark",
                    }}
                  />
                  <Typography
                    variant="body2"
                    ml="0.5rem"
                    color={"gray.fontMDark"}
                    fontWeight="600"
                  >
                    Due date
                  </Typography>
                </Stack>

                <Divider variant="fullWidth" />

                <Stack
                  direction={"row"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                  px="1.5rem"
                  my="0.4rem"
                >
                  <Typography variant="body2">
                    {dayjs(new Date(dayjs().year(), monthIndex)).format(
                      "MMMM YYYY"
                    )}
                  </Typography>
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    sx={{ cursor: "pointer" }}
                  >
                    <Typography
                      variant="body2"
                      mr="0.3rem"
                      onClick={handleReset}
                    >
                      Today
                    </Typography>
                    <ChevronLeftOutlinedIcon onClick={handlePrevMonth} />
                    <ChevronRightOutlinedIcon onClick={handleNextMonth} />
                  </Stack>
                </Stack>

                <Box pr="0.3rem" pl="1.2rem">
                  <div className="gridMiniSystem">
                    {currentMonth &&
                      currentMonth.map((row, i) => (
                        <React.Fragment key={i}>
                          {row.map((day, idx) => (
                            <CalendarModalDay
                              key={idx}
                              rowIdx={i}
                              day={day}
                              task={task}
                            />
                          ))}
                        </React.Fragment>
                      ))}
                  </div>
                </Box>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default CalendarModal;
