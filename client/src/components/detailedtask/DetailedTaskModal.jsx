import React, { useEffect, useState } from "react";
import { Box, Modal, Stack, Divider, Tabs, Tab } from "@mui/material";
import LeftDetailedTask from "./LeftDetailedTask";
import RightDetailedTask from "./RightDetailedTask";
import { useDataContext } from "../../context/Context";
import { useSocketContext } from "../../context/socketContext";
const DetailedTaskModal = ({}) => {
  const { socket } = useSocketContext();
  const { setDetailedTaskSelected, detailedTaskSelected } = useDataContext();
  const [mobileTaskSection, setMobileTaskSection] = useState("Details");

  const handleCloseModal = () => {
    setDetailedTaskSelected({ task: {}, open: false });
    socket.emit("leaveTask", detailedTaskSelected.taskId);
  };
  const handleMobileTaskSection = (e, value) => {
    setMobileTaskSection(value);
  };
  useEffect(() => {
    socket.on("updateTask", (listData) => {
      listData.tasks.map((task) => {
        if (detailedTaskSelected.taskId === task.taskId) {
          setDetailedTaskSelected((prev) => ({
            ...prev,
            taskTitle: task.taskTitle,
          }));
        }
      });
    });
  }, [socket]);
  return (
    <Modal
      open={true}
      onClose={handleCloseModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "90vw", md: "60rem", lg: "60rem" },
          bgcolor: "background.paper",
          borderRadius: "4px",
          outline: "none",
          height: { xs: "40rem", lg: "37rem" },
        }}
      >
        <Box ml="1rem" display={{ xs: "block", lg: "none" }}>
          <Tabs
            value={mobileTaskSection}
            onChange={handleMobileTaskSection}
            aria-label="basic tabs example"
          >
            <Tab label="Details" value="Details" />
            <Tab label="Activity" value="Activity" />
          </Tabs>
        </Box>
        <Stack direction="row" justifyContent="space-between">
          <LeftDetailedTask mobileTaskSection={mobileTaskSection} />
          <Divider orientation="vertical" flexItem />
          <RightDetailedTask
            handleCloseModal={handleCloseModal}
            mobileTaskSection={mobileTaskSection}
          />
        </Stack>
        {/* <ClearIcon
          onClick={""}
          sx={{
            top: "-1.7rem",
            position: "relative",
            left: "24rem",
            color: "gray.fontMDark",
            "&:hover": { color: "black" },
          }}
        /> */}
      </Box>
    </Modal>
  );
};

export default DetailedTaskModal;
