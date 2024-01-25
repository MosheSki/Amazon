import express from "express";
import { getProducts } from "../controllers/productsController.js";
import { getProductById } from "../controllers/productsController.js";

const productsRouter = express.Router();
productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductById);

export default productsRouter;
