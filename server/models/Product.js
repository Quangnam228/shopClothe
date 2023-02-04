const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: { type: String, required: true },
    categories: { type: Array },
    // size: { type: Array },
    // color: { type: Array },
    price: { type: Number, required: true },
    inStock: {
      type: Number,
      default: 1,
      required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "users",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    inventory: [
      {
        size: { type: String },
        color: { type: String, required: true },
        stock: { type: Number, required: true },
      },
    ],
    trash: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("products", ProductSchema);
