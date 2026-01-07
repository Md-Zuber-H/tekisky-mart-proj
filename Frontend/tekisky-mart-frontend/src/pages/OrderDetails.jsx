import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import OrderStatusTracker from "../assets/components/OrderStatusTracker";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const cancelOrderHandler = async () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      await axios.put(
        `http://localhost:5000/api/orders/${order._id}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      alert("Order cancelled successfully");

      // update UI instantly
      setOrder((prev) => ({
        ...prev,
        orderStatus: "Cancelled",
      }));
    } catch (error) {
      alert(error.response?.data?.message || "Order cannot be cancelled");
    }
  };

  useEffect(() => {
    const fetchOrder = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/orders/${id}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setOrder(data);
    };

    fetchOrder();
  }, [id]);

  if (!order) return <p className="p-6">Loading invoice...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow">
      <h1 className="text-2xl font-bold mb-4">Order Invoice</h1>

      {/* Order Info */}
      <div className="mb-6">
        <p>
          <strong>Order ID:</strong> {order._id}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

        {/* Order Progress */}
        <OrderStatusTracker status={order.orderStatus} />

        {/* Estimated Delivery Date */}
        {order.estimatedDeliveryDate && order.orderStatus !== "Delivered" && (
          <p className="mt-3 text-green-700 font-medium">
            🚚 Estimated Delivery:{" "}
            {new Date(order.estimatedDeliveryDate).toDateString()}
          </p>
        )}

        {order.orderStatus === "Delivered" && (
          <p className="mt-3 text-green-700 font-semibold">
            ✅ Delivered Successfully
          </p>
        )}
      </div>
      <p>
        <strong>Status:</strong>{" "}
        <span
          className={
            order.orderStatus === "Cancelled"
              ? "text-red-600 font-semibold"
              : "text-green-600 font-semibold"
          }
        >
          {order.orderStatus}
        </span>
      </p>

      {/* ❌ CANCEL BUTTON */}
      {["Pending", "Processing"].includes(order.orderStatus) && (
        <button
          onClick={cancelOrderHandler}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Cancel Order
        </button>
      )}

      {/* Customer Info */}
      <div className="mb-6">
        <h2 className="font-semibold mb-2">Customer</h2>
        <p>{order.user?.name || "Customer"}</p>
        <p>{order.user?.email || "N/A"}</p>
      </div>

      {/* Items Table */}
      <table className="w-full border mb-6">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Product</th>
            <th className="border p-2">Qty</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {order.orderItems.map((item, index) => (
            <tr key={index}>
              <td className="border p-2">
                {item.product?.name || "Product removed"}
              </td>

              <td className="border p-2">{item.quantity}</td>

              <td className="border p-2">
                ₹{item.product?.price ?? item.price}
              </td>

              <td className="border p-2">
                ₹{item.quantity * (item.product?.price ?? item.price)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Total */}
      <div className="text-right text-xl font-bold">
        Total: ₹{order.totalPrice}
      </div>
    </div>
  );
};

export default OrderDetails;
