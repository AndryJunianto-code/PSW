const router = require("express").Router();
const Notification = require("../models/Notification");

//invitemembernotif
router.post("/inviteMember", async (req, res) => {
  const newNotification = new Notification(req.body);
  try {
    const savedNotification = await newNotification.save();
    res.status(200).json(savedNotification);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get notification
router.get("/getAll/:receiverEmail", async (req, res) => {
  try {
    const notifications = await Notification.find({
      receiverEmail: req.params.receiverEmail,
    }).sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
