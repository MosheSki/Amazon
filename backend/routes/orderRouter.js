import express from "express";
import expressAsyncHandler from "express-async-handler";
import { isAuth } from "../utils.js";
import { addOrder, getOrderById } from "../controllers/ordersController.js";

const orderRouter = express.Router();

orderRouter.post("/", isAuth, expressAsyncHandler(addOrder));
orderRouter.post("/:id", isAuth, expressAsyncHandler(getOrderById)); ///get?

export default orderRouter;
