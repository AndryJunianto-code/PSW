import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import AddIcon from "@mui/icons-material/Add";
import IndividualProject from "./IndividualProject";

const IndividualSpaces = ({ space, setOpenNewProjectModal }) => {
  const [isHover, setIsHover] = useState(false);
  const handleHover = () => {
    setIsHover(true);
  };
  const handleLeave = () => {
    setIsHover(false);
  };
  const handleOpenNewProjectModal = (e) => {
    e.stopPropagation();
    setOpenNewProjectModal({ open: true, spaceId: space._id });
  };
  return (
    <Accordion
      disableGutters
      elevation={0}
      square
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
    >
      <AccordionSummary
        expandIcon={isHover && <ExpandMoreOutlinedIcon position={"relative"} />}
      >
        <Stack direction="row" alignItems="center">
          <Box
            width="1.5rem"
            height="1.5rem"
            borderRadius="4px"
            mr="1rem"
            sx={{
              backgroundColor: space.spaceColor,
              color: "white",
              textAlign: "center",
            }}
          >
            {space.spaceTitle[0]}
          </Box>
          <Typography variant="body2">{space.spaceTitle}</Typography>
          {isHover && (
            <AddIcon
              onClick={handleOpenNewProjectModal}
              sx={{
                position: "absolute",
                right: "2.5rem",
                color: "gray.fontMDark",
                width: "1.1rem",
              }}
            />
          )}
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingRight: "1.3rem",
          paddingLeft: "1.5rem",
        }}
      >
        {space !== null &&
          space?.projects.map((project) => (
            <IndividualProject key={project.projectId} project={project} />
          ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default IndividualSpaces;
