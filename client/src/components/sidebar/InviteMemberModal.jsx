import {
  Box,
  Button,
  InputBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import React from "react";

const InviteMemberModal = ({
  openInviteMemberModal,
  setOpenInviteMemberModal,
}) => {
  const handleCloseInviteMemberModal = () =>
    setOpenInviteMemberModal({ open: false, spaceId: null });
  return (
    <Modal
      open={openInviteMemberModal.open}
      onClose={handleCloseInviteMemberModal}
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
        <Typography variant="h6">Share this space</Typography>
        <ClearIcon
          onClick={handleCloseInviteMemberModal}
          sx={{
            top: "-1.7rem",
            position: "relative",
            left: "24rem",
            color: "gray.fontMDark",
            "&:hover": { color: "black" },
          }}
        />
        <Stack
          mb="0.5rem"
          direction="row"
          alignItems="center"
          justifyContent="center"
        >
          <InputBase
            sx={{
              backgroundColor: "#f0f1f3",
              paddingX: "0.5rem",
              paddingY: "0.24rem",
              fontSize: "0.8rem",
            }}
            type="email"
            placeholder="Invite by email"
            autoFocus={true}
            fullWidth={true}
          />
          <Button
            onClick={"handleCreateSpace"}
            variant="contained"
            sx={{
              boxShadow: "none",
              textTransform: "initial",
              fontSize: "0.8rem",
              borderRadius: "0px 4px 4px 0px",
            }}
          >
            Invite
          </Button>
        </Stack>
        <Typography
          variant="caption"
          color="gray.fontMDark"
          fontWeight="600"
          sx={{ marginY: "10rem" }}
        >
          SHARE WITH
        </Typography>
      </Box>
    </Modal>
  );
};

export default InviteMemberModal;
