import axios from "axios";

//invite member
export const inviteMember = async (obj) => {
  const { data } = await axios.post("/notifications/inviteMember", {
    senderEmail: obj.senderEmail,
    receiverEmail: obj.receiverEmail,
    senderName: obj.senderName,
    senderImage: obj.senderImage,
    spaceTitle: obj.spaceTitle,
    spaceId: obj.spaceId,
  });
  return data;
};

//get notification
export const fetchNotification = async (obj) => {
  const { data } = await axios.get(`/notifications/getAll/${obj.queryKey[1]}`);
  return data;
};
