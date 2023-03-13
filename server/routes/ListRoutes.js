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
router.get("/getListInProject", async (req, res) => {
  try {
    const lists = await List.find({ projectId: req.body.projectId });
    res.status(200).json(lists);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
