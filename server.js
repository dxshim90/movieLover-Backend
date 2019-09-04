require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const userRoutes = require("./Routes/users");
const authRoutes = require("./Routes/auth");
const movieRoutes = require("./Routes/movies");
const cors = require("cors");

const app = express();

app.all("*", function(req, res, next) {
  var origin = req.get("origin");
  res.header("Access-Control-Allow-Origin", origin);
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(cors());

mongoose.connect(process.env.mongoDB, { useNewUrlParser: true }, () => {
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
