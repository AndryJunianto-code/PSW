import { Box, InputBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { ListDroppable } from "../../utils/ListDroppable";
import IndividualTask from "./IndividualTask";
import { useMutation } from "react-query";
import { createTask } from "../../request/listRequest";
import { v4 } from "uuid";

const IndividualList = ({ list, listRefetch }) => {
  const { listTitle, tasks, _id } = list;
  const [isListDropOpen, setIsListDropOpen] = useState(true);
  const [newTaskInputTitle, setNewTaskInputTitle] = useState("");
  const [isEditingTaskMode, setIsEditingTaskMode] = useState(false);

  const { mutate: mutateNewTask } = useMutation(createTask, {
    onSuccess: (data) => {
      listRefetch();
      setNewTaskInputTitle("");
    },
  });
  const handleToggleListDrop = () => {
    setIsListDropOpen(!isListDropOpen);
  };
  const handleNewTaskInputTitle = (e) => {
    setNewTaskInputTitle(e.target.value);
  };
  const handleEditingTaskMode = () => {
    setIsEditingTaskMode(!isEditingTaskMode);
    setNewTaskInputTitle("");
  };
  const handleCreateNewTask = (e) => {
    if (e.keyCode === 13) {
      mutateNewTask({
        listId: _id,
        taskTitle: newTaskInputTitle,
        taskId: v4(),
      });
    }
  };
  return (
    <Box mt="1.6rem">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems={"center"}>
          <Box onClick={handleToggleListDrop}>
            {isListDropOpen ? (
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
            {listTitle}
          </Typography>
          <Typography
            variant="caption"
            color="gray.fontMDark"
            fontWeight={"600"}
          >
            {tasks.length} TASKS
          </Typography>
        </Stack>
        <Typography
          sx={{ display: `${"isListOpen" ? "block" : "none"}` }}
          pr="1.8rem"
          variant="caption"
          color="gray.fontMDark"
        >
          Due Date
        </Typography>
      </Stack>
      {isListDropOpen && (
        <ListDroppable droppableId={_id}>
          {(provided) => (
            <Box
              mx="1.4rem"
              ref={provided.innerRef}
              {...provided.droppableProps}
              sx={{ display: `${"isListOpen" ? "block" : "none"}` }}
            >
              {tasks?.map((task, index) => (
                <IndividualTask index={index} task={task} key={task.taskId} />
              ))}
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
                  fullWidth="true"
                  autoFocus="true"
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
      )}
    </Box>
  );
};

export default IndividualList;
