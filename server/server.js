const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const socketIO = require("socket.io");
const spaceRoutes = require("./routes/SpaceRoutes");
const listRoutes = require("./routes/ListRoutes");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
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
app.use("/api/lists", listRoutes);

io.on("connection", (socket) => {
  console.log(`${socket.id} user just connected`);

  socket.on("changePositionListData", (listData) => {
    io.emit("changePositionListData", listData);
  });
});

server.listen(process.env.PORT || 5000, () => {
  console.log("backend is running");
});
