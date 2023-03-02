import React, { useState } from "react";
import {
  Box,
  Typography,
  Modal,
  InputBase,
  Stack,
  Grid,
  Button,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import { createSpace } from "../../request/spaceRequest";
import { useMutation } from "react-query";
import { useAuth0 } from "@auth0/auth0-react";

const color = [
  "#40bc86",
  "#f31d2f",
  "#fcb410",
  "#2980b9",
  "#7b68ee",
  "#bf4acc",
  "#074354",
];
const NewSpaceModal = ({ handleCloseNewSpaceModal, openNewSpaceModal }) => {
  const { user } = useAuth0();
  const [spaceColor, setSpaceColor] = useState("#40bc86");
  const [spaceTitle, setSpaceTitle] = useState("");
  const handleSpaceTitle = (e) => {
    setSpaceTitle(e.target.value);
  };

  const { mutate: mutateSpace } = useMutation(createSpace, {
    onSuccess: (data) => {
      console.log(data);
      handleCloseNewSpaceModal();
    },
  });

  const handleCreateSpace = () => {
    mutateSpace({ spaceTitle, spaceColor, adminsId: [user?.sub] });
  };
  return (
    <Modal
      open={openNewSpaceModal}
      onClose={handleCloseNewSpaceModal}
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
        }}
      >
        <Typography variant="h5" component="h1" textAlign="center">
          Create new space
        </Typography>
        <ClearIcon
          onClick={handleCloseNewSpaceModal}
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
            Space name
          </Typography>
          <InputBase
            onChange={handleSpaceTitle}
            value={spaceTitle}
            placeholder="Enter Space name"
            required
            sx={{ borderBottom: "1px solid #e4e4e4" }}
          />
        </Stack>
        <Stack>
          <Typography variant="caption" mt="1rem" mb="0.7rem">
            Space color
          </Typography>
          <Stack direction="row" alignItems="center">
            <Box
              width="5rem"
              height="4rem"
              backgroundColor={spaceColor}
              borderRadius="8px"
              mr="2rem"
            ></Box>
            <Grid container item>
              {color.map((c, index) => (
                <Grid item xs={1.5} key={index}>
                  <Box
                    onClick={() => setSpaceColor(c)}
                    backgroundColor={c}
                    width="0.8rem"
                    height="0.8rem"
                    borderRadius="3px"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                  >
                    {spaceColor === c && (
                      <DoneIcon sx={{ fontSize: "0.8rem", color: "white" }} />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
        <Button
          onClick={handleCreateSpace}
          variant="contained"
          sx={{
            marginTop: "2rem",
            textTransform: "initial",
            fontSize: "1rem",
          }}
          fullWidth
        >
          Create Space
        </Button>
      </Box>
    </Modal>
  );
};

export default NewSpaceModal;
