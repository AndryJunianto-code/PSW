import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Draggable } from "react-beautiful-dnd";

const IndividualCalendarTask = ({ task, index }) => {
  const { taskId, taskTitle, listId } = task;

  return (
    <Draggable
      draggableId={taskId.toString() + " " + listId.toString()}
      index={index}
    >
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          sx={{
            backgroundColor: "#fdf4b3",
            px: "0.2rem",
            py: "0.1rem",
            borderRadius: "2px",
            fontSize: "0.8rem",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          {taskTitle}
        </Box>
      )}
    </Draggable>
  );
};

export default IndividualCalendarTask;
