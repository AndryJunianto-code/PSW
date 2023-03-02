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

const SidebarSpaces = () => {
  const { user } = useAuth0();
  const [openNewSpaceModal, setOpenNewSpaceModal] = useState(false);
  const handleOpenNewSpaceModal = () => setOpenNewSpaceModal(true);
  const handleCloseNewSpaceModal = () => setOpenNewSpaceModal(false);
  const [spaces, setSpaces] = useState([]);
  const { data: spacesData, isSuccess: spacesSuccess } = useQuery(
    ["fetchAllSpaces", user?.sub],
    fetchAllSpaces,
    {
      retryDelay: 3000,
    }
  );
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
                <IndividualSpaces key={space._id} space={space} />
              ))}
          </Box>
        </AccordionDetails>
      </Accordion>
      <NewSpaceModal
        handleCloseNewSpaceModal={handleCloseNewSpaceModal}
        handleOpenNewSpaceModal={handleOpenNewSpaceModal}
        openNewSpaceModal={openNewSpaceModal}
      />
    </>
  );
};

export default SidebarSpaces;
