import React from "react";
import { Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useDataContext } from "../../context/Context";

const IndividualProject = ({ project }) => {
  const { projectTitle, projectId } = project;
  const { setViewMode } = useDataContext();
  const handleSetActiveProject = () => {
    setViewMode("List");
  };
  return (
    <Link to={`/p/${projectTitle}/${projectId}`} className={"link"}>
      <Stack
        direction={"row"}
        justifyContent="space-between"
        onClick={handleSetActiveProject}
        mb="0.3rem"
        sx={{ cursor: "pointer" }}
      >
        <Typography variant="caption">&#x2192; {projectTitle}</Typography>
      </Stack>
    </Link>
  );
};

export default IndividualProject;
