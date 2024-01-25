import User from "../models/User.js";
import Product from "../models/Product.js";
import data from "../data.js";

const getProducts = async (req, res) => {
  const products = await Product.find();
  res.send(products);
};

const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
};

const getProductByToken = async (req, res) => {
  const product = await Product.findOne({ token: req.params.token });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: "Product was not found" });
  }
};

export { getProducts, getProductById, getProductByToken };
