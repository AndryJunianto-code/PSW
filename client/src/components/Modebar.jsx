import {
  Box,
  Button,
  Divider,
  Icon,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import FormatListBulletedOutlinedIcon from "@mui/icons-material/FormatListBulletedOutlined";
import GridViewOutlinedIcon from "@mui/icons-material/GridViewOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

const Modebar = ({ viewMode, setViewMode }) => {
  const handleChangeViewMode = (e, newValue) => {
    setViewMode(newValue);
  };
  return (
    <Box borderBottom={"1px solid #f0f0f0"} pl="0.8rem">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent={"space-between"}
      >
        <Stack direction="row" alignItems="center">
          <Typography variant="body1" fontWeight="600">
            Work
          </Typography>
          <Divider
            sx={{ marginX: "0.8rem" }}
            variant="middle"
            orientation="vertical"
            flexItem
          />
          <Tabs
            value={viewMode}
            onChange={handleChangeViewMode}
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              value="List"
              label={
                <Stack direction="row" alignItems="center">
                  <FormatListBulletedOutlinedIcon
                    sx={{
                      width: "1.1rem",
                      height: "1.1rem",
                      marginRight: "0.3rem",
                    }}
                  />
                  <Typography variant="caption">List</Typography>
                </Stack>
              }
            />
            <Divider
              sx={{ marginX: "0.8rem" }}
              variant="middle"
              orientation="vertical"
              flexItem
            />
            <Tab
              value="Board"
              label={
                <Stack direction="row" alignItems="center">
                  <GridViewOutlinedIcon
                    sx={{
                      width: "1.1rem",
                      height: "1.1rem",
                      marginRight: "0.3rem",
                    }}
                  />
                  <Typography variant="caption">Board</Typography>
                </Stack>
              }
            />
            <Divider
              sx={{ marginX: "0.8rem" }}
              variant="middle"
              orientation="vertical"
              flexItem
            />
            <Tab
              value="Calendar"
              label={
                <Stack direction="row" alignItems="center">
                  <CalendarTodayOutlinedIcon
                    sx={{
                      width: "1rem",
                      height: "1rem",
                      marginRight: "0.3rem",
                    }}
                  />
                  <Typography variant="caption">Calendar</Typography>
                </Stack>
              }
            />
            <Divider
              sx={{ marginX: "0.8rem" }}
              variant="middle"
              orientation="vertical"
              flexItem
            />
            <Tab
              value="Notes"
              label={
                <Stack direction="row" alignItems="center">
                  <DescriptionOutlinedIcon
                    sx={{
                      width: "1.1rem",
                      height: "1.1rem",
                      marginRight: "0.3rem",
                    }}
                  />
                  <Typography variant="caption">Notes</Typography>
                </Stack>
              }
            />
          </Tabs>
        </Stack>

        {/* RIGHT SIDE */}
        <Button>
          <ShareOutlinedIcon />
          <Typography>Share</Typography>
        </Button>
      </Stack>
    </Box>
  );
};

export default Modebar;
