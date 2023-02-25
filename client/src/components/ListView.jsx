import { Box, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";

const ListView = () => {
  return (
    <Box
      backgroundColor="gray.bgLight"
      mt="5.2rem"
      mx="0.8rem"
      borderRadius={"4px"}
      height="100vh"
      border="0.5px solid #f0f0f0"
      pl="0.8rem"
      pt="0.4rem"
    >
      <Typography fontWeight="700">Work</Typography>
      <Box mt="1.6rem">
        <Stack direction="row" alignItems={"center"}>
          <ArrowDropDownCircleOutlinedIcon
            sx={{ width: "1.1rem", color: "primary.main" }}
          />
          <Typography
            variant="caption"
            ml="0.4rem"
            mr="1.2rem"
            sx={{
              backgroundColor: "primary.main",
              borderRadius: "4px",
              paddingX: "0.4rem",
              paddingY: "0.1rem",
              color: "white",
            }}
          >
            Todo
          </Typography>
          <Typography
            variant="caption"
            color="gray.fontMDark"
            fontWeight={"600"}
          >
            12 TASKS
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
};

export default ListView;
