import React from "react";
import { Box, styled, Stack, Typography, Button } from "@mui/material";
import { acceptInvitation } from "../../request/spaceRequest";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";
const NotifBox = styled(Box)(({ theme }) => ({
  backgroundColor: "white",
  padding: "1rem 0.5rem",
  borderRadius: "6px",
  marginBottom: "1rem",
}));
const IndividualNotification = ({ notification }) => {
  const { senderName, spaceTitle, spaceId } = notification;
  const { user } = useAuth0();
  const { mutate: mutateAccept } = useMutation(acceptInvitation, {
    onSuccess: (data) => {
      console.log(data);
    },
  });

  const handleAcceptInvitation = () => {
    mutateAccept({
      spaceId,
      memberId: user?.sub,
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
          {senderName} added you to <u>{spaceTitle}</u>
        </Typography>
      </Stack>
      <Stack direction="row">
        <Button>Delete</Button>
        <Button onClick={handleAcceptInvitation}>Accept</Button>
      </Stack>
    </NotifBox>
  );
};

export default IndividualNotification;
