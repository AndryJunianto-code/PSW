const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const spaceRoutes = require("./routes/SpaceRoutes");

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
  })
);

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("database connected"))
  .catch((err) => console.log(err));

app.use("/api/spaces", spaceRoutes);

app.listen(process.env.PORT || 5000, () => {
  console.log("backend is running");
});
