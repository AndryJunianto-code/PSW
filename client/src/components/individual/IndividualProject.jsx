import React from "react";
import { Stack, Typography } from "@mui/material";
import { useDataContext } from "../../context/Context";
import { Link } from "react-router-dom";
import { useSocketContext } from "../../context/socketContext";

const IndividualProject = ({ project }) => {
  const { projectTitle, projectId } = project;
  const { socket } = useSocketContext();
  const { setViewMode, setActiveProject, activeProject } = useDataContext();
  const handleSetActiveProject = () => {
    socket.emit("leaveProject", activeProject);
    setActiveProject({ projectTitle, projectId });
    socket.emit("joinProject", { projectTitle, projectId });
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
