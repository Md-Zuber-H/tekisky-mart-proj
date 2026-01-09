import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    category: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Category",
  required: true
}
,
ratings: [
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    }
  }
],
averageRating: {
  type: Number,
  default: 0
}
,
    stock: { type: Number, required: true },
    images: [{ type: String }]
  },
  { timestamps: true }
);

productSchema.index({
  name: "text",
  description: "text"
});


export default mongoose.model("Product", productSchema);
