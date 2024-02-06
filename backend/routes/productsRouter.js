import express from "express";
import { getProducts } from "../controllers/productsController.js";
import { getProductById } from "../controllers/productsController.js";
import { getProductByToken } from "../controllers/productsController.js";
import { getCategories } from "../controllers/productsController.js";
import { getProductByQuery } from "../controllers/productsController.js";

const productsRouter = express.Router();
productsRouter.get("/", getProducts);
productsRouter.get("/categories", getCategories);
productsRouter.get("/search", getProductByQuery);
productsRouter.get("/:id", getProductById);
productsRouter.get("/token/:token", getProductByToken);

export default productsRouter;
