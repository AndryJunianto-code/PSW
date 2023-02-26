import { Box, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const IndividualBoardTask = ({ todo, index }) => {
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
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
        >
          <Typography variant="body2">{todo.task}</Typography>
        </Box>
      )}
    </Draggable>
  );
};

export default IndividualBoardTask;
