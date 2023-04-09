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
import { useMutation } from "react-query";
import { v4 as uuidv4 } from "uuid";
import { createProject } from "../../request/spaceRequest";

const NewSpaceModal = ({
  openNewProjectModal,
  setOpenNewProjectModal,
  refetchSpaces,
}) => {
  const [projectTitle, setProjectTitle] = useState("");
  const handleProjectTitle = (e) => {
    setProjectTitle(e.target.value);
  };
  const { mutate: mutateProject } = useMutation(createProject, {
    onSuccess: (data) => {
      handleCloseNewProjectModal();
      setProjectTitle("");
      refetchSpaces();
    },
  });

  const handleCreateProject = () => {
    mutateProject({
      projectTitle,
      projectId: uuidv4(),
      spaceId: openNewProjectModal.spaceId,
    });
  };

  const handleCloseNewProjectModal = () =>
    setOpenNewProjectModal({ open: false, spaceId: null });

  return (
    <Modal
      open={openNewProjectModal.open}
      onClose={handleCloseNewProjectModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "15rem",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "300px", md: "400px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "4px",
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Create new project
        </Typography>
        <ClearIcon
          onClick={handleCloseNewProjectModal}
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
            Project name
          </Typography>
          <InputBase
            onChange={handleProjectTitle}
            value={projectTitle}
            placeholder="Enter Project name"
            required
            sx={{ borderBottom: "1px solid #e4e4e4" }}
          />
        </Stack>
        <Button
          onClick={handleCreateProject}
          variant="contained"
          sx={{
            marginTop: "2rem",
            textTransform: "initial",
            fontSize: "1rem",
          }}
          fullWidth={true}
        >
          Create Project
        </Button>
      </Box>
    </Modal>
  );
};

export default NewSpaceModal;
