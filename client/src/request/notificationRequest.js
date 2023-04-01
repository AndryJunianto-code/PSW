import axios from "axios";

//invite member
export const createNotification = async (obj) => {
  const { data } = await axios.post("/notifications", {
    senderEmail: obj.senderEmail,
    receiverEmail: obj.receiverEmail,
    senderName: obj.senderName,
    senderImage: obj.senderImage,
    spaceTitle: obj.spaceTitle,
    spaceId: obj.spaceId,
    message: obj.message,
  });
  return data;
};

//get notification
export const fetchNotification = async (obj) => {
  const { data } = await axios.get(`/notifications/getAll/${obj.queryKey[1]}`);
  return data;
};
