import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Button, Stack, Typography } from "@mui/material";
import React from "react";
import { useMutation, useQueryClient } from "react-query";
import { removePeople } from "../../request/spaceRequest";
import { createNotification } from "../../request/notificationRequest";
import { useSocketContext } from "../../context/socketContext";

const IndividualInvitedMember = ({
  member,
  isAdmin,
  spaceId,
  spaceTitle,
  thisIsAdmin,
}) => {
  const { username, picture, userId, email } = member;
  const { user } = useAuth0();
  const { socket } = useSocketContext();
  const queryClient = useQueryClient();
  const { mutate: mutateRemoveNotif } = useMutation(createNotification, {
    onSuccess: (data) => {
      console.log(data);
    },
  });
  const { mutate: mutateRemove } = useMutation(removePeople, {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["fetchAllSpaces"] });
      socket.emit("removeActiveProject", userId);
      mutateRemoveNotif({
        senderEmail: user?.email,
        receiverEmail: email,
        senderName: user?.name,
        senderImage: user?.picture,
        spaceTitle,
        spaceId,
        message: "remove",
      });
    },
  });

  const handleRemoveMember = () => {
    mutateRemove({
      thisIsAdmin,
      spaceId,
      userId,
    });
  };
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      justifyContent={"space-between"}
      mt="0.3rem"
    >
      <Stack direction="row" alignItems={"center"}>
        <Avatar alt={username} src={picture} sx={{ width: 24, height: 24 }} />
        <Typography ml="1rem" variant="body2">
          {username} {userId === user?.sub ? " (me)" : ""}
        </Typography>
      </Stack>
      {isAdmin && userId !== user?.sub && (
        <Button
          color="error"
          variant="outlined"
          size="small"
          onClick={handleRemoveMember}
          sx={{ textTransform: "capitalize", fontSize: "0.7rem" }}
        >
          Remove
        </Button>
      )}
    </Stack>
  );
};

export default IndividualInvitedMember;
