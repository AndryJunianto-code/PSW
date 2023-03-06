import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { ListDroppable } from "../utils/ListDroppable";
import IndividualBoardTask from "./individual/IndividualBoardTask";

const BoardView = () => {
  const [todos, setTodos] = useState([
    { id: "1", task: "clean" },
    { id: "2", task: "running" },
    { id: "3", task: "drive" },
    { id: "4", task: "gym" },
    { id: "5", task: "sleep" },
    { id: "6", task: "meet friend" },
    { id: "7", task: "drive" },
    { id: "8", task: "drink" },
    { id: "9", task: "club" },
    { id: "10", task: "games" },
    { id: "11", task: "work" },
    { id: "12", task: "swim" },
    { id: "13", task: "drive" },
  ]);
  const [completed, setCompleted] = useState([
    { id: "AA", task: "cleaning" },
    { id: "BB", task: "makan" },
  ]);

  const handleDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add;
    let active = todos;
    let complete = completed;
    if (source.droppableId === "todo") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "todo") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompleted(complete);
    setTodos(active);
  };
  return (
    <Box backgroundColor="gray.bgLight" mt="7vh" height="93vh">
      <Box pt="2rem" pl="2rem" pr="1rem">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Stack direction="row">
            <ListDroppable droppableId="todo">
              {(provided) => (
                <Box
                  width="15rem"
                  mr="1.2rem"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    backgroundColor="white"
                    px="0.3rem"
                    py="0.5rem"
                    mb="2rem"
                    borderRadius="4px"
                    borderTop="1px solid red"
                    sx={{ boxShadow: "0px 3px #e8e8e8" }}
                  >
                    <Typography variant="body2" mr="1.5rem">
                      Todo
                    </Typography>
                    <Typography variant="caption">17</Typography>
                  </Stack>
                  <Box
                    sx={{
                      height: "78vh",
                      overflowY: "auto",
                    }}
                  >
                    {todos.map((todo, index) => (
                      <IndividualBoardTask
                        key={index}
                        todo={todo}
                        index={index}
                      />
                    ))}
                  </Box>
                  {provided.placeholder}
                </Box>
              )}
            </ListDroppable>

            {/* SECOND */}
            <ListDroppable droppableId="completed">
              {(provided) => (
                <Box
                  width="15rem"
                  mr="1.2rem"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <Stack
                    direction="row"
                    alignItems="center"
                    backgroundColor="white"
                    px="0.3rem"
                    py="0.5rem"
                    mb="2rem"
                    borderRadius="4px"
                    borderTop="1px solid blue"
                    sx={{ boxShadow: "0px 3px #e8e8e8" }}
                  >
                    <Typography variant="body2" mr="1.5rem">
                      Completed
                    </Typography>
                    <Typography variant="caption">17</Typography>
                  </Stack>
                  <Box
                    sx={{
                      height: "78vh",
                      overflowY: "auto",
                    }}
                  >
                    {completed.map((todo, index) => (
                      <IndividualBoardTask
                        key={index}
                        todo={todo}
                        index={index}
                      />
                    ))}
                  </Box>
                  {provided.placeholder}
                </Box>
              )}
            </ListDroppable>
          </Stack>
        </DragDropContext>
      </Box>
    </Box>
  );
};

export default BoardView;
