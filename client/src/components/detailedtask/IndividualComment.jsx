import { Avatar, Box, Stack, Typography } from "@mui/material";
import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useAuth0 } from "@auth0/auth0-react";

const IndividualComment = ({ c }) => {
  const { comment, commentDate, userImage, username, userId } = c;
  const { user } = useAuth0();
  dayjs.extend(relativeTime);
  return (
    <Stack direction={"row"} mb="1rem">
      <Avatar alt="Image" src={userImage} sx={{ width: 28, height: 28 }} />
      <Box
        sx={{ backgroundColor: "white", overflowWrap: "break-word" }}
        marginLeft={"1rem"}
        px="1rem"
        py="0.5rem"
        border="1px solid #e9ebf0"
        borderRadius={"4px"}
        maxWidth={"80%"}
        width="100%"
      >
        <Stack direction="row" justifyContent={"space-between"} mb="1rem">
          {user?.sub === userId ? (
            <Typography
              fontSize={"0.75rem"}
              fontWeight="600"
              color="primary.main"
            >
              You
            </Typography>
          ) : (
            <Typography fontSize={"0.75rem"} fontWeight="600">
              {username}
            </Typography>
          )}
          <Typography fontSize={"0.75rem"}>
            {dayjs(commentDate).fromNow()}
          </Typography>
        </Stack>
        <Typography>{comment}</Typography>
      </Box>
    </Stack>
  );
};

export default IndividualComment;
