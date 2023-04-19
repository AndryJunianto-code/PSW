import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import { ListDroppable } from "../../utils/ListDroppable";
import IndividualBoardTask from "./IndividualBoardTask";
import IndividualTask from "./IndividualTask";

const IndividualBoardList = ({ list }) => {
  const { listTitle, listColor, tasks, _id } = list;
  return (
    <Box minWidth="15rem" mr="1.2rem">
      <Stack
        direction="row"
        alignItems="center"
        backgroundColor="white"
        px="0.3rem"
        py="0.5rem"
        mb="2rem"
        borderRadius="4px"
        borderTop={`1px solid ${listColor}`}
        sx={{ boxShadow: "0px 3px #e8e8e8" }}
      >
        <Typography variant="body2" mr="1.5rem">
          {listTitle}
        </Typography>
        <Typography variant="caption">{tasks?.length}</Typography>
      </Stack>
      <ListDroppable droppableId={_id}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              height: "78vh",
              overflowY: "auto",
            }}
          >
            {tasks !== null &&
              tasks?.map(
                (task, index) =>
                  task !== null && (
                    <IndividualTask
                      listId={_id}
                      listTitle={listTitle}
                      index={index}
                      task={task}
                      key={task?.taskId}
                      source={"BoardView"}
                    />
                  )
              )}
            {provided.placeholder}
          </Box>
        )}
      </ListDroppable>
    </Box>
  );
};

export default IndividualBoardList;
