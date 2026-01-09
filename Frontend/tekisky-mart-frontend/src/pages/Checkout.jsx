import { useState } from "react";
import { placeOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Checkout = () => {
  const navigate = useNavigate();
  const { fetchCart } = useCart();

  const [form, setForm] = useState({
    fullName: "",
    address: "",
    city: "",
    pincode: "",
    phone: "",
    location: null,
  });

  // 📍 USE CURRENT LOCATION (NO GOOGLE API)
  const useCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      // 🔥 CALL GOOGLE API
      const res = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${
          import.meta.env.VITE_GOOGLE_MAPS_API_KEY
        }`
      );

      const data = await res.json();
      const address = data.results?.[0]?.formatted_address || "";

      setForm((prev) => ({
        ...prev,
        address: address,
        location: {
          lat: latitude,
          lng: longitude,
        },
      }));
    });
  };

 const submitOrder = async () => {
  // 🔴 FRONTEND VALIDATION
  if (!form.address || form.address.trim() === "") {
    alert("Please enter delivery address or use current location");
    return;
  }

  if (!form.phone || form.phone.trim() === "") {
    alert("Please enter phone number");
    return;
  }

  try {
    await placeOrder({
      shippingAddress: form
    });

    await fetchCart();
    navigate("/my-orders");
  } catch (error) {
    alert("Order failed");
  }
};


  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Checkout (Cash on Delivery)</h2>

      {Object.keys(form).map(
        (key) =>
          key !== "location" && (
            <input
              key={key}
              placeholder={key.toUpperCase()}
              className="w-full border p-2 mb-3"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
            />
          )
      )}

      {/* 📍 LOCATION BUTTON */}
      <button
        type="button"
        onClick={useCurrentLocation}
        className="w-full border border-blue-600 text-blue-600 py-2 rounded mb-3"
      >
        📍 Use Current Location
      </button>

      {form.location && (
        <p className="text-sm text-green-600 mb-3">
          Location captured successfully
        </p>
      )}

      <button
        onClick={submitOrder}
        className="bg-blue-600 text-white px-4 py-2 rounded w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
