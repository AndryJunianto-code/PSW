import axios from "axios";

//create space
export const createSpace = async (obj) => {
  const { data } = await axios.post("/spaces", {
    spaceTitle: obj.spaceTitle,
    spaceColor: obj.spaceColor,
    adminsId: obj.adminsId,
  });
  return data;
};

//get all space belong to user
export const fetchAllSpaces = async (obj) => {
  const { data } = await axios.get(`/spaces/getAll/${obj.queryKey[1]}`);
  return data;
};
