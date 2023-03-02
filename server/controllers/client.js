import ProductModel from "../models/product.js";
import ProductStatModel from "../models/productStat.js";
import UserModel from "../models/User.js";

export const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find();

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStatModel.find({
          productId: product._id,
        });
        return {
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
  try {
    const customers = await UserModel.find({ role: "user" }).select(
      "-password"
    );
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
