import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";

const IndividualListTask = ({ todo, index }) => {
  const { setDetailedTaskSelected } = useDataContext();
  const handleOpenDetailTask = () => {
    setDetailedTaskSelected({ task: todo.task, open: true });
    console.log(1321);
  };
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
          onClick={handleOpenDetailTask}
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
