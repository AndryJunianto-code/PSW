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
import { logoColor } from "../../utils/logoColor";

const NewSpaceModal = ({
  handleCloseNewSpaceModal,
  openNewSpaceModal,
  refetchSpaces,
}) => {
  const { user } = useAuth0();
  const [spaceColor, setSpaceColor] = useState("#40bc86");
  const [spaceTitle, setSpaceTitle] = useState("");
  const handleSpaceTitle = (e) => {
    setSpaceTitle(e.target.value);
  };
  const { mutate: mutateSpace } = useMutation(createSpace, {
    onSuccess: (data) => {
      handleCloseNewSpaceModal();
      setSpaceTitle("");
      setSpaceColor("#40bc86");
      refetchSpaces();
    },
  });

  const handleCreateSpace = () => {
    mutateSpace({
      spaceTitle,
      spaceColor,
      username: user?.name,
      picture: user?.picture,
      userId: user?.sub,
      email: user?.email,
    });
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
          width: { xs: "250px", md: "400px" },
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "4px",
          p: 4,
          outline: "none",
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
            inputProps={{ maxLength: 15 }}
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
              {logoColor.map((c, index) => (
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
          fullWidth={true}
        >
          Create Space
        </Button>
      </Box>
    </Modal>
  );
};

export default NewSpaceModal;
