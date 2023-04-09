import axios from "axios";

// create list
export const createList = async (obj) => {
  const { data } = await axios.post("/lists", {
    listTitle: obj.listTitle,
    listColor: obj.listColor,
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

//change task position within list
export const changeTaskPositionWithinList = async (obj) => {
  const { data } = await axios.put("/lists/changeTaskPositionWithinList", {
    listId: obj.listId,
    newTasks: obj.newTasks,
  });
  return data;
};

//modify list
export const modifyList = async (obj) => {
  const { data } = await axios.put("/lists/modifyList", {
    listId: obj.listId,
    newListTitle: obj.newListTitle,
    newListColor: obj.newListColor,
  });
  return data;
};

//changetask due date
export const changeDueDate = async (obj) => {
  const { data } = await axios.put("/lists/dueDate", {
    listId: obj.listId,
    taskId: obj.taskId,
    dueDate: obj.dueDate,
  });
  return data;
};
