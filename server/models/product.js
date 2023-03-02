import mongoose from "mongoose";

const ProductScheme = new mongoose.Schema(
  {
    name: String,
    price: Number,
    discription: String,
    category: String,
    rating: Number,
    supply: Number,
  },
  { timestamps: true }
);

const ProductModel = mongoose.model("Products", ProductScheme);

export default ProductModel;
