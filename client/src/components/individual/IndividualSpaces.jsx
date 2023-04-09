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
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import IndividualProject from "./IndividualProject";
import InviteMemberModal from "../sidebar/InviteMemberModal";

const IndividualSpaces = ({ space, setOpenNewProjectModal }) => {
  const [isHover, setIsHover] = useState(false);
  const [openInviteMemberModal, setOpenInviteMemberModal] = useState({
    open: false,
    spaceId: null,
  });
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
  const handleOpenInviteMemberModal = (e) => {
    e.stopPropagation();
    setOpenInviteMemberModal({ open: true, spaceId: space._id });
  };
  return (
    <>
      <Accordion disableGutters elevation={0} square>
        <AccordionSummary
          onMouseEnter={handleHover}
          onMouseLeave={handleLeave}
          expandIcon={isHover && <ExpandMoreOutlinedIcon />}
          sx={{
            position: "relative",
            backgroundColor: isHover && "gray.bgLight",
          }}
        >
          <Stack direction="row" alignItems="center">
            <Box
              width="1.5rem"
              height="1.5rem"
              mr="1rem"
              sx={{
                backgroundColor: space.spaceColor,
                color: "white",
                textAlign: "center",
                position: "absolute",
                borderRadius: "4px",
              }}
            >
              {space.spaceTitle[0]}
            </Box>
            <Typography variant="body2" position="absolute" left="3rem">
              {!isHover && space.spaceTitle}
            </Typography>

            {isHover && (
              <AddIcon
                onClick={handleOpenNewProjectModal}
                sx={{
                  position: "absolute",
                  right: "4.1rem",
                  color: "gray.fontMDark",
                  width: "1.1rem",
                }}
              />
            )}
            {isHover && (
              <PeopleAltOutlinedIcon
                onClick={handleOpenInviteMemberModal}
                sx={{
                  position: "absolute",
                  right: "2.7rem",
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
      <InviteMemberModal
        openInviteMemberModal={openInviteMemberModal}
        setOpenInviteMemberModal={setOpenInviteMemberModal}
        activeSpace={space}
      />
    </>
  );
};

export default IndividualSpaces;
