import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CategoryBar = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get("/categories");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <div className="flex gap-4 p-4 overflow-x-auto bg-white shadow">
      {categories.map((cat) => (
        <button
          key={cat._id}
          onClick={() => navigate(`/products?category=${cat._id}`)}
          className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryBar;
