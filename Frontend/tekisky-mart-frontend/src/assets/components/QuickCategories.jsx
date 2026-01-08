import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

const QuickCategories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const { data } = await api.get("/categories/trending");
        setCategories(data);
      } catch (error) {
        console.error("Failed to load trending categories");
      }
    };+

    fetchTrending();
  }, []);

  if (categories.length === 0) return null;

  return (
    <div className="bg-white py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex gap-6 px-4 overflow-x-auto">
        
        {/* 🔥 FIRST 7 TRENDING */}
        {categories.slice(0, 7).map((cat) => (
          <div
            key={cat._id}
            onClick={() => navigate(`/products?category=${cat._id}`)}
            className="cursor-pointer text-center min-w-[80px]"
          >
            <img
              src={cat.image}
              alt={cat.name}
              className="w-14 h-14 mx-auto object-cover rounded-full"
            />
            <p className="text-sm mt-1 font-medium">{cat.name}</p>
          </div>
        ))}

        {/* ➕ MORE BUTTON */}
        <div
          onClick={() => navigate("/categories")}
          className="cursor-pointer text-center min-w-[80px]"
        >
          <div className="w-14 h-14 mx-auto flex items-center justify-center rounded-full border text-xl">
            +
          </div>
          <p className="text-sm mt-1 font-medium">More</p>
        </div>

      </div>
    </div>
  );
};

export default QuickCategories;
