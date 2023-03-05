import React from "react";
import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../context/Context";

const IndividualProject = ({ project }) => {
  const { projectTitle, projectId } = project;
  const { setActiveProject } = useDataContext();
  const handleSetActiveProject = () =>
    setActiveProject({ projectTitle, projectId });
  return (
    <Stack
      direction={"row"}
      justifyContent="space-between"
      onClick={handleSetActiveProject}
    >
      <Typography variant="caption">{projectTitle}</Typography>
    </Stack>
  );
};

export default IndividualProject;
