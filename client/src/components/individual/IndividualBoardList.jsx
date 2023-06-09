import { Box, InputBase, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { ListDroppable } from "../../utils/ListDroppable";
import IndividualBoardTask from "./IndividualBoardTask";
import IndividualTask from "./IndividualTask";
import { createTask } from "../../request/listRequest";
import { useSocketContext } from "../../context/socketContext";
import { v4 } from "uuid";
import { useMutation } from "react-query";

const IndividualBoardList = ({ list }) => {
  const { listTitle, listColor, tasks, _id } = list;
  const { socket } = useSocketContext();
  const [newTaskInputTitle, setNewTaskInputTitle] = useState("");
  const [isEditingTaskMode, setIsEditingTaskMode] = useState(false);

  const { mutate: mutateNewTask, isLoading: newTaskLoading } = useMutation(
    createTask,
    {
      onSuccess: (data) => {
        socket.emit("createNewTask", data);
      },
    }
  );

  const handleNewTaskInputTitle = (e) => {
    setNewTaskInputTitle(e.target.value);
  };
  const handleEditingTaskMode = () => {
    setIsEditingTaskMode(!isEditingTaskMode);
    setNewTaskInputTitle("");
  };
  const handleCreateNewTask = (e) => {
    if (e.keyCode === 13 && newTaskLoading === false) {
      setNewTaskInputTitle("");
      mutateNewTask({
        listId: _id,
        taskTitle: newTaskInputTitle,
        taskId: v4(),
        createdAt: Date.now() / 1000,
        dueDate: null,
      });
    }
  };
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
            {!isEditingTaskMode ? (
              <Typography
                variant="caption"
                color="gray.fontMDark"
                fontWeight="500"
                ml="1rem"
                sx={{ cursor: "pointer" }}
                onClick={handleEditingTaskMode}
              >
                + New task
              </Typography>
            ) : (
              <InputBase
                value={newTaskInputTitle}
                onChange={handleNewTaskInputTitle}
                placeholder="+ New task"
                fullWidth={true}
                autoFocus={true}
                sx={{
                  border: "1px solid #A084DC",
                  borderRadius: "3px",
                  paddingX: "1rem",
                  backgroundColor: "white",
                }}
                onBlur={handleEditingTaskMode}
                onKeyDown={handleCreateNewTask}
              />
            )}
            {provided.placeholder}
          </Box>
        )}
      </ListDroppable>
    </Box>
  );
};

export default IndividualBoardList;
