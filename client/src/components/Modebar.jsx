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
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { useDataContext } from "../context/Context";

const Modebar = () => {
  const { toggleDrawer, viewMode, setViewMode } = useDataContext();
  const handleChangeViewMode = (e, newValue) => {
    setViewMode(newValue);
  };

  return (
    <Box borderBottom={"1px solid #f0f0f0"} pl="0.8rem">
      <Stack direction="row" alignItems="center">
        <KeyboardDoubleArrowRightOutlinedIcon
          onClick={toggleDrawer(true)}
          onKeyDown={toggleDrawer(true)}
          sx={{
            color: "primary.main",
            mr: "1rem",
            display: { xs: "flex", lg: "none" },
          }}
        />
        <Typography variant="body1" fontWeight="600">
          Space
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
    </Box>
  );
};

export default Modebar;
