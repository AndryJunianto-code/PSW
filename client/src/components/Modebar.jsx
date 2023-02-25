import { Box, Divider, Icon, Stack, Typography } from "@mui/material";
import React from "react";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

const Modebar = () => {
  return (
    <Box borderBottom={"1px solid #f0f0f0"} pb="0.6rem" pl="0.8rem">
      <Stack pt="0.5rem" direction="row" alignItems="center">
        <Typography variant="body1" fontWeight="600">
          Work
        </Typography>
        <Divider sx={{ marginX: "1rem" }} orientation="vertical" flexItem />
        <Stack direction="row" alignItems="center">
          <FormatListBulletedOutlinedIcon
            sx={{ width: "1.2rem", height: "1.2rem", marginRight: "0.3rem" }}
          />
          <Typography variant="body2">List</Typography>
        </Stack>
        <Divider sx={{ marginX: "1rem" }} orientation="vertical" flexItem />
        <Stack direction="row" alignItems="center">
          <GridViewOutlinedIcon
            sx={{ width: "1.2rem", height: "1.2rem", marginRight: "0.3rem" }}
          />
          <Typography variant="body2">Board</Typography>
        </Stack>
        <Divider sx={{ marginX: "1rem" }} orientation="vertical" flexItem />
        <Stack direction="row" alignItems="center">
          <CalendarTodayOutlinedIcon
            sx={{ width: "1rem", height: "1rem", marginRight: "0.3rem" }}
          />
          <Typography variant="body2">Calendar</Typography>
        </Stack>
        <Divider sx={{ marginX: "1rem" }} orientation="vertical" flexItem />
        <Stack direction="row" alignItems="center">
          <DescriptionOutlinedIcon
            sx={{ width: "1rem", height: "1rem", marginRight: "0.3rem" }}
          />
          <Typography variant="body2">Notes</Typography>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Modebar;
