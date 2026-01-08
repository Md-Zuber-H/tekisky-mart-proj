import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRegularCategories = async () => {
      try {
        const { data } = await api.get("/categories/regular");
        setCategories(data);
      } catch (error) {
        console.error("Failed to load categories");
      }
    };

    fetchRegularCategories();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">All Categories</h1>

      {categories.length === 0 ? (
        <p className="text-gray-500">No categories found</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <div
              key={cat._id}
              onClick={() => navigate(`/products?category=${cat._id}`)}
              className="cursor-pointer border rounded-lg p-4 text-center hover:shadow-md transition"
            >
              <p className="font-medium">{cat.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
