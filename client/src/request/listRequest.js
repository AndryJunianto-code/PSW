import axios from "axios";

// create list
export const createList = async (obj) => {
  const { data } = await axios.post("/lists", {
    listTitle: obj.listTitle,
    projectId: obj.projectId,
  });
  return data;
};

//get all list in one project
export const fetchAllListsInProject = async (obj) => {
  const { data } = await axios.get(
    `/lists/getListInProject/${obj.queryKey[1]}`
  );
  return data;
};

//create new task
export const createTask = async (obj) => {
  const { data } = await axios.put(`/lists/addNewTask`, {
    taskId: obj.taskId,
    taskTitle: obj.taskTitle,
    listId: obj.listId,
  });
  return data;
};
