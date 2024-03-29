import { Box, styled, Stack, Typography, Divider, Button } from "@mui/material";
import React from "react";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import { useDataContext } from "../../context/Context";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "react-query";
import { fetchNotification } from "../../request/notificationRequest";
import IndividualNotification from "./IndividualNotification";
import MobileSidebar from "../sidebar/MobileSidebar";
import Sidebar from "../sidebar/Sidebar";

const NotifBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: "1rem 0.5rem",
  borderRadius: "6px",
  marginBottom: "1rem",
}));
const Notification = () => {
  const { toggleDrawer } = useDataContext();
  const { user } = useAuth0();
  const { data: notificatonData, isSuccess: notificationSuccess } = useQuery(
    ["getNotification", user?.email],
    fetchNotification,
    { retryDelay: 3000 }
  );

  return (
    <Box minHeight="100vh" height="100%" sx={{ overflowY: "hidden" }}>
      <Stack direction="row" justifyContent="space-between">
        <MobileSidebar />
        <Sidebar />
        <Box flex={12} minHeight="100vh">
          <Box position="fixed" width="100%" backgroundColor="white">
            <Stack
              direction="row"
              borderBottom={"1px solid #f0f0f0"}
              pl="0.8rem"
              py="0.8rem"
              position="fixed"
              alignItems="center"
            >
              <KeyboardDoubleArrowRightOutlinedIcon
                onClick={toggleDrawer(true)}
                onKeyDown={toggleDrawer(true)}
                sx={{
                  color: "primary.main",
                  mr: "0.7rem",
                  display: { xs: "flex", lg: "none" },
                }}
              />
              <Typography
                variant="body1"
                fontWeight="600"
                fontSize="1rem"
                pl="0.5rem"
              >
                Notification
              </Typography>
            </Stack>
            <Stack
              backgroundColor="#f0f0f0"
              mt="3.2rem"
              height="100vh"
              pt="1rem"
              display="flex"
              alignItems="center"
              flex-direction="column"
              sx={{ width: { xs: "100%", lg: "90%" } }}
            >
              {notificationSuccess &&
                notificatonData.map((notif) => (
                  <IndividualNotification
                    key={notif._id}
                    notification={notif}
                  />
                ))}

              <NotifBox sx={{ width: { xs: "80vw", lg: "40vw" } }}>
                <Stack>
                  <Typography
                    variant="caption"
                    sx={{
                      width: "30%",
                      maxWidth: "100%",
                      border: "1px solid #fafbfc",
                      backgroundColor: "#fd7fa9",
                      color: "white",
                      borderRadius: "4px",
                      padding: "0.1rem 0.5rem",
                    }}
                  >
                    Life ^ work
                  </Typography>
                  <Typography
                    mt="0.4rem"
                    fontWeight="600"
                    fontSize="1rem"
                    pl="0.5rem"
                  >
                    {" "}
                    Searching for talents
                  </Typography>
                </Stack>
                <Divider sx={{ my: "0.6rem" }} />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center">
                    <Button
                      variant="outlined"
                      sx={{
                        border: "1px solid red",
                        fontSize: "0.6rem",
                        borderRadius: "20px",
                        padding: "0.1rem",
                        mr: "1rem",
                        color: "red",
                      }}
                    >
                      Overdue
                    </Button>
                    <Typography variant="caption" sx={{ color: "red" }}>
                      Feb 19
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="gray.fontMDark">
                    Feb 22 at 12.14 am
                  </Typography>
                </Stack>
              </NotifBox>
              <NotifBox sx={{ width: { xs: "80vw", lg: "40vw" } }}>
                <Stack>
                  <Typography
                    variant="caption"
                    sx={{
                      width: "30%",
                      maxWidth: "100%",
                      border: "1px solid #fafbfc",
                      backgroundColor: "#fd7fa9",
                      color: "white",
                      borderRadius: "4px",
                      padding: "0.1rem 0.5rem",
                    }}
                  >
                    Life ^ work
                  </Typography>
                  <Typography
                    mt="0.4rem"
                    fontWeight="600"
                    fontSize="1rem"
                    pl="0.5rem"
                  >
                    {" "}
                    Finish UI/UX Design
                  </Typography>
                </Stack>
                <Divider sx={{ my: "0.6rem" }} />
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Stack direction="row" alignItems="center">
                    <Button
                      variant="outlined"
                      sx={{
                        border: "1px solid primary.main",
                        fontSize: "0.6rem",
                        borderRadius: "20px",
                        padding: "0.1rem",
                        mr: "1rem",
                        color: "primary.main",
                      }}
                    >
                      Pending
                    </Button>
                    <Typography
                      variant="caption"
                      sx={{ color: "primary.main" }}
                    >
                      Feb 21
                    </Typography>
                  </Stack>
                  <Typography variant="caption" color="gray.fontMDark">
                    Feb 22 at 12.14 am
                  </Typography>
                </Stack>
              </NotifBox>
            </Stack>
          </Box>
        </Box>
      </Stack>
    </Box>
  );
};

export default Notification;
