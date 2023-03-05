const mongoose = require("mongoose");

const SpaceSchema = new mongoose.Schema(
  {
    spaceTitle: {
      type: String,
      required: true,
    },
    spaceColor: {
      type: String,
      required: true,
    },
    membersId: {
      type: Array,
      default: [],
    },
    adminsId: {
      type: Array,
      default: [],
    },
    projects: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Space", SpaceSchema);
