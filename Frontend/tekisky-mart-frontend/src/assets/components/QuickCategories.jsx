import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const QuickCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/categories?type=trending").then((res) => {
      setCategories(res.data);
    });
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="bg-white py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex gap-6 overflow-x-auto px-4">
        {categories.map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/products?category=${cat._id}`)}
            className="cursor-pointer text-center min-w-[80px]"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-14 h-14 mx-auto object-contain"
            />
            <p className="text-sm mt-1 font-medium">{cat.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuickCategories;
