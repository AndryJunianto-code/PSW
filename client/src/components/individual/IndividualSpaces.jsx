import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Typography,
  Stack,
} from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const IndividualSpaces = ({ space }) => {
  return (
    <Accordion disableGutters elevation={0} square>
      <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
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
        </Stack>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          paddingRight: "1.3rem",
          paddingLeft: "1.5rem",
        }}
      >
        <Stack direction={"row"} justifyContent="space-between">
          <Typography variant="caption">Personal</Typography>
          <Typography variant="caption">37</Typography>
        </Stack>
      </AccordionDetails>
    </Accordion>
  );
};

export default IndividualSpaces;
