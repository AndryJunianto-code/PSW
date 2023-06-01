const router = require("express").Router();
const List = require("../models/List");

//create new list
router.post("/", async (req, res) => {
  const newList = new List(req.body);
  try {
    const savedList = await newList.save();
    res.status(200).json(savedList);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get all list in one project
router.get("/getListInProject/:projectId", async (req, res) => {
  try {
    const lists = await List.find({ projectId: req.params.projectId });
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

//create new task
router.put("/addNewTask", async (req, res) => {
  const { taskId, taskTitle, listId, createdAt, dueDate } = req.body;
  try {
    const newTask = {
      listId,
      taskId,
      taskTitle,
      createdAt,
      taskComments: [],
      dueDate,
    };
    const list = await List.findByIdAndUpdate(
      listId,
      {
        $push: {
          tasks: newTask,
        },
      },
      { new: true }
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(200).json(err);
  }
});

//change task position within list
router.put("/changeTaskPositionWithinList", async (req, res) => {
  const { listId, newTasks } = req.body;
  try {
    const list = await List.findByIdAndUpdate(
      listId,
      {
        $set: {
          tasks: newTasks,
        },
      },
      { new: true }
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

//modify list title and color
router.put("/modifyList", async (req, res) => {
  const { listId, newListTitle, newListColor } = req.body;
  try {
    const list = await List.findByIdAndUpdate(
      listId,
      {
        $set: {
          listTitle: newListTitle,
          listColor: newListColor,
        },
      },
      { new: true }
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

// change due date
router.put("/dueDate", async (req, res) => {
  const { listId, taskId, dueDate } = req.body;
  try {
    const query = { _id: listId };
    const updateDocs = {
      "tasks.$[task].dueDate": dueDate,
    };
    const options = {
      new: true,
      arrayFilters: [{ "task.taskId": taskId }],
    };
    const result = await List.findOneAndUpdate(query, updateDocs, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//change task title
router.put("/taskTitle", async (req, res) => {
  const { listId, taskId, taskTitle } = req.body;
  try {
    const query = { _id: listId };
    const updateDocs = {
      "tasks.$[task].taskTitle": taskTitle,
    };
    const options = {
      new: true,
      arrayFilters: [{ "task.taskId": taskId }],
    };
    const result = await List.findOneAndUpdate(query, updateDocs, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//change task subtitle
router.put("/taskSubtitle", async (req, res) => {
  const { listId, taskId, taskSubtitle } = req.body;
  try {
    const query = { _id: listId };
    const updateDocs = {
      "tasks.$[task].taskSubtitle": taskSubtitle,
    };
    const options = {
      new: true,
      arrayFilters: [{ "task.taskId": taskId }],
    };
    const result = await List.findOneAndUpdate(query, updateDocs, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//add comment
router.put("/comment", async (req, res) => {
  const { listId, taskId, taskComment } = req.body;
  try {
    const query = { _id: listId };
    const updateDocs = {
      $push: {
        "tasks.$[task].taskComments": taskComment,
      },
    };
    const options = {
      new: true,
      arrayFilters: [{ "task.taskId": taskId }],
    };
    const result = await List.findOneAndUpdate(query, updateDocs, options);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete task
router.put("/deleteTask", async (req, res) => {
  const { listId, taskId } = req.body;
  try {
    const list = await List.findByIdAndUpdate(
      listId,
      {
        $pull: {
          tasks: {
            taskId,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
