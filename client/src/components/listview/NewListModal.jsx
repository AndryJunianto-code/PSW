import React, { useState } from "react";
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
import { v4 as uuidv4 } from "uuid";
import { logoColor } from "../../utils/logoColor";
import DoneIcon from "@mui/icons-material/Done";

const NewListModal = ({}) => {
  const [listColor, setListColor] = useState("#40bc86");
  const [listTitle, setListTitle] = useState("");

  const handleListTitle = (e) => {
    setListTitle(e.target.value);
  };
  return (
    <Modal
      open={true}
      onClose={""}
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
          Create new list
        </Typography>
        <ClearIcon
          onClick={""}
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
            onChange={""}
            value={""}
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
              backgroundColor={listColor}
              borderRadius="8px"
              mr="2rem"
            ></Box>
            <Grid container item>
              {logoColor.map((c, index) => (
                <Grid item xs={1.5} key={index}>
                  <Box
                    onClick={() => setListColor(c)}
                    backgroundColor={c}
                    width="0.8rem"
                    height="0.8rem"
                    borderRadius="3px"
                    alignItems="center"
                    justifyContent="center"
                    display="flex"
                  >
                    {listColor === c && (
                      <DoneIcon sx={{ fontSize: "0.8rem", color: "white" }} />
                    )}
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Stack>
        </Stack>
        <Button
          onClick={""}
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
      </Box>
    </Modal>
  );
};

export default NewListModal;
