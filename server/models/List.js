const mongoose = require("mongoose");

const ListSchema = new mongoose.Schema(
  {
    listTitle: {
      type: String,
      required: true,
    },
    projectId: {
      type: String,
      required: true,
    },
    tasks: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("List", ListSchema);
