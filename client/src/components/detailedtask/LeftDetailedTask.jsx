import { useState } from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  InputBase,
  Stack,
  Typography,
} from "@mui/material";
import { useDataContext } from "../../context/Context";
import { useMutation } from "react-query";
import { changeTaskTitle, deleteTask } from "../../request/listRequest";
import { useSocketContext } from "../../context/socketContext";

const LeftDetailedTask = ({ mobileTaskSection }) => {
  const { socket } = useSocketContext();
  const { detailedTaskSelected, setDetailedTaskSelected } = useDataContext();
  const [taskTitleInput, setTaskTitleInput] = useState({
    updateMode: false,
    title: "",
  });

  const { mutate: mutateDeleteTask } = useMutation(deleteTask, {
    onSuccess: (data) => {
      socket.emit("deleteTask", data);
      setDetailedTaskSelected({ open: false });
    },
  });

  const { mutate: mutateChangeTaskTitle } = useMutation(changeTaskTitle, {
    onSuccess: (data) => {
      socket.emit("changeTaskTitle", {
        listData: data,
        taskId: detailedTaskSelected.taskId,
      });
      setTaskTitleInput({ title: "", updateMode: false });
    },
  });
  const handleDeleteTask = () => {
    mutateDeleteTask({
      listId: detailedTaskSelected.listId,
      taskId: detailedTaskSelected.taskId,
    });
  };
  const handleTaskTitleInput = (e) => {
    setTaskTitleInput({
      title: e.target.value,
      updateMode: taskTitleInput.updateMode,
    });
  };
  const handleEditingTitleMode = (e) => {
    setTaskTitleInput({
      updateMode: true,
      title: detailedTaskSelected.taskTitle,
    });
  };
  const handleModifyTaskTitle = () => {
    mutateChangeTaskTitle({
      listId: detailedTaskSelected.listId,
      taskId: detailedTaskSelected.taskId,
      taskTitle: taskTitleInput.title,
    });
  };
  return (
    <Box
      flex={2}
      sx={{
        display: {
          xs: mobileTaskSection === "Details" ? "block" : "none",
          lg: "block",
        },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        px="2rem"
        pt="1.5rem"
        pb="1.5rem"
      >
        <Stack direction="row" alignItems="center">
          <Button variant="contained" size="small">
            {detailedTaskSelected.listTitle}
          </Button>
          <PersonAddAltOutlinedIcon
            sx={{
              fontSize: "1.1rem",
              color: "gray.fontMDark",
              "&:hover": { color: "black", border: "1px solid black" },
              border: "1px solid #959ba6",
              borderRadius: "50px",
              padding: "0.2rem",
              ml: "1.7rem",
            }}
          />
        </Stack>
        <DeleteOutlineOutlinedIcon
          onClick={handleDeleteTask}
          sx={{
            fontSize: "1.1rem",
            color: "gray.fontMDark",
            "&:hover": { color: "red" },
          }}
        />
      </Stack>
      <Divider />
      <Box px={"2rem"} mt="1.5rem" mb="5rem" height="16rem">
        {taskTitleInput.updateMode ? (
          <InputBase
            onBlur={handleModifyTaskTitle}
            onKeyDown={(e) => e.key === "Enter" && handleModifyTaskTitle()}
            value={taskTitleInput.title}
            onChange={handleTaskTitleInput}
            fullWidth={true}
            autoFocus={true}
            sx={{
              mb: "0.9rem",
              border: "1px solid #959ba6",
              px: "0.4rem",
            }}
          />
        ) : (
          <Typography
            variant="h6"
            mb="1rem"
            px="0.4rem"
            onClick={handleEditingTitleMode}
            sx={{
              "&:hover": {
                border: "1px solid #959ba6",
                mb: "0.9rem",
              },
            }}
          >
            {detailedTaskSelected.taskTitle}
          </Typography>
        )}
        <Typography variant="caption" lineHeight="0.3rem">
          Swimming is an individual or team racing sport that requires the use
          of one's entire body to move through water. The sport takes place in
          pools or open...
        </Typography>
      </Box>
      <Divider />
      <Box px="2rem" mt="1rem" pb="1.5rem">
        <Typography
          mb="0.6rem"
          color="grey"
          variant="body2"
          letterSpacing="1px"
        >
          CHECKLIST
        </Typography>
        <Stack>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  height: "20px",
                  boxSizing: "border-box",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            }
            label={<Typography variant="caption">Freestyle</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  height: "20px",
                  boxSizing: "border-box",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            }
            label={<Typography variant="caption">Butterfly</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  height: "20px",
                  boxSizing: "border-box",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            }
            label={<Typography variant="caption">Frog</Typography>}
          />
          <Typography variant="caption" color="gray.fontMDark" mt="0.2rem">
            + Add checklist
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default LeftDetailedTask;
