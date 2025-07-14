const Banner = require("../model/banner");

// ✅ Create Banner (no title)
exports.createBanner = async (req, res) => {
  try {
    const { link } = req.body;
    const image = req.file?.path;

    if (!image) {
      return res.status(400).json({ success: false, message: "Image is required" });
    }

    const banner = new Banner({ link, image });
    await banner.save();

    res.status(201).json({ success: true, message: "✅ Banner created", banner });
  } catch (error) {
    console.error("❌ Banner create error:", error);
    res.status(500).json({ success: false, message: "Failed to create banner" });
  }
};

// ✅ Get All Banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error("❌ Get banners error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch banners" });
  }
};

// ✅ Get Single Banner
exports.getBannerById = async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, banner });
  } catch (error) {
    console.error("❌ Get single banner error:", error);
    res.status(500).json({ success: false, message: "Failed to fetch banner" });
  }
};

// ✅ Update Banner (no title)
exports.updateBanner = async (req, res) => {
  try {
    const { link, isActive } = req.body;
    const updatedData = { link, isActive };

    if (req.file) {
      updatedData.image = req.file.path;
    }

    const banner = await Banner.findByIdAndUpdate(req.params.id, updatedData, { new: true });

    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }

    res.status(200).json({ success: true, message: "✅ Banner updated", banner });
  } catch (error) {
    console.error("❌ Banner update error:", error);
    res.status(500).json({ success: false, message: "Failed to update banner" });
  }
};

// ✅ Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) {
      return res.status(404).json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, message: "✅ Banner deleted" });
  } catch (error) {
    console.error("❌ Banner delete error:", error);
    res.status(500).json({ success: false, message: "❌ Failed to delete banner" });
  }
};
