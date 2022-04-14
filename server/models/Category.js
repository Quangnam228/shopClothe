const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    cat: { type: String, required: true, unique: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("category", CategorySchema);
