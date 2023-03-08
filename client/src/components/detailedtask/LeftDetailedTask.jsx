import React from "react";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useDataContext } from "../../context/Context";

const LeftDetailedTask = ({ mobileTaskSection }) => {
  const { detailedTaskSelected } = useDataContext();
  return (
    <Box
      flex={2}
      sx={{
        display: {
          xs: mobileTaskSection === "Details" ? "block" : "none",
          lg: "block",
        },
      }}
    >
      <Stack
        direction="row "
        alignItems="center"
        justifyContent="space-between"
        px="2rem"
        pt="1.5rem"
        pb="1.5rem"
      >
        <Stack direction="row" alignItems="center">
          <Button variant="contained" size="small">
            Uni
          </Button>
          <PersonAddAltOutlinedIcon
            sx={{
              fontSize: "1.1rem",
              color: "gray.fontMDark",
              "&:hover": { color: "black", border: "1px solid black" },
              border: "1px solid #959ba6",
              borderRadius: "50px",
              padding: "0.2rem",
              ml: "1.7rem",
            }}
          />
        </Stack>
        <DeleteOutlineOutlinedIcon
          sx={{
            fontSize: "1.1rem",
            color: "gray.fontMDark",
            "&:hover": { color: "red" },
          }}
        />
      </Stack>
      <Divider />
      <Box px={"2rem"} mt="1.5rem" mb="5rem" height="16rem">
        <Typography variant="h6" mb="1rem">
          {detailedTaskSelected.task}
        </Typography>
        <Typography variant="caption" lineHeight="0.3rem">
          Swimming is an individual or team racing sport that requires the use
          of one's entire body to move through water. The sport takes place in
          pools or open...
        </Typography>
      </Box>
      <Divider />
      <Box px="2rem" mt="1rem" pb="1.5rem">
        <Typography
          mb="0.6rem"
          color="grey"
          variant="body2"
          letterSpacing="1px"
        >
          CHECKLIST
        </Typography>
        <Stack>
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  height: "20px",
                  boxSizing: "border-box",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            }
            label={<Typography variant="caption">Freestyle</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  height: "20px",
                  boxSizing: "border-box",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            }
            label={<Typography variant="caption">Butterfly</Typography>}
          />
          <FormControlLabel
            control={
              <Checkbox
                defaultChecked
                sx={{
                  height: "20px",
                  boxSizing: "border-box",
                  "& .MuiSvgIcon-root": { fontSize: 18 },
                }}
              />
            }
            label={<Typography variant="caption">Frog</Typography>}
          />
          <Typography variant="caption" color="gray.fontMDark" mt="0.2rem">
            + Add checklist
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default LeftDetailedTask;
