import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:5000/api/orders/my",
          {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          }
        );
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMyOrders();
  }, []);

  // 🔴 CANCEL ORDER HANDLER
  const cancelOrderHandler = async (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmCancel) return;

    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? data.order : order
        )
      );
    } catch (error) {
      alert(
        error.response?.data?.message || "Order cannot be cancelled"
      );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Date</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="border p-2">{order._id}</td>
                <td className="border p-2">₹{order.totalPrice}</td>

                <td className="border p-2">
                  <span
                    className={
                      order.orderStatus === "Cancelled"
                        ? "text-red-600 font-semibold"
                        : "text-green-600 font-semibold"
                    }
                  >
                    {order.orderStatus}
                  </span>
                </td>

                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="border p-2 space-x-3">
                  <Link
                    to={`/order/${order._id}`}
                    className="text-blue-600"
                  >
                    View
                  </Link>

                  {/* ❌ CANCEL BUTTON (ONLY IF ALLOWED) */}
                  {/* {["Pending", "Processing"].includes(order.orderStatus) && (
                    <button
                      onClick={() => cancelOrderHandler(order._id)}
                      className="text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                  )} */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyOrders;
