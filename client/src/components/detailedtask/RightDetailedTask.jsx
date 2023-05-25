import { Box, Divider, InputBase, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import dayjs from "dayjs";
import { useDataContext } from "../../context/Context";
import { createComment } from "../../request/listRequest";
import { v4 } from "uuid";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import { useSocketContext } from "../../context/socketContext";
import IndividualComment from "./IndividualComment";

const RightDetailedTask = ({ mobileTaskSection }) => {
  const { user } = useAuth0();
  const { detailedTaskSelected } = useDataContext();
  const { socket } = useSocketContext();
  const [commentInput, setCommentInput] = useState("");

  const createdAtDate = dayjs.unix(detailedTaskSelected.createdAt);
  const isToday =
    new Date(detailedTaskSelected.dueDate).toDateString() ===
    new Date().toDateString();

  const shortDateColor = () => {
    const today = new Date().getTime();
    const dueDate = new Date(detailedTaskSelected.dueDate).getTime();
    if (isToday) return "#faa98b";
    return dueDate > today ? "black" : "red";
  };

  const { mutate: mutateNewComment } = useMutation(createComment, {
    onSuccess: (data) => {
      socket.emit("changeTask", {
        listData: data,
        taskId: detailedTaskSelected.taskId,
      });
    },
  });

  const handleCommentInput = (e) => setCommentInput(e.target.value);
  const handleCreateComment = (e) => {
    if (e.keyCode === 13) {
      setCommentInput("");
      mutateNewComment({
        listId: detailedTaskSelected.listId,
        taskId: detailedTaskSelected.taskId,
        commentId: v4(),
        commentDate: Date.now(),
        comment: commentInput,
        userImage: user?.picture,
        userId: user?.sub,
        username: user?.name,
      });
    }
  };
  return (
    <Box
      flex={2}
      width="100%"
      overflow="hidden"
      sx={{
        display: {
          xs: mobileTaskSection === "Activity" ? "block" : "none",
          lg: "block",
        },
      }}
    >
      <Stack
        px="2rem"
        pt="1.5rem"
        pb="1.45rem"
        direction="row"
        alignItems="center"
      >
        <Box>
          <Typography fontSize="0.7rem" color="gray.fontMDark">
            CREATED
          </Typography>
          <Typography fontSize="0.6rem">
            {createdAtDate.format("MMM D")},{"    "}
            {createdAtDate.format("h")}:{createdAtDate.format("mm a")}
          </Typography>
        </Box>
        {!detailedTaskSelected.dueDate ? (
          ""
        ) : (
          <>
            <Divider
              sx={{ mx: "1rem" }}
              orientation="vertical"
              flexItem
              variant="middle"
            />
            <Box>
              <Typography fontSize="0.7rem" color="gray.fontMDark">
                DUE DATE
              </Typography>
              <Typography fontSize="0.6rem" color={shortDateColor}>
                {detailedTaskSelected.dueDate}
              </Typography>
            </Box>
          </>
        )}
      </Stack>
      <Divider />
      <Box
        px="2rem"
        pt="1rem"
        sx={{ backgroundColor: "#fbfbfb", overflowY: "auto" }}
        height="29rem"
        maxHeight={"29rem"}
      >
        {detailedTaskSelected.taskComments?.map((comment) => (
          <IndividualComment key={comment.id} c={comment} />
        ))}
      </Box>
      <InputBase
        onChange={handleCommentInput}
        onKeyDown={handleCreateComment}
        value={commentInput}
        sx={{
          padding: "1rem",
          fontSize: "0.8rem",
          boxShadow: "2",
          width: "100%",
          zIndex: 1050,
          backgroundColor: "white",
          borderRadius: "0px 0px 4px 0px",
          height: "1rem",
        }}
        placeholder="Write comment..."
      />
    </Box>
  );
};

export default RightDetailedTask;
