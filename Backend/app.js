const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config({ path: "Backend/config/config.env" });
}

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

const user = require("./routes/user");
const post = require("./routes/post");

app.use("/api", user);
app.use("/api", post);

module.exports = app;
