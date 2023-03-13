import axios from "axios";

// create list
export const createList = async (obj) => {
  const { data } = await axios.post("/lists", {
    listTitle: obj.listTitle,
    projectId: obj.projectId,
  });
  return data;
};
