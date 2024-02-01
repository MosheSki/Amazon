import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import User from "./models/User.js";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRouter.js";
import productsRouter from "./routes/productsRouter.js";
import userRouter from "./routes/userRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();
dotenv.config();

//MiddleWares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 8080;

//Routes
app.use("/api/v1/seed", seedRouter);
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
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
