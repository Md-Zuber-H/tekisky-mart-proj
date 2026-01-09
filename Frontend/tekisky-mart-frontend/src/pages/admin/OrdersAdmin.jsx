import { useEffect, useState,React } from "react";
import axios from "axios";

const statusOptions = [
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

const OrdersAdmin = () => {
  const [orders, setOrders] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get(
        "http://localhost:5000/api/admin/orders",
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );
      setOrders(data);
    };

    fetchOrders();
  }, []);

  // 🔥 UPDATE ORDER STATUS
  const updateStatus = async (orderId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      // update UI instantly
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, orderStatus: status } : order
        )
      );
    } catch (error) {
      console.error(error);
      alert("Failed to update order status");
    }
  };
  const updateDeliveryDate = async (orderId, date) => {
    await axios.put(
      `http://localhost:5000/api/admin/orders/${orderId}/delivery`,
      { date },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, estimatedDeliveryDate: date }
          : order
      )
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Order Details</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">🛒 Products</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Est. Delivery</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <>
              {/* MAIN ROW */}
              <tr key={order._id}>
                <td className="border p-2">Order Id: {order._id}
                <div className="mb-3">
                    <p className="font-semibold">📍 Delivery Address</p>
                    <p>{order.shippingAddress?.fullName}</p>
                    <p>{order.shippingAddress?.address}</p>
                    <p>
                      {order.shippingAddress?.city} –{" "}
                      {order.shippingAddress?.pincode}
                    </p>
                    <p>📞 {order.shippingAddress?.phone}</p>
                  </div>


                </td>

                <td className="border p-2">
                  {order.user?.name} <br />
                  <small>{order.user?.email}</small>
                </td>

                <td className="border p-2">₹{order.totalPrice}</td>
{/* 🛒 PRODUCTS */}
                  <div>
                    <br />

                    {order.orderItems.map((item) => (
                      <div
                        key={item.product?._id}
                        className="flex items-center gap-4 mb-2"
                      >
                        <img
                          src={item.product?.images?.[0]}
                          alt={item.product?.name}
                          className="w-12 h-12 object-cover rounded"
                        />

                        <div>
                          <p className="font-medium">{item.product?.name}</p>
                          <p className="text-sm text-gray-600">
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                {/* STATUS */}
                <td className="border p-2">
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border p-1 rounded"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>

                <td className="border p-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>

                <td className="border p-2">
                  <input
                    type="date"
                    value={
                      order.estimatedDeliveryDate
                        ? order.estimatedDeliveryDate.split("T")[0]
                        : ""
                    }
                    onChange={(e) =>
                      updateDeliveryDate(order._id, e.target.value)
                    }
                    className="border p-1 rounded"
                  />
                </td>
              </tr>

              {/* 🔽 EXPANDED DETAILS ROW */}
              <tr>
                <td colSpan="6" className="border bg-gray-50 p-4">
                  {/* 📍 ADDRESS */}
                  
                  
                </td>
                <td colSpan="6" className="border bg-gray-50 p-4"></td>
              </tr>
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersAdmin;
