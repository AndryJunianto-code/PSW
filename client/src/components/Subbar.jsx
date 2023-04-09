import { Box, Divider, InputBase, Stack, Typography } from "@mui/material";
import React from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Subbar = () => {
  return (
    <Box borderBottom={"1px solid #f0f0f0"} pl="0.8rem" py="0.2rem">
      <Stack direction="row" alignItems="center" width="11.3rem">
        <SearchOutlinedIcon
          sx={{
            width: "15px",
            height: "15px",
            color: "#616161",
            marginRight: "0.2rem",
          }}
        />
        <InputBase placeholder="Search tasks..." sx={{ fontSize: "0.7rem" }} />
        <Divider sx={{ marginX: "0.6rem" }} orientation="vertical" flexItem />
      </Stack>
    </Box>
  );
};

export default Subbar;
