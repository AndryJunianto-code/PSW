import { Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";
import CalendarModal from "../calendar/CalendarModal";
import { useListContext } from "../../context/listContext";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import { useSocketContext } from "../../context/socketContext";

const IndividualTask = ({ task, index, listId, listTitle, source }) => {
  const { taskTitle, taskId, taskSubtitle, createdAt, dueDate, taskComments } =
    task;
  const { socket } = useSocketContext();
  const { setDetailedTaskSelected, detailedTaskSelected } = useDataContext();
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
      e.target === e.currentTarget.childNodes[0] ||
      e.target.getAttribute("data-title") === "title"
    ) {
      setDetailedTaskSelected({
        taskTitle,
        taskSubtitle,
        taskId,
        taskComments,
        createdAt,
        dueDate,
        listId,
        listTitle,
        open: true,
      });
      socket.emit("joinTask", taskId);
    }
  };
  const handleToggleCalendar = () => {
    setOpenCalendar((prev) => !prev);
  };
  useEffect(() => {
    if (detailedTaskSelected.taskId === taskId) {
      setDetailedTaskSelected((prev) => ({ ...prev, listId, listTitle }));
    }
  }, [listId, listTitle]);
  return (
    <>
      {source === "ListView" ? (
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
              sx={{ cursor: "pointer" }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography fontSize="0.8rem" data-title="title">
                  {taskTitle}
                </Typography>
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
                        height: "19.5px",
                      }}
                    />
                  )}
                </Stack>

                <CalendarModal
                  calendarAnchorRef={calendarAnchorRef}
                  setOpenCalendar={setOpenCalendar}
                  openCalendar={openCalendar}
                  task={task}
                  source={"ListView"}
                />
              </Stack>
            </Box>
          )}
        </Draggable>
      ) : (
        <Draggable draggableId={taskId.toString()} index={index}>
          {(provided) => (
            <Box
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              backgroundColor="white"
              mb="0.5rem"
              px="0.7rem"
              py="1.2rem"
              borderRadius="4px"
              sx={{ boxShadow: "0px 2px #e8e8e8" }}
              onClick={handleOpenDetailTask}
            >
              <Stack direction={"column"} alignItems="start">
                <Typography variant="body2" mb="0.5rem" data-title="title">
                  {taskTitle}
                </Typography>
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
                        height: "19.5px",
                      }}
                    />
                  )}
                </Stack>
              </Stack>
              <CalendarModal
                calendarAnchorRef={calendarAnchorRef}
                setOpenCalendar={setOpenCalendar}
                openCalendar={openCalendar}
                task={task}
                source={"BoardView"}
              />
            </Box>
          )}
        </Draggable>
      )}
    </>
  );
};

export default IndividualTask;
