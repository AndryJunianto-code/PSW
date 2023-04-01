import axios from "axios";

//create space
export const createSpace = async (obj) => {
  const { data } = await axios.post("/spaces", {
    spaceTitle: obj.spaceTitle,
    spaceColor: obj.spaceColor,
    admins: [
      {
        username: obj.username,
        picture: obj.picture,
        userId: obj.userId,
        email: obj.email,
      },
    ],
  });
  return data;
};

//get all space belong to user
export const fetchAllSpaces = async (obj) => {
  const { data } = await axios.get(`/spaces/getAll/${obj.queryKey[1]}`);
  return data;
};

//add project
export const createProject = async (obj) => {
  const { data } = await axios.put("/spaces/addProject", {
    projectId: obj.projectId,
    projectTitle: obj.projectTitle,
    spaceId: obj.spaceId,
  });
  return data;
};

//accept invite member
export const acceptInvitation = async (obj) => {
  const { data } = await axios.put("/spaces/acceptInvitation", {
    spaceId: obj.spaceId,
    username: obj.username,
    picture: obj.picture,
    userId: obj.userId,
    email: obj.email,
  });
  return data;
};

//remove member & admin
export const removePeople = async (obj) => {
  const { data } = await axios.put("/spaces/removePeople", {
    spaceId: obj.spaceId,
    userId: obj.userId,
    thisIsAdmin: obj.thisIsAdmin,
  });
  return data;
};
