import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setName(data.name);
      setPrice(data.price);
      setStock(data.stock);
      setDescription(data.description);
    };

    fetchProduct();
  }, [id]);

  const submitHandler = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/products/${id}`,
      {
        name,
        price,
        stock,
        description
      },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`
        }
      }
    );

    alert("Product updated successfully");
    navigate("/admin/products");
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>

      <form onSubmit={submitHandler} className="space-y-4">
        <input
          className="w-full border p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
        />

        <input
          className="w-full border p-2"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
        />

        <input
          className="w-full border p-2"
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          placeholder="Stock"
        />

        <textarea
          className="w-full border p-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
