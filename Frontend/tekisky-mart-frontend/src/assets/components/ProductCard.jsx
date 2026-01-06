import { Link } from "react-router-dom";
// import { useCart } from "../context/CartContext";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product, showToast }) => {
  const { addToCart } = useCart();

  const addToCartHandler = () => {
    addToCart(product);
    showToast(`Added to cart: ${product.name}`);
  };

  return (
    <div className="relative group border rounded p-3 hover:shadow-lg transition">
      
      {/* Image */}
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
        
        <Link
          to={`/product/${product._id}`}
          className="bg-white px-4 py-2 rounded font-medium"
        >
          👁 View
        </Link>

        <button
          onClick={addToCartHandler}
          className="bg-blue-600 text-white px-4 py-2 rounded font-medium"
        >
          🛒 Add
        </button>
      </div>

      {/* Details */}
      <h3 className="mt-2 font-semibold truncate">{product.name}</h3>
      <p className="text-blue-600 font-bold">₹{product.price}</p>
    </div>
  );
};

export default ProductCard;
