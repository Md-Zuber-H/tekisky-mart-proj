import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["trending", "regular"],
      default: "regular"
    },
    image: {
      type: String // only for trending
    }
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
