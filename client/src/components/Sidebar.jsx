import {
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  List,
  Divider,
  Button,
  Avatar,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import React from "react";
import KeyboardDoubleArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";

const Sidebar = () => {
  return (
    <Box
      flex={2}
      width="100%"
      minHeight="100vh"
      borderRight={"1px solid #f0f0f0"}
      sx={{
        display: { xs: "none", lg: "flex" },
      }}
    >
      <Box position="fixed" top="0.4rem" width="14.2857%">
        <Box px="0.7rem">
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography>Logo</Typography>
            <IconButton>
              <KeyboardDoubleArrowLeftOutlinedIcon color="primary" />
            </IconButton>
          </Stack>
          <List>
            <ListItem disablePadding>
              <ListItemButton disableGutters>
                <ListItemIcon>
                  <HomeOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" marginLeft={"-1rem"}>
                      Home
                    </Typography>
                  }
                ></ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding sx={{ marginTop: "-0.5rem" }}>
              <ListItemButton disableGutters>
                <ListItemIcon>
                  <NotificationsOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography variant="body2" marginLeft={"-1rem"}>
                      Notifications
                    </Typography>
                  }
                ></ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
        <Divider />
        <Accordion disableGutters elevation={0} square defaultExpanded={true}>
          <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
            <Typography variant="body2" sx={{ fontWeight: "bold" }}>
              SPACES
            </Typography>
          </AccordionSummary>

          <AccordionDetails>
            <Button
              variant="contained"
              sx={{ width: "100%", fontSize: "0.7rem" }}
            >
              + NEW SPACE
            </Button>
            <Box mt="0.7rem">
              <Accordion disableGutters elevation={0} square>
                <AccordionSummary expandIcon={<ExpandMoreOutlinedIcon />}>
                  <Stack direction="row" alignItems="center">
                    <Box
                      width="1.5rem"
                      height="1.5rem"
                      borderRadius="4px"
                      mr="1rem"
                      sx={{ backgroundColor: "pink", textAlign: "center" }}
                    >
                      L
                    </Box>
                    <Typography variant="body2">Life</Typography>
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
            </Box>
          </AccordionDetails>
        </Accordion>
      </Box>
    </Box>
  );
};

export default Sidebar;
