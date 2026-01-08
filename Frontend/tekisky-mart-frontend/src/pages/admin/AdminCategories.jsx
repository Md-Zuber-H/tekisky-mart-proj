import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminCategories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("regular");
  const [image, setImage] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const fetchCategories = async () => {
    const { data } = await api.get("/categories");
    setCategories(data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    if (type === "trending" && image) {
      formData.append("image", image);
    }

    if (editingId) {
      await api.put(`/categories/${editingId}`, formData);
    } else {
      await api.post("/categories", formData);
    }

    setName("");
    setType("regular");
    setImage(null);
    setEditingId(null);
    fetchCategories();
  };

  const editHandler = (cat) => {
    setEditingId(cat._id);
    setName(cat.name);
    setType(cat.type);
    setImage(null);
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete this category?")) return;
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Manage Categories</h1>

      {/* FORM */}
      <form onSubmit={submitHandler} className="space-y-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Category name"
          className="w-full border p-2"
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="w-full border p-2"
        >
          <option value="regular">Regular Category</option>
          <option value="trending">Trending Category</option>
        </select>

        {type === "trending" && (
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        )}

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          {editingId ? "Update Category" : "Add Category"}
        </button>
      </form>

      {/* LIST */}
      {categories.map((cat) => (
        <div
          key={cat._id}
          className="flex justify-between items-center border p-2 mb-2"
        >
          <div className="flex items-center gap-3">
            {cat.type === "trending" && cat.image && (
              <img
                src={cat.image}
                alt={cat.name}
                className="w-10 h-10 object-cover rounded"
              />
            )}
            <div>
              <p className="font-medium">{cat.name}</p>
              <p className="text-xs text-gray-500">{cat.type}</p>
            </div>
          </div>

          <div className="space-x-3">
            <button
              onClick={() => editHandler(cat)}
              className="text-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(cat._id)}
              className="text-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminCategories;
