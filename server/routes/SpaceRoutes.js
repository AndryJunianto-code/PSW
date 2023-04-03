const router = require("express").Router();
const Notification = require("../models/Notification");
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
      admins: {
        $elemMatch: {
          userId: req.params.userId,
        },
      },
    });
    const members = await Space.find({
      members: {
        $elemMatch: {
          userId: req.params.userId,
        },
      },
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
  const { spaceId, username, picture, userId, email } = req.body;
  try {
    const space = await Space.findByIdAndUpdate(
      spaceId,
      {
        $push: {
          members: {
            username,
            picture,
            userId,
            email,
          },
        },
      },
      { new: true }
    );
    await Notification.findOneAndUpdate(
      { receiverEmail: email, spaceId },
      {
        $set: {
          clicked: true,
        },
      },
      { new: true }
    );
    res.status(200).json(space);
  } catch (err) {
    res.status(500).json(err);
  }
});
//remove member & admin
router.put("/removePeople", async (req, res) => {
  const { spaceId, userId, thisIsAdmin } = req.body;
  let space;
  try {
    if (thisIsAdmin === false) {
      space = await Space.findByIdAndUpdate(
        spaceId,
        {
          $pull: {
            members: {
              userId,
            },
          },
        },
        { new: true }
      );
    } else {
      space = await Space.findByIdAndUpdate(
        spaceId,
        {
          $pull: {
            admins: {
              userId,
            },
          },
        },
        { new: true }
      );
    }
    res.status(200).json(space);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
