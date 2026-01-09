import { useEffect, useState } from "react";
// import api from "../services/api";
import api from "../../services/api";

const RatingForm = ({ productId }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [canRate, setCanRate] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const checkCanRate = async () => {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      if (!userInfo) return;

      const { data } = await api.get(
        `/orders/can-rate/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        }
      );

      setCanRate(data.canRate);
    };

    checkCanRate();
  }, [productId]);

  const submitHandler = async () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    await api.post(
      `/products/${productId}/rate`,
      { rating, comment },
      {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
    );

    setSubmitted(true);
    alert("Thanks for your rating!");
  };

  if (!canRate || submitted) return null;

  return (
    <div className="mb-4">
      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-2 mr-2"
      >
        {[5, 4, 3, 2, 1].map((r) => (
          <option key={r} value={r}>
            {r} ⭐
          </option>
        ))}
      </select>

      <input
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Optional review"
        className="border p-2 mr-2"
      />

      <button
        onClick={submitHandler}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default RatingForm;
