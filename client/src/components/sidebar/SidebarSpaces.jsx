import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useEffect, useState } from "react";
import NewSpaceModal from "./NewSpaceModal";
import { useQuery } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import { fetchAllSpaces } from "../../request/spaceRequest";
import IndividualSpaces from "../individual/IndividualSpaces";
import NewProjectModal from "../sidebar/NewProjectModal";
import InviteMemberModal from "./InviteMemberModal";

const SidebarSpaces = () => {
  const { user } = useAuth0();
  const [openNewSpaceModal, setOpenNewSpaceModal] = useState(false);
  const [openNewProjectModal, setOpenNewProjectModal] = useState({
    open: false,
    spaceId: null,
  });
  const [openInviteMemberModal, setOpenInviteMemberModal] = useState({
    open: false,
    spaceId: null,
  });
  const handleOpenNewSpaceModal = () => setOpenNewSpaceModal(true);
  const handleCloseNewSpaceModal = () => setOpenNewSpaceModal(false);
  const [spaces, setSpaces] = useState([]);
  const {
    data: spacesData,
    isSuccess: spacesSuccess,
    refetch: refetchSpaces,
  } = useQuery(["fetchAllSpaces", user?.sub], fetchAllSpaces, {
    retryDelay: 3000,
  });
  useEffect(() => {
    spacesSuccess && setSpaces(spacesData);
  }, [spacesData, spacesSuccess]);
  return (
    <>
      <Accordion disableGutters elevation={0} square defaultExpanded={true}>
        <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            SPACES
          </Typography>
        </AccordionSummary>

        <AccordionDetails>
          <Button
            onClick={handleOpenNewSpaceModal}
            variant="contained"
            sx={{ width: "100%", fontSize: "0.7rem" }}
          >
            + NEW SPACE
          </Button>
          <Box mt="0.7rem">
            {spaces !== null &&
              spaces.map((space) => (
                <IndividualSpaces
                  key={space._id}
                  space={space}
                  setOpenNewProjectModal={setOpenNewProjectModal}
                  setOpenInviteMemberModal={setOpenInviteMemberModal}
                />
              ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <NewSpaceModal
        handleCloseNewSpaceModal={handleCloseNewSpaceModal}
        openNewSpaceModal={openNewSpaceModal}
        refetchSpaces={refetchSpaces}
      />
      <NewProjectModal
        openNewProjectModal={openNewProjectModal}
        setOpenNewProjectModal={setOpenNewProjectModal}
        refetchSpaces={refetchSpaces}
      />
      <InviteMemberModal
        openInviteMemberModal={openInviteMemberModal}
        setOpenInviteMemberModal={setOpenInviteMemberModal}
      />
    </>
  );
};

export default SidebarSpaces;
