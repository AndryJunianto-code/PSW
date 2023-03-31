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

//add project
router.put("/addProject", async (req, res) => {
  try {
    const space = await Space.findByIdAndUpdate(
      req.body.spaceId,
      {
        $push: {
          projects: {
            projectId: req.body.projectId,
            projectTitle: req.body.projectTitle,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(space);
  } catch (err) {
    res.status(500).json(err);
  }
});

//invite member
router.put("/acceptInvitation", async (req, res) => {
  try {
    const space = await Space.findByIdAndUpdate(
      req.body.spaceId,
      {
        $push: {
          membersId: req.body.memberId,
        },
      },
      { new: true }
    );
    res.status(200).json(space);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
