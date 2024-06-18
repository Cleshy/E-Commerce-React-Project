const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/User");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/webshopDB");

app.post("/login", (request, response) => {
  const { email, password } = request.body;
  UserModel.findOne({ email: email })
    .then((user) => {
      if (!user) {
        response.status(401).json({ error: "E-mail or Password incorrect" });
        return;
      }

      if (user.password === password) {
        response.json({ message: "Success" });
      } else {
        response.status(401).json({ error: "E-mail or Password incorrect" });
      }
    })
    .catch((error) => {
      console.log("Error during login:", error.message);
      response.status(500).json({ error: "Server error during login" });
    });
});

app.post("/register", (request, response) => {
  UserModel.create(request.body)
    .then((users) => response.json(users))
    .catch((error) => res.json(error));
});

app.listen(3001, () => {
  console.log("Server is running");
});
