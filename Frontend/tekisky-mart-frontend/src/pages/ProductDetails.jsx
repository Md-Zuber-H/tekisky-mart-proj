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

        <p className="mt-3 text-xl font-bold text-blue-600">₹{product.price}</p>

        <div className="mt-4 flex gap-3">
          {!fromCart && (
            <button
              onClick={() => addToCartHandler(product)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Add to Cart
            </button>
          )}

          <button
            onClick={() => navigate("/checkout")}
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
