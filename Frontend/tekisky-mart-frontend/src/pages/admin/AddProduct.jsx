import { useState, useEffect } from "react";
import api from "../../services/api";

const AddProduct = () => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    discount: "",
    stock: ""
  });

  // 🔹 Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await api.get("/categories");
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    if (images.length > 3) {
      alert("Maximum 3 images allowed");
      return;
    }

    const formData = new FormData();

    // text fields
    Object.keys(form).forEach((key) => {
      formData.append(key, form[key]);
    });

    // category (ONLY ONCE)
    formData.append("category", category);

    // images
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    try {
      await api.post("/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("✅ Product added successfully");

      // reset form
      setForm({
        name: "",
        description: "",
        price: "",
        discount: "",
        stock: ""
      });
      setCategory("");
      setImages([]);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add Product</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full border p-2"
          required
        />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2"
          required
        />

        <input
          type="number"
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount %"
          className="w-full border p-2"
        />

        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border p-2"
          required
        />

        {/* ✅ CATEGORY DROPDOWN */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* IMAGES */}
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleImageChange}
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
