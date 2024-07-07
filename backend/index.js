const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const RegisterModel = require("./models/Register");

app.use(cors());

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/test");

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  RegisterModel.findOne({ email: email })
    .then((user) => {
      if (user) {
        res.json("already have an account");
      } else {
        RegisterModel.create({ name: name, email: email, password: password })
          .then((result) => res.json("Account created"))
          .catch((err) => res.json("err"));
      }
    })
    .catch((err) => res.json(err));
});
app.listen(3001, () => {
  console.log("server is running");
});
