import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const location = useLocation();
  const fromCart = location.state?.from === "cart";
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const addToCartHandler = async () => {
    await addToCart(product);
    showToast(`Added to cart: ${product.name}`);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get("/products");

      // ✅ backend returns { products: [...] }
      const foundProduct = res.data.products?.find((p) => p._id === id);

      setProduct(foundProduct);
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="p-6 text-center text-gray-600">Loading product...</div>
    );
  }
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const buyNowHandler = async () => {
    await addToCart(product); // ✅ ensure cart is NOT empty
    showToast(`Buying now: ${product.name}`);
    navigate("/checkout"); // ✅ then go to checkout
  };

  return (
    <div className="max-w-4xl mx-auto p-4 grid md:grid-cols-2 gap-6">
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full rounded"
      />

      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>

        <p className="mt-2 text-gray-700">{product.description}</p>

        <p className="mt-3 text-gray-500 line-through">
          {product.discount > 0 && `₹${product.price}`}
        </p>

        <p className="text-2xl font-bold text-green-600">
          ₹{discountedPrice.toFixed(0)}
        </p>

        {product.discount > 0 && (
          <p className="text-sm text-green-700">{product.discount}% OFF</p>
        )}

        {/* STOCK */}
        <p
          className={`mt-2 font-medium ${
            product.stock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {product.stock > 0
            ? `In Stock (${product.stock} left)`
            : "Out of Stock"}
        </p>

        <div className="mt-4 flex gap-3">
          {!fromCart && (
            <button
              onClick={addToCartHandler}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          )}

          <button
            onClick={buyNowHandler}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
