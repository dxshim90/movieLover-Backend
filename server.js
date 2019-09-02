const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const utils = require("./config/config");
const userRoutes = require("./Routes/Users");
const authRoutes = require("./Routes/auth");
const movieRoutes = require("./Routes/movies");
const cors = require("cors");

const app = express();

app.use(cors());

mongoose.connect(utils.mongoDB, { useNewUrlParser: true }, () => {
  console.log(`Db Connected`);
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.use("/movies", movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
