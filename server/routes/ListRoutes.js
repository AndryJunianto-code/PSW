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
  const { taskId, taskTitle, listId } = req.body;
  try {
    const newTask = {
      taskId,
      taskTitle,
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

module.exports = router;
