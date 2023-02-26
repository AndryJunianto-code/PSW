import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";

const IndividualListTask = ({ todo, index }) => {
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided) => (
        <Box
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          backgroundColor="white"
          mb="0.15rem"
          px="1rem"
          py="0.3rem"
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body2">{todo.task}</Typography>
            <Typography variant="caption">Mar 6</Typography>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default IndividualListTask;
