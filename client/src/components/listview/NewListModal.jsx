import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Modal,
  InputBase,
  Stack,
  Button,
  Grid,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { logoColor } from "../../utils/logoColor";
import DoneIcon from "@mui/icons-material/Done";
import { useDataContext } from "../../context/Context";
import { useMutation, useQueryClient } from "react-query";
import { createList, modifyList } from "../../request/listRequest";
import { useSocketContext } from "../../context/socketContext";
import { useListContext } from "../../context/listContext";

const NewListModal = () => {
  const { activeProject } = useDataContext();
  const { socket } = useSocketContext();
  const { setAllList, listModalDispatch, listModalState } = useListContext();
  const queryClient = useQueryClient();

  const { mutate: mutateList } = useMutation(createList, {
    onSuccess: (data) => {
      handleCloseNewListModal();
      queryClient.invalidateQueries({ queryKey: "getAllListsInProject" });
      socket.emit("createNewList", data);
    },
  });

  const { mutate: mutateModifyList } = useMutation(modifyList, {
    onSuccess: (data) => {
      handleCloseNewListModal();
      queryClient.invalidateQueries({ queryKey: "getAllListsInProject" });
    },
  });

  const handleListTitle = (e) => {
    listModalDispatch({ type: "handleListTitle", listTitle: e.target.value });
  };

  const handleCloseNewListModal = () => {
    listModalDispatch({ type: "closeListModal" });
  };

  const handleCreateNewList = () =>
    mutateList({
      listTitle: listModalState.listTitle,
      listColor: listModalState.listColor,
      projectId: activeProject?.projectId,
    });

  const handleModifyList = () => {
    mutateModifyList({
      listId: listModalState.listId,
      newListTitle: listModalState.listTitle,
      newListColor: listModalState.listColor,
    });
  };

  useEffect(() => {
    socket.on("createNewList", (data) => {
      setAllList((list) => [...list, data]);
    });
    return () => socket.off("createNewList");
  }, [socket]);

  return (
    <Modal
      open={listModalState.open}
      onClose={handleCloseNewListModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "15rem",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: { xs: "300px", md: "400px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "4px",
          p: 4,
          outline: "none",
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          {listModalState.updateMode ? "Modify list" : "Create new list"}
        </Typography>
        <ClearIcon
          onClick={handleCloseNewListModal}
          sx={{
            top: "-1.7rem",
            position: "relative",
            left: "24rem",
            color: "gray.fontMDark",
            "&:hover": { color: "black" },
          }}
        />
        <Stack>
          <Typography sx={{ mt: 2 }} variant="caption">
            List name
          </Typography>
          <InputBase
            onChange={handleListTitle}
            value={listModalState.listTitle}
            placeholder="Enter List name"
            required
            sx={{ borderBottom: "1px solid #e4e4e4" }}
          />
        </Stack>
        <Stack>
          <Typography variant="caption" mt="1rem" mb="0.7rem">
            List color
          </Typography>
          <Stack direction="row" alignItems="center">
            <Box
              width="5rem"
              height="4rem"
              backgroundColor={listModalState.listColor}
              borderRadius="8px"
              mr="2rem"
            ></Box>
            <Grid container item>
              {logoColor.map((c, index) => (
                <Grid item xs={1.5} key={index}>
                  <Box
                    onClick={() =>
                      listModalDispatch({
                        type: "handleListColor",
                        listColor: c,
                      })
                    }
                    backgroundColor={c}
                    width="0.8rem"
                    height="0.8rem"
                    borderRadius="3px"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                  >
                    {listModalState.listColor === c && (
                      <DoneIcon sx={{ fontSize: "0.8rem", color: "white" }} />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
        {!listModalState.updateMode ? (
          <Button
            onClick={handleCreateNewList}
            variant="contained"
            sx={{
              marginTop: "2rem",
              textTransform: "initial",
              fontSize: "1rem",
            }}
            fullWidth
          >
            Create
          </Button>
        ) : (
          <Button
            onClick={handleModifyList}
            variant="contained"
            sx={{
              marginTop: "2rem",
              textTransform: "initial",
              fontSize: "1rem",
            }}
            fullWidth
          >
            Save
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default NewListModal;
