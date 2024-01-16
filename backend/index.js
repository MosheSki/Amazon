import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

//Routes
app.post("/addUser", async (req, res) => {
  //const user = req.body.user
  const { user } = req.body;
  const newUser = await User.create(req.body);
  res.send(newUser);
});

mongoose
  .connect(process.env.MONGO_CONNECTION)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Running on Port " + PORT);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
