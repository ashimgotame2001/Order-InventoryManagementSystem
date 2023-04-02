const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Double,
  },
  brandName: {
    type: String,
    required: true,
  },
  detail: {
    type: String,
  },
  type: {
    type: String,
  },
  slug: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  productDetails: {
    type: Schema.Types.ObjectId,
    ref: "productDetails",
  },
  stock: {
    type: Schema.Types.ObjectId,
    ref: "stock",
  },
});

module.exports = mongoose.model("product", productSchema);
