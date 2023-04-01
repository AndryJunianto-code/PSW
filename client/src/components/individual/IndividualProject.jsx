import React from "react";
import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../context/Context";
import { Link } from "react-router-dom";

const IndividualProject = ({ project }) => {
  const { projectTitle, projectId } = project;
  const { setViewMode, setActiveProject } = useDataContext();
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
      <Link to="/" className="link">
        <Typography variant="caption">&#x2192; {projectTitle}</Typography>
      </Link>
    </Stack>
  );
};

export default IndividualProject;
