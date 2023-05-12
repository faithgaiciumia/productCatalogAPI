const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductsSchema = new Schema(
  {
    productName: { type: String, required: true },
    productPrice: { type: Number, required: true },
    productDescription: { type: String },
    productStock: { type: Number, required: true },
    productImageUrl: { type: String },
    productCategory: { type: String, required: true },    
  },
  { timestamps: true }
);

const ProductsModel = mongoose.model(
  "ProductsModel",
  ProductsSchema,
  "products"
);
module.exports = ProductsModel;
