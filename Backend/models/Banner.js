import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true
    },
    image: {
      type: String,
      required: true
    },
    link: {
      type: String // optional: /products?category=...
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Banner", bannerSchema);
