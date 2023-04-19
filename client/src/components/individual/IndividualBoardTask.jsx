import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useListContext } from "../../context/listContext";
import { useDataContext } from "../../context/Context";
import { useSocketContext } from "../../context/socketContext";

const IndividualBoardTask = ({ task, index, listId, listTitle }) => {
  const { taskId, taskTitle } = task;
  const { setCurrentList } = useListContext();
  const { setDetailedTaskSelected, detailedTaskSelected } = useDataContext();
  const { socket } = useSocketContext();
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
        taskId,
        listId,
        listTitle,
        open: true,
      });
      socket.emit("joinTask", taskId);
    }
  };
  useEffect(() => {
    if (detailedTaskSelected.taskId === taskId) {
      setDetailedTaskSelected((prev) => ({ ...prev, listId, listTitle }));
    }
  }, [listId, listTitle]);
  return (
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
          sx={{ boxShadow: "0px 2px #e8e8e8" }}
          onClick={handleOpenDetailTask}
        >
          <Typography variant="body2">{taskTitle}</Typography>
        </Box>
      )}
    </Draggable>
  );
};

export default IndividualBoardTask;
