import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminRatings = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products/admin/ratings").then((res) => {
      setProducts(res.data);
    });
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Product Ratings & Reviews</h1>

      {products.map((product) => (
        <div
          key={product._id}
          className="border rounded p-4 mb-6 bg-white shadow"
        >
          <h2 className="text-lg font-semibold">
            {product.name}
          </h2>

          <p className="text-sm text-gray-600 mb-2">
            ⭐ Average Rating: {product.averageRating.toFixed(1)}
          </p>

          {product.ratings.length === 0 ? (
            <p className="text-gray-500">No ratings yet</p>
          ) : (
            product.ratings.map((r, index) => (
              <div
                key={index}
                className="border-t pt-3 mt-3"
              >
                <p className="font-medium">
                  {r.user?.name} ⭐ {r.rating}
                </p>
                <p className="text-sm text-gray-600">
                  {r.user?.email}
                </p>
                {r.comment && (
                  <p className="mt-1 italic text-gray-800">
                    “{r.comment}”
                  </p>
                )}
              </div>
            ))
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminRatings;
