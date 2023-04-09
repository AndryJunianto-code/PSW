import { Box, Stack, Typography } from "@mui/material";
import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";
import CalendarModal from "../calendar/CalendarModal";
import { useListContext } from "../../context/listContext";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";

const IndividualTask = ({ task, index, listId }) => {
  const { taskTitle, taskId } = task;
  const { setDetailedTaskSelected } = useDataContext();
  const { setCurrentList } = useListContext();
  const calendarAnchorRef = useRef(null);
  const [openCalendar, setOpenCalendar] = useState(false);
  const isToday =
    new Date(task.dueDate).toDateString() === new Date().toDateString();

  const shortDate = () => {
    const dateArray = task.dueDate.split(" ");
    const month = dateArray[0];
    const date = dateArray[1];
    const year = dateArray[2];
    if (isToday) {
      return "Today";
    } else if (new Date().getFullYear().toString() !== year) {
      return task.dueDate;
    } else {
      return month + " " + date;
    }
  };
  const shortDateColor = () => {
    const today = new Date().getTime();
    const dueDate = new Date(task.dueDate).getTime();
    if (isToday) return "#faa98b";
    return dueDate > today ? "black" : "red";
  };

  const handleOpenDetailTask = (e) => {
    e.preventDefault();
    setCurrentList(listId);
    if (
      e.target === e.currentTarget ||
      e.target === e.currentTarget.childNodes[0]
    ) {
      setDetailedTaskSelected({ task: taskTitle, open: true });
    }
  };
  const handleToggleCalendar = () => {
    setOpenCalendar(false);
    setOpenCalendar((prev) => !prev);
  };

  return (
    <Draggable draggableId={taskId.toString()} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          backgroundColor="white"
          mb="0.15rem"
          px="1rem"
          py="0.3rem"
          onClick={handleOpenDetailTask}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography fontSize="0.8rem">{taskTitle}</Typography>
            <Stack ref={calendarAnchorRef} onClick={handleToggleCalendar}>
              {task?.dueDate ? (
                <Typography
                  variant="caption"
                  sx={{ cursor: "pointer" }}
                  color={shortDateColor}
                  pr="1.7rem"
                >
                  {shortDate()}
                </Typography>
              ) : (
                <EventAvailableOutlinedIcon
                  sx={{
                    color: "gray.fontMDark",
                    width: "17px",
                    cursor: "pointer",
                    pr: "2.3rem",
                    height: "18.2px",
                  }}
                />
              )}
            </Stack>

            <CalendarModal
              calendarAnchorRef={calendarAnchorRef}
              setOpenCalendar={setOpenCalendar}
              openCalendar={openCalendar}
              task={task}
            />
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default IndividualTask;
