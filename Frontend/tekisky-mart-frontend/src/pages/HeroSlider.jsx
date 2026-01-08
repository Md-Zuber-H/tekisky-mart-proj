import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/banners").then((res) => setBanners(res.data));
  }, []);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [banners]);

  if (banners.length === 0) return null;

  const banner = banners[index];

  return (
    <div className="relative max-w-7xl mx-auto mt-4 overflow-hidden rounded-lg">
      <AnimatePresence mode="wait">
        <motion.img
          key={banner._id}
          src={banner.image}
          alt={banner.title}
          onClick={() => banner.link && navigate(banner.link)}
          className="w-full h-[260px] object-cover cursor-pointer"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.4 }}
        />
      </AnimatePresence>
    </div>
  );
};

export default HeroSlider;
