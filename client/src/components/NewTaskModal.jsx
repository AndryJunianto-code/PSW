import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  InputBase,
  Stack,
  Button,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const NewTaskModal = ({ openNewTaskModal, handleCloseNewTaskModal }) => {
  return (
    <Modal
      open={openNewTaskModal}
      onClose={handleCloseNewTaskModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          bottom: "-2rem",
          left: "85%",
          transform: "translate(-50%, -50%)",
          width: { xs: "300px", md: "400px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "4px",
          p: 4,
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Create New Task
        </Typography>
        <ClearIcon
          onClick={handleCloseNewTaskModal}
          sx={{
            top: "-1.7rem",
            position: "relative",
            left: "24rem",
            color: "gray.fontMDark",
            "&:hover": { color: "black" },
          }}
        />
        <Stack>
          <Typography sx={{ mt: 2 }} variant="caption">
            Task name
          </Typography>
          <InputBase
            onChange={""}
            value={""}
            placeholder="Enter Task name"
            required
            sx={{ borderBottom: "1px solid #e4e4e4" }}
          />
        </Stack>
        <Button
          onClick={""}
          variant="contained"
          sx={{
            marginTop: "2rem",
            textTransform: "initial",
            fontSize: "1rem",
          }}
          fullWidth
        >
          Create Project
        </Button>
      </Box>
    </Modal>
  );
};

export default NewTaskModal;
