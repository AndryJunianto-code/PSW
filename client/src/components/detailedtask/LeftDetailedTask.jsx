import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useMutation } from "react-query";
import { deleteTask } from "../../request/listRequest";
import { useSocketContext } from "../../context/socketContext";
import DetailedTaskTitle from "./DetailedTaskTitle";
import { useDataContext } from "../../context/Context";

const LeftDetailedTask = ({ mobileTaskSection }) => {
  const { socket } = useSocketContext();
  const { detailedTaskSelected, setDetailedTaskSelected } = useDataContext();

  const { mutate: mutateDeleteTask } = useMutation(deleteTask, {
    onSuccess: (data) => {
      socket.emit("deleteTask", data);
      setDetailedTaskSelected({ open: false });
    },
  });

  const handleDeleteTask = () => {
    mutateDeleteTask({
      listId: detailedTaskSelected.listId,
      taskId: detailedTaskSelected.taskId,
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
        <Button variant="contained" size="small">
          {detailedTaskSelected.listTitle}
        </Button>
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
      <DetailedTaskTitle />
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
        <Typography
          mb="0.6rem"
          color="grey"
          variant="body2"
          letterSpacing="1px"
        >
          Coming soon...
        </Typography>
      </Box>
    </Box>
  );
};

export default LeftDetailedTask;
