import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ClickAwayListener,
  Grow,
  InputBase,
  Paper,
  Popper,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import { createTask } from "../../request/listRequest";
import { v4 } from "uuid";
import { useListContext } from "../../context/listContext";
import { useSocketContext } from "../../context/socketContext";

const NewTaskModal = ({
  newTaskAnchorRef,
  openNewTaskModal,
  setOpenNewTaskModal,
  date,
}) => {
  const { allList } = useListContext();
  const { socket } = useSocketContext();
  const firstListId = allList[0]?._id;
  const [newTaskInputTitle, setNewTaskInputTitle] = useState("");
  const { mutate: mutateNewTask, isLoading: newTaskLoading } = useMutation(
    createTask,
    {
      onSuccess: (data) => {
        setOpenNewTaskModal(false);
        socket.emit("createNewTask", data);
      },
    }
  );

  const handleCloseModal = (event) => {
    if (
      newTaskAnchorRef.current &&
      newTaskAnchorRef.current.contains(event.target)
    ) {
      return;
    }
    setOpenNewTaskModal(false);
  };

  const handleNewTaskInputTitle = (e) => {
    setNewTaskInputTitle(e.target.value);
  };
  const handleCreateNewTaskEnter = (e) => {
    if (e.keyCode === 13 && newTaskLoading === false) {
      setNewTaskInputTitle("");
      mutateNewTask({
        taskTitle: newTaskInputTitle,
        taskId: v4(),
        createdAt: Date.now() / 1000,
        dueDate: date,
        listId: firstListId,
      });
    }
  };
  const handleCreateNewTask = (e) => {
    setNewTaskInputTitle("");
    mutateNewTask({
      taskTitle: newTaskInputTitle,
      taskId: v4(),
      createdAt: Date.now() / 1000,
      dueDate: date,
      listId: firstListId,
    });
  };
  return (
    <Popper
      open={openNewTaskModal}
      anchorEl={newTaskAnchorRef.current}
      role={undefined}
      placement="bottom-start"
      transition
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === "right-start" ? "left top" : "left bottom",
          }}
        >
          <Paper
            sx={{
              mt: "0.3rem",
              position: "relative",
            }}
          >
            <ClickAwayListener onClickAway={handleCloseModal}>
              <Box
                width="18rem"
                height="4rem"
                px="1rem"
                py="0.2rem"
                border={"1px solid #645CBB"}
                borderRadius={"4px"}
              >
                <InputBase
                  onChange={handleNewTaskInputTitle}
                  onKeyDown={handleCreateNewTaskEnter}
                  value={newTaskInputTitle}
                  placeholder="Task name"
                  fullWidth
                  sx={{ fontSize: "0.8rem" }}
                />
                <Stack
                  direction="row"
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Typography fontSize="0.7rem">{date}</Typography>
                  <Button
                    size="small"
                    sx={{ fontSize: "0.6rem" }}
                    variant="contained"
                    disableElevation
                    onClick={handleCreateNewTask}
                  >
                    Save
                  </Button>
                </Stack>
              </Box>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
};

export default NewTaskModal;
