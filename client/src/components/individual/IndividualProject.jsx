import React from "react";
import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../context/Context";

const IndividualProject = ({ project }) => {
  const { projectTitle, projectId } = project;
  const { setActiveProject, setViewMode } = useDataContext();
  const handleSetActiveProject = () => {
    setActiveProject({ projectTitle, projectId });
    setViewMode("List");
  };
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      onClick={handleSetActiveProject}
      mb="0.3rem"
      sx={{ cursor: "pointer" }}
    >
      <Typography variant="caption">{projectTitle}</Typography>
    </Stack>
  );
};

export default IndividualProject;
