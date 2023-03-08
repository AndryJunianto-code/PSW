import { Box, Divider, InputBase, Stack, Typography } from "@mui/material";
import React from "react";

const RightDetailedTask = ({ handleCloseModal, mobileTaskSection }) => {
  return (
    <Box
      flex={2}
      width="100%"
      overflow="hidden"
      sx={{
        display: {
          xs: mobileTaskSection === "Activity" ? "block" : "none",
          lg: "block",
        },
      }}
    >
      <Stack
        px="2rem"
        pt="1.5rem"
        pb="1.45rem"
        direction="row"
        alignItems="center"
      >
        <Box>
          <Typography fontSize="0.7rem" color="gray.fontMDark">
            CREATED
          </Typography>
          <Typography fontSize="0.6rem">Feb 21, 1:26pm</Typography>
        </Box>
        <Divider
          sx={{ mx: "1rem" }}
          orientation="vertical"
          flexItem
          variant="middle"
        />
        <Box>
          <Typography fontSize="0.7rem" color="gray.fontMDark">
            DUE DATE
          </Typography>
          <Typography fontSize="0.6rem" color="red">
            Feb 25
          </Typography>
        </Box>
      </Stack>
      <Divider />
      <Box
        px="2rem"
        pt="1rem"
        sx={{ backgroundColor: "#fbfbfb" }}
        height="29rem"
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb="0.5rem"
        >
          <Typography variant="caption" color="gray.fontMDark">
            You created this task
          </Typography>
          <Typography variant="caption" color="gray.fontMDark">
            Feb 21 at 1.26pm
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mb="0.5rem"
        >
          <Typography variant="caption" color="gray.fontMDark">
            You set the due date to Feb 25
          </Typography>
          <Typography variant="caption" color="gray.fontMDark">
            Feb 21 at 1.26pm
          </Typography>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Typography variant="caption" color="gray.fontMDark">
            You set the due date to Feb 25
          </Typography>
          <Typography variant="caption" color="gray.fontMDark">
            Feb 22 at 1.36pm
          </Typography>
        </Stack>
      </Box>
      <InputBase
        sx={{
          padding: "1rem",
          fontSize: "0.8rem",
          boxShadow: "2",
          width: "100%",
          zIndex: 1050,
          backgroundColor: "white",
          borderRadius: "0px 0px 4px 0px",
          height: "1rem",
        }}
        placeholder="Write comment..."
      />
    </Box>
  );
};

export default RightDetailedTask;
