import { Box, InputBase, Typography } from "@mui/material";
import { changeTaskSubtitle, changeTaskTitle } from "../../request/listRequest";
import { useState } from "react";
import { useSocketContext } from "../../context/socketContext";
import { useDataContext } from "../../context/Context";
import { useMutation } from "react-query";

const DetailedTaskTitle = () => {
  const { socket } = useSocketContext();
  const { detailedTaskSelected } = useDataContext();
  const [taskTitleInput, setTaskTitleInput] = useState({
    updateMode: false,
    title: "",
  });
  const [taskSubtitleInput, setTaskSubtitleInput] = useState({
    updateMode: false,
    subtitle: "",
  });

  const { mutate: mutateChangeTaskTitle } = useMutation(changeTaskTitle, {
    onSuccess: (data) => {
      socket.emit("changeTask", {
        listData: data,
        taskId: detailedTaskSelected.taskId,
      });
      setTaskTitleInput({ title: "", updateMode: false });
    },
  });
  const { mutate: mutateChangeTaskSubtitle } = useMutation(changeTaskSubtitle, {
    onSuccess: (data) => {
      socket.emit("changeTask", {
        listData: data,
        taskId: detailedTaskSelected.taskId,
      });
      setTaskSubtitleInput({ subtitle: "", updateMode: false });
    },
  });

  const handleTaskTitleInput = (e) => {
    setTaskTitleInput({
      title: e.target.value,
      updateMode: taskTitleInput.updateMode,
    });
  };
  const handleTaskSubtitleInput = (e) => {
    setTaskSubtitleInput({
      subtitle: e.target.value,
      updateMode: taskSubtitleInput.updateMode,
    });
  };
  const handleEditingTitleMode = (e) => {
    setTaskTitleInput({
      updateMode: true,
      title: detailedTaskSelected.taskTitle,
    });
  };
  const handleEditingSubtitleMode = (e) => {
    setTaskSubtitleInput({
      updateMode: true,
      subtitle: detailedTaskSelected.taskSubtitle,
    });
  };
  const handleModifyTaskTitle = () => {
    mutateChangeTaskTitle({
      listId: detailedTaskSelected.listId,
      taskId: detailedTaskSelected.taskId,
      taskTitle: taskTitleInput.title,
    });
  };
  const handleModifyTaskSubtitle = () => {
    mutateChangeTaskSubtitle({
      listId: detailedTaskSelected.listId,
      taskId: detailedTaskSelected.taskId,
      taskSubtitle: taskSubtitleInput.subtitle,
    });
  };

  return (
    <Box px={"1.6rem"} mt="1.5rem" mb="5rem" height="16rem">
      {taskTitleInput.updateMode ? (
        <InputBase
          onBlur={handleModifyTaskTitle}
          onKeyDown={(e) => e.key === "Enter" && handleModifyTaskTitle()}
          value={taskTitleInput.title}
          onChange={handleTaskTitleInput}
          fullWidth={true}
          autoFocus={true}
          sx={{
            mb: "1rem",
            border: "1px solid #959ba6",
            px: "0.4rem",
          }}
        />
      ) : (
        <Typography
          variant="h6"
          mb="1rem"
          px="0.4rem"
          border="1px solid white"
          onClick={handleEditingTitleMode}
          sx={{
            "&:hover": {
              border: "1px solid #959ba6",
            },
          }}
        >
          {detailedTaskSelected.taskTitle}
        </Typography>
      )}

      {taskSubtitleInput.updateMode ? (
        <InputBase
          inputProps={{
            maxLength: 60,
          }}
          onBlur={handleModifyTaskSubtitle}
          onKeyDown={(e) => e.key === "Enter" && handleModifyTaskSubtitle()}
          value={taskSubtitleInput.subtitle}
          onChange={handleTaskSubtitleInput}
          fullWidth={true}
          autoFocus={true}
          size="md"
          sx={{
            mb: "1rem",
            border: "1px solid #959ba6",
            px: "0.4rem",
            fontSize: "0.9rem",
          }}
        />
      ) : (
        <Typography
          variant="h6"
          mb="1rem"
          px="0.4rem"
          pt="0.15rem"
          fontSize={"0.9rem"}
          border="1px solid white"
          onClick={handleEditingSubtitleMode}
          height={"1.7rem"}
          sx={{
            border: "1px solid #959ba6",
            borderRadius: "4px",
          }}
        >
          {!detailedTaskSelected.taskSubtitle
            ? "Add a description..."
            : detailedTaskSelected.taskSubtitle}
        </Typography>
      )}
    </Box>
  );
};

export default DetailedTaskTitle;
