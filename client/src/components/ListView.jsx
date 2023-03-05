import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { DragDropContext } from "react-beautiful-dnd";
import { ListDroppable } from "../utils/ListDroppable";
import IndividualListTask from "./individual/IndividualListTask";
import { useDataContext } from "../context/Context";

const ListView = () => {
  const { activeProject } = useDataContext();
  const [todos, setTodos] = useState([
    { id: "1", task: "clean" },
    { id: "2", task: "running" },
    { id: "3", task: "drive" },
    { id: "4", task: "gym" },
  ]);
  const [completed, setCompleted] = useState([
    { id: "AA", task: "cleaning" },
    { id: "BB", task: "makan" },
  ]);
  const [isListOpen, setIsListOpen] = useState(true);
  const handleOpenList = () => {
    setIsListOpen(!isListOpen);
  };
  const handleDragEnd = (result) => {
    const { source, destination } = result;
  };
  return (
    <Box
      backgroundColor="gray.bgLight"
      mt="5.5rem"
      mx="0.8rem"
      borderRadius={"4px"}
      height="100vh"
      border="0.5px solid #f0f0f0"
      pl="0.8rem"
      pt="0.4rem"
    >
      <DragDropContext onDragEnd={handleDragEnd}>
        <Typography fontWeight="700">{activeProject.projectTitle}</Typography>
        <Box mt="1.6rem">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems={"center"}>
              <Box onClick={handleOpenList}>
                {isListOpen ? (
                  <ArrowDropDownCircleOutlinedIcon
                    sx={{ width: "1.1rem", color: "primary.main" }}
                  />
                ) : (
                  <ArrowRightOutlinedIcon
                    sx={{ width: "1.1rem", color: "primary.main" }}
                  />
                )}
              </Box>

              <Typography
                variant="caption"
                ml="0.4rem"
                mr="1.2rem"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "4px 4px 0px 0px",
                  paddingX: "0.4rem",
                  color: "white",
                }}
              >
                Todo
              </Typography>
              <Typography
                variant="caption"
                color="gray.fontMDark"
                fontWeight={"600"}
              >
                12 TASKS
              </Typography>
            </Stack>
            <Typography
              sx={{ display: `${isListOpen ? "block" : "none"}` }}
              pr="1.8rem"
              variant="caption"
              color="gray.fontMDark"
            >
              Due Date
            </Typography>
          </Stack>
          <ListDroppable droppableId="todo">
            {(provided) => (
              <Box
                mx="1.4rem"
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ display: `${isListOpen ? "block" : "none"}` }}
              >
                {todos?.map((todo, index) => (
                  <IndividualListTask
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </ListDroppable>
        </Box>

        {/* SECOND */}
        <Box mt="1.6rem">
          <Stack direction="row" justifyContent="space-between">
            <Stack direction="row" alignItems={"center"}>
              <Box onClick={handleOpenList}>
                {isListOpen ? (
                  <ArrowDropDownCircleOutlinedIcon
                    sx={{ width: "1.1rem", color: "primary.main" }}
                  />
                ) : (
                  <ArrowRightOutlinedIcon
                    sx={{ width: "1.1rem", color: "primary.main" }}
                  />
                )}
              </Box>

              <Typography
                variant="caption"
                ml="0.4rem"
                mr="1.2rem"
                sx={{
                  backgroundColor: "primary.main",
                  borderRadius: "4px 4px 0px 0px",
                  paddingX: "0.4rem",
                  color: "white",
                }}
              >
                Todo
              </Typography>
              <Typography
                variant="caption"
                color="gray.fontMDark"
                fontWeight={"600"}
              >
                12 TASKS
              </Typography>
            </Stack>
            <Typography
              sx={{ display: `${isListOpen ? "block" : "none"}` }}
              pr="1.8rem"
              variant="caption"
              color="gray.fontMDark"
            >
              Due Date
            </Typography>
          </Stack>
          <ListDroppable droppableId="completed">
            {(provided) => (
              <Box
                mx="1.4rem"
                ref={provided.innerRef}
                {...provided.droppableProps}
                sx={{ display: `${isListOpen ? "block" : "none"}` }}
              >
                {completed?.map((todo, index) => (
                  <IndividualListTask
                    index={index}
                    todo={todo}
                    key={todo.id}
                    todos={todos}
                  />
                ))}
                {provided.placeholder}
              </Box>
            )}
          </ListDroppable>
        </Box>
      </DragDropContext>
    </Box>
  );
};

export default ListView;
