import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { useDataContext } from "../../context/Context";

const IndividualTask = ({ task, index }) => {
  const { taskTitle, taskId } = task;
  const { setDetailedTaskSelected } = useDataContext();
  const handleOpenDetailTask = () => {
    setDetailedTaskSelected({ task: taskTitle, open: true });
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
            <Typography variant="caption">Mar 6</Typography>
          </Stack>
        </Box>
      )}
    </Draggable>
  );
};

export default IndividualTask;
