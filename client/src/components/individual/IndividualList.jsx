import { Box, InputBase, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import ArrowRightOutlinedIcon from "@mui/icons-material/ArrowRightOutlined";
import { ListDroppable } from "../../utils/ListDroppable";
import IndividualTask from "./IndividualTask";
import { useMutation } from "react-query";
import { createTask } from "../../request/listRequest";
import { v4 } from "uuid";
import { useSocketContext } from "../../context/socketContext";
import EditIcon from "@mui/icons-material/Edit";
import { useListContext } from "../../context/listContext";

const IndividualList = ({ list }) => {
  const { listTitle, listColor, tasks, _id } = list;
  const { listModalDispatch } = useListContext();
  const { socket } = useSocketContext();
  const [isHover, setIsHover] = useState(false);
  const [isListDropOpen, setIsListDropOpen] = useState(true);
  const [newTaskInputTitle, setNewTaskInputTitle] = useState("");
  const [isEditingTaskMode, setIsEditingTaskMode] = useState(false);

  const { mutate: mutateNewTask, isLoading: newTaskLoading } = useMutation(
    createTask,
    {
      onSuccess: (data) => {
        setNewTaskInputTitle("");
        socket.emit("createNewTask", data);
      },
    }
  );

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
    if (e.keyCode === 13 && newTaskLoading === false) {
      mutateNewTask({
        listId: _id,
        taskTitle: newTaskInputTitle,
        taskId: v4(),
      });
    }
  };
  const handleOpenModifyList = () => {
    listModalDispatch({
      type: "openListModalUpdate",
      listTitle,
      listColor,
      listId: _id,
    });
  };
  const handleHover = () => {
    setIsHover(true);
  };
  const handleLeave = () => {
    setIsHover(false);
  };
  return (
    <Box mt="1.6rem">
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" alignItems={"center"}>
          <Box onClick={handleToggleListDrop}>
            {isListDropOpen ? (
              <ArrowDropDownCircleOutlinedIcon
                sx={{ width: "1.1rem", color: listColor }}
              />
            ) : (
              <ArrowRightOutlinedIcon
                sx={{ width: "1.1rem", color: listColor }}
              />
            )}
          </Box>

          <Typography
            onMouseEnter={handleHover}
            onMouseLeave={handleLeave}
            variant="caption"
            height={"1.2rem"}
            mr={!isHover && "1.2rem"}
            ml="0.4rem"
            sx={{
              backgroundColor: listColor,
              borderRadius: `4px ${isHover ? "0px" : "4px"} 0px 0px`,
              paddingX: "0.4rem",
              color: "white",
            }}
          >
            {listTitle}
          </Typography>
          {isHover && (
            <EditIcon
              onClick={handleOpenModifyList}
              onMouseEnter={handleHover}
              onMouseLeave={handleLeave}
              sx={{
                width: "0.8rem",
                height: "1.2rem",
                borderRadius: "0px 4px 0px 0px",
                paddingX: "0.4rem",
                mr: "1.2rem",
                backgroundColor: listColor,
              }}
            />
          )}
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
          variant="caption"
          color="gray.fontMDark"
          pr="3.75rem"
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
              {tasks !== null &&
                tasks?.map(
                  (task, index) =>
                    task !== null && (
                      <IndividualTask
                        index={index}
                        task={task}
                        listId={_id}
                        key={task?.taskId}
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
      )}
    </Box>
  );
};

export default IndividualList;
