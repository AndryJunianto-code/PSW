const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    listId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    dueDate: {
      type: String,
      default: "",
    },
    remark: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
