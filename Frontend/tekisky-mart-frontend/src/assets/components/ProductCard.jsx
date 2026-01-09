import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import useAuth from "../../hooks/useAuth";

const ProductCard = ({ product, showToast, onDelete }) => {
  const { user } = useAuth();
  const { addToCart } = useCart();

  // 🔢 Discount calculation
  const discountedPrice =
    product.discount > 0
      ? product.price - (product.price * product.discount) / 100
      : product.price;

  const addToCartHandler = () => {
    addToCart(product);
    showToast && showToast(`Added to cart: ${product.name}`);
  };

  const deleteHandler = () => {
    if (!onDelete) return;
    if (window.confirm("Are you sure you want to delete this product?")) {
      onDelete(product._id);
    }
  };

  return (
    <div className="relative group border rounded p-3 hover:shadow-lg transition bg-white">
      
      {/* IMAGE */}
      <img
        src={product.images?.[0]}
        alt={product.name}
        className="w-full h-48 object-cover rounded"
      />

      {/* 🔥 STOCK BADGE */}
      {product.stock === 0 && (
        <span className="absolute top-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded">
          Out of Stock
        </span>
      )}

      {/* ⭐ RATING */}
      {product.averageRating > 0 && (
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded text-sm text-yellow-500 shadow">
          ⭐ {product.averageRating.toFixed(1)}
        </div>
      )}

      {/* ================= USER VIEW ================= */}
      {user?.role !== "admin" && (
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
          <Link
            to={`/product/${product._id}`}
            className="bg-white px-4 py-2 rounded font-medium"
          >
            👁 View
          </Link>

          {user && product.stock > 0 && (
            <button
              onClick={addToCartHandler}
              className="bg-blue-600 text-white px-4 py-2 rounded font-medium"
            >
              🛒 Add
            </button>
          )}
        </div>
      )}

      {/* ================= ADMIN VIEW ================= */}
      {user?.role === "admin" && (
        <div className="mt-3 flex gap-2">
          <Link
            to={`/admin/product/${product._id}/edit`}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            ✏️ Edit
          </Link>

          <button
            onClick={deleteHandler}
            className="bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            🗑 Delete
          </button>
        </div>
      )}

      {/* DETAILS */}
      <h3 className="mt-2 font-semibold truncate">{product.name}</h3>

      {/* PRICE */}
      {product.discount > 0 ? (
        <div>
          <p className="text-sm text-gray-500 line-through">
            ₹{product.price}
          </p>
          <p className="text-green-600 font-bold text-lg">
            ₹{discountedPrice.toFixed(0)}
            <span className="text-xs ml-1 text-green-700">
              ({product.discount}% OFF)
            </span>
          </p>
        </div>
      ) : (
        <p className="text-blue-600 font-bold text-lg">₹{product.price}</p>
      )}
    </div>
  );
};

export default ProductCard;
