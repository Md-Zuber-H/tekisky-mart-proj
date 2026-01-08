import { useEffect, useState } from "react";
import api from "../../services/api";

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const fetchBanners = async () => {
    const { data } = await api.get("/banners/admin");
    setBanners(data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("link", link);

    await api.post("/banners", formData);
    setTitle("");
    setLink("");
    setImage(null);
    fetchBanners();
  };

  const toggleActive = async (banner) => {
    await api.put(`/banners/${banner._id}`, {
      isActive: !banner.isActive
    });
    fetchBanners();
  };

  const deleteHandler = async (id) => {
    if (!window.confirm("Delete banner?")) return;
    await api.delete(`/banners/${id}`);
    fetchBanners();
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Banners</h1>

      {/* CREATE */}
      <form onSubmit={submitHandler} className="space-y-3 mb-8">
        <input
          placeholder="Banner title"
          className="border p-2 w-full"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          placeholder="Link (optional)"
          className="border p-2 w-full"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Banner
        </button>
      </form>

      {/* LIST */}
      {banners.map((banner) => (
        <div
          key={banner._id}
          className="flex items-center justify-between border p-3 mb-3"
        >
          <img src={banner.image} className="w-32 rounded" />

          <div>
            <p className="font-semibold">{banner.title}</p>
            <p className="text-sm">{banner.link}</p>
          </div>

          <div className="space-x-3">
            <button
              onClick={() => toggleActive(banner)}
              className="px-3 py-1 border rounded"
            >
              {banner.isActive ? "Disable" : "Enable"}
            </button>

            <button
              onClick={() => deleteHandler(banner._id)}
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

export default AdminBanners;
