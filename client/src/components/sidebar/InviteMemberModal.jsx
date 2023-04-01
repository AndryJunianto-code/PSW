import {
  Avatar,
  Box,
  Button,
  InputBase,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { useEffect, useState } from "react";
import { createNotification } from "../../request/notificationRequest";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation } from "react-query";
import IndividualInvitedMember from "../individual/IndividualInvitedMember";

const InviteMemberModal = ({
  openInviteMemberModal,
  setOpenInviteMemberModal,
  activeSpace,
}) => {
  const { user } = useAuth0();
  const [inputUserEmail, setInputUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const { mutate: mutateMember } = useMutation(createNotification, {
    onSuccess: (data) => {
      handleCloseInviteMemberModal();
    },
  });
  const handleInviteMember = () => {
    mutateMember({
      senderEmail: user?.email,
      receiverEmail: inputUserEmail,
      senderName: user?.name,
      senderImage: user?.picture,
      spaceTitle: activeSpace.spaceTitle,
      spaceId: activeSpace._id,
      message: "invite",
    });
  };
  const handleInputUserEmail = (e) => setInputUserEmail(e.target.value);
  const handleCloseInviteMemberModal = () => {
    setOpenInviteMemberModal({ open: false, spaceId: null });
    setInputUserEmail("");
  };
  useEffect(() => {
    const adminExist = activeSpace.admins.filter(
      (admin) => admin.userId === user?.sub
    );
    if (adminExist.length > 0) setIsAdmin(true);
  }, [activeSpace]);
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
            value={inputUserEmail}
            onChange={handleInputUserEmail}
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
            onClick={handleInviteMember}
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
        {/* MEMBER SECTION */}
        <Typography variant="caption" color="gray.fontMDark" fontWeight="600">
          SHARE WITH
        </Typography>
        {activeSpace.admins.map((member) => (
          <IndividualInvitedMember
            key={member.userId}
            member={member}
            isAdmin={isAdmin}
            thisIsAdmin={true}
            spaceId={activeSpace._id}
            spaceTitle={activeSpace.spaceTitle}
          />
        ))}
        {activeSpace.members.map((member) => (
          <IndividualInvitedMember
            key={member.userId}
            member={member}
            isAdmin={isAdmin}
            thisIsAdmin={false}
            spaceId={activeSpace._id}
            spaceTitle={activeSpace.spaceTitle}
          />
        ))}
      </Box>
    </Modal>
  );
};

export default InviteMemberModal;
