import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },

    // 🔥 category type
    type: {
      type: String,
      enum: ["trending", "regular"],
      default: "regular"
    },

    // 🔥 image only for trending categories
    image: {
      type: String,
      default: ""
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
