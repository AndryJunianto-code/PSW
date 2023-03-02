import { Avatar, Box, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import { useAuth0 } from "@auth0/auth0-react";
const SidebarBottom = () => {
  const { user } = useAuth0();
  return (
    <Box position="fixed" width="14.2747%" sx={{ bottom: 7 }}>
      <Divider />
      <Stack direction="row" alignItems="center" px="1rem" pt="0.4rem">
        <Avatar
          sx={{
            bgcolor: "primary.main",
            width: "24px",
            height: "24px",
            p: "0.2rem",
            mr: "0.2rem",
          }}
        >
          {user?.name}
        </Avatar>
        <ArrowDropDownOutlinedIcon sx={{ width: "15px" }} />
      </Stack>
    </Box>
  );
};

export default SidebarBottom;
