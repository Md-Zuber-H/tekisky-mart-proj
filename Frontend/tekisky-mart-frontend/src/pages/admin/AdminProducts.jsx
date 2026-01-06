import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // 🔹 FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get("http://localhost:5000/api/products");
      setProducts(data);
    };

    fetchProducts();
  }, []);

  // 🔥 DELETE PRODUCT (CORRECT PLACE)
  const deleteProductHandler = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      // update UI instantly
      setProducts((prev) => prev.filter((p) => p._id !== id));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      <table className="w-full border">
        <thead className="bg-gray-200">
          <tr>
            <th className="border p-2">Image</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Stock</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="align-top">
              {/* Image */}
              <td className="border p-2">
                <img
                  src={product.images?.[0]}
                  alt={product.name}
                  className="w-20 h-20 object-cover rounded"
                />
              </td>

              {/* Name */}
              <td className="border p-2 font-medium">{product.name}</td>

              {/* Description */}
              <td className="border p-2 text-sm text-gray-600 max-w-xs">
                {product.description}
              </td>

              {/* Price */}
              <td className="border p-2">₹{product.price}</td>

              {/* Stock */}
              <td className="border p-2">{product.stock}</td>

              {/* Actions */}
              <td className="border p-2 space-y-2">
                <Link
                  to={`/admin/product/${product._id}/edit`}
                  className="block bg-yellow-500 text-white px-3 py-1 rounded text-center"
                >
                  ✏️ Edit
                </Link>

                <button
                  onClick={() => deleteProductHandler(product._id)}
                  className="block w-full bg-red-600 text-white px-3 py-1 rounded"
                >
                  ❌ Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminProducts;
