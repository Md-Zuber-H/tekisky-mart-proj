import Banner from "../models/Banner.js";
import uploadToCloudinary from "../utils/cloudinaryUpload.js";

// ADMIN: CREATE BANNER
export const createBanner = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Banner image required" });
    }

    const imageUrl = await uploadToCloudinary(req.file.buffer);

    const banner = await Banner.create({
      title: req.body.title || "",
      link: req.body.link || "",
      image: imageUrl
    });

    res.status(201).json(banner);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// USER: GET ACTIVE BANNERS
export const getBanners = async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort({
    createdAt: -1
  });
  res.json(banners);
};

// ADMIN: DELETE BANNER
export const deleteBanner = async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: "Banner deleted" });
};
