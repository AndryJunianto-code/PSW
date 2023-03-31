const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    senderEmail: {
      type: String,
      required: true,
    },
    receiverEmail: {
      type: String,
      required: true,
    },
    senderName: {
      type: String,
      required: true,
    },
    senderImage: {
      type: String,
    },
    spaceTitle: {
      type: String,
    },
    spaceId: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
