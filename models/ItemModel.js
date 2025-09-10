import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    img: { type: String, required: true, trim: true },
    price: { type: Number, required: true },
    desc: { type: String, trim: true },
    category: { type: String, required: true, trim: true }, // e.g. Dinner, Breakfast, Lunch, Snacks
    rating: { type: Number, default: 0, min: 0, max: 5 },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
