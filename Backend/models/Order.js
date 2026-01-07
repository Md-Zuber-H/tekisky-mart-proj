import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product"
        },
        name: String,
        price: Number,
        quantity: Number
      }
    ],
    shippingAddress: {
  fullName: String,
  address: String,
  city: String,
  pincode: String,
  phone: String,
  location: {
    lat: Number,
    lng: Number
  }
}
,
    totalPrice: {
      type: Number,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: ["COD"],
      default: "COD"
    },
    orderStatus: {
  type: String,
  enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
  default: "Pending"
},estimatedDeliveryDate: {
  type: Date
}


  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
