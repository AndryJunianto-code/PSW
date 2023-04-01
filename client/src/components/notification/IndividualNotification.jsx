import React from "react";
import { Box, styled, Stack, Typography, Button } from "@mui/material";
import { acceptInvitation } from "../../request/spaceRequest";
import { useMutation, useQueryClient } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
import dayjs from "dayjs";
const NotifBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: "1rem 0.5rem",
  borderRadius: "6px",
  marginBottom: "1rem",
}));
const IndividualNotification = ({ notification }) => {
  const { senderName, spaceTitle, spaceId, createdAt, message, clicked } =
    notification;
  const { user } = useAuth0();
  const queryClient = useQueryClient();
  const notificationDate =
    dayjs(createdAt).format("MMM D") +
    " at " +
    dayjs(createdAt).format("h:mm A");
  const { mutate: mutateAccept } = useMutation(acceptInvitation, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllSpaces"] });
      queryClient.invalidateQueries({ queryKey: ["getNotification"] });
    },
  });

  const handleAcceptInvitation = () => {
    mutateAccept({
      spaceId,
      username: user?.name,
      picture: user?.picture,
      userId: user?.sub,
      email: user?.email,
    });
  };
  return (
    <NotifBox sx={{ width: { xs: "80vw", lg: "40vw" } }}>
      <Stack>
        <Typography
          variant="caption"
          sx={{
            width: "30%",
            maxWidth: "100%",
            border: "1px solid #fafbfc",
            backgroundColor: "#0034e3",
            color: "white",
            borderRadius: "4px",
            padding: "0.1rem 0.5rem",
          }}
        >
          {spaceTitle}
        </Typography>
        <Typography mt="0.4rem" fontWeight="600" fontSize="1rem" pl="0.5rem">
          {senderName}{" "}
          {message === "invite" ? " added you to " : " removed you from "}
          <u>{spaceTitle}</u>
        </Typography>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Box>
          {message === "invite" && !clicked && (
            <>
              <Button>Delete</Button>
              <Button onClick={handleAcceptInvitation}>Accept</Button>
            </>
          )}
          {clicked === true && <Button color="success">Accepted</Button>}
        </Box>
        <Typography variant="caption" mr="2rem" color="gray.fontMDark">
          {notificationDate}
        </Typography>
      </Stack>
    </NotifBox>
  );
};

export default IndividualNotification;
