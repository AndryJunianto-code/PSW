const router = require("express").Router();
const Space = require("../models/Space");

//create space
router.post("/", async (req, res) => {
  const newSpace = new Space(req.body);
  try {
    const savedSpace = await newSpace.save();
    res.status(200).json(savedSpace);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get all space
router.get("/getAll/:userId", async (req, res) => {
  try {
    const spaces = await Space.find({
      adminsId: { $in: [req.params.userId] },
    });
    const members = await Space.find({
      membersId: { $in: [req.params.userId] },
    });
    const data = [...spaces, ...members];
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
